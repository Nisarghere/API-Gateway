const ApiModel = require("../models/api.model")
const subscriptionModel = require("../models/subscription.model")



exports.apiAuthenticateMW = async(req, res, next)=>{
    const apiKey = req.header("x-api-key")

    if (!apiKey){
        return res.status(400).json({
            message:"API key is required"
        })
    }

    const subscription = await subscriptionModel.findOne({
        apiKey,
        consumer:req.user.userId,
    })

    if (!subscription || subscription.status !== "ACTIVE"){
         return res.status(403).json({ message: "Invalid or inactive API key" });
    }

    
    req.subscription = subscription
    req.api = subscription.api
    next()

}