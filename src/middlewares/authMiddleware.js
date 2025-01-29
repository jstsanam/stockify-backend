import { decodeToken } from "../utils/jwtUtil.js";

export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split("Bearer ")[1];
  
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
  
    try {
      const decodedTokenObject = decodeToken(token);
      req.userEmail = decodedTokenObject.email;
      next();
    } catch (error) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
};