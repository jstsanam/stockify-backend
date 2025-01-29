import express from "express";
import { getUsersController, userSignUpController, userSignInController } from "../controllers/usersController.js";

// Route handler for Users Route
const usersRoute = express.Router();

usersRoute.get("/", getUsersController);
usersRoute.post("/signup", userSignUpController);
usersRoute.post("/signin", userSignInController)

export default usersRoute;
