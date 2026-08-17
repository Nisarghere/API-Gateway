const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
console.log("cookies:", req.cookies.token);
console.log("authorization:", req.headers.authorization);
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
