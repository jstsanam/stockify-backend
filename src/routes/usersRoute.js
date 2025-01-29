import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { getUserController } from "../controllers/userController.js";

// Route handler for Users Route
const usersRoute = express.Router();

usersRoute.get("/", authenticateUser, getUserController);

export default usersRoute;
