const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("AUTH MIDDLEWARE HIT");
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("AUTH SUCCESS, CALLING NEXT");
    next();
   } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
