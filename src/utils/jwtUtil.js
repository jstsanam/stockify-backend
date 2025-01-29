import jwt from "jsonwebtoken";
import { ENV } from "../config/environment.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    ENV.SECRET,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );
};

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, ENV.SECRET);
    } catch (err) {
        throw err;
    }
}