import express from "express";
import { signupController, signinController } from "../controllers/authController.js";

// Route handler for Users Route
const authRoute = express.Router();

authRoute.post("/signup", signupController);
authRoute.post("/signin", signinController);

export default authRoute;