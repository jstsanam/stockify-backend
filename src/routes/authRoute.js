import express from "express";
import { signupController, signinController } from "../controllers/authController.js";
import { SIGN_IN_ROUTE_URL, SIGN_UP_ROUTE_URL } from "../constants/paths.js";

// Route handler for Users Route
const authRoute = express.Router();

authRoute.post(SIGN_UP_ROUTE_URL, signupController);
authRoute.post(SIGN_IN_ROUTE_URL, signinController);

export default authRoute;