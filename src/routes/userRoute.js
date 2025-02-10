import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { getUserController, putUserController } from "../controllers/userController.js";

// Route handler for Users Route
const userRoute = express.Router();

userRoute.get("/", authenticateUser, getUserController);
userRoute.put("/", authenticateUser, putUserController)

export default userRoute;
