const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie
    ?.split(";")
    .map((cookie) => cookie.trim().split("="))
    .reduce((parsedCookies, [name, ...value]) => {
      parsedCookies[name] = decodeURIComponent(value.join("="));
      return parsedCookies;
    }, {});
  const token = cookies?.token;

  if (!token)
    return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
