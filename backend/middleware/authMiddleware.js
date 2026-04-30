import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  try {
    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from DB (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }

  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;