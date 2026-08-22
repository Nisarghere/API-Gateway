 const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
 

exports.registerController = async(req, res)=>{
    const {name, email, password} = req.body

    if (!name || !email || !password){
        return res.status(400).json({
            message:"All the fields are required."
        })
    }

   

    const duplicateEmail = await userModel.findOne({email})

    if (duplicateEmail){
        return res.status(409).json({
            message:"User already exist, try different emailId"
        })
    }
    
    
    const user = await userModel.create({
        name,
        email,
        password
    })

    const token = jwt.sign(
        {userId:user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn:"3d"}
    )

    res.cookie("token", token, {
        httpOnly: true,                              // JS on the frontend can't read it — mitigates XSS
        sameSite: "strict",                           // blocks cross-site sending — CSRF protection
        maxAge: 3 * 24 * 60 * 60 * 1000               // 3 days, in ms — match your JWT expiry
    })

    return res.status(201).json({
        message:"User registered succesfully.",
        
    })

}

exports.loginController = async(req, res)=>{
    const {email, password} = req.body

     if (!email || !password){
        return res.status(400).json({
            message:"All the fields are required."
        })
    }

    try{
        const user = await userModel.findOne({email}).select("+password")

    if (!user){
        return res.status(401).json({
            message:"invalid credentials."
        })
    }

    const comparePasswd = await user.comparePassword(password)

    if (!comparePasswd){
        return res.status(401).json({
            message:"invalid credentials."
        })
    }

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"3d"})
    
    res.cookie("token", token, {
        httpOnly: true,                              // JS on the frontend can't read it — mitigates XSS
        sameSite: "strict",                           // blocks cross-site sending — CSRF protection
        maxAge: 3 * 24 * 60 * 60 * 1000               // 3 days, in ms — match your JWT expiry
    })

   

    return res.status(200).json({
        message:"Loged-in succesfully.",
        user
    })

    } catch (err){
        return res.status(500).json({ message: "Login failed", err: err.message })
    }

    

}