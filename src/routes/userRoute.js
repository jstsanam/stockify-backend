import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  getUserProfileController,
  updateUserProfileController,
  getUserWatchlistController,
  addStockToUserWatchlistController,
  removeStockFromUserWatchlistController
} from "../controllers/userController.js";
import { PROFILE_ROUTE_URL, WATCHLIST_ROUTE_URL } from "../constants/paths.js";

// Route handler for Users Route
const userRoute = express.Router();

userRoute.get(PROFILE_ROUTE_URL, authenticateUser, getUserProfileController);
userRoute.put(PROFILE_ROUTE_URL, authenticateUser, updateUserProfileController);
userRoute.get(
  WATCHLIST_ROUTE_URL,
  authenticateUser,
  getUserWatchlistController
);
userRoute.patch(
  WATCHLIST_ROUTE_URL,
  authenticateUser,
  addStockToUserWatchlistController
);
userRoute.delete(
  WATCHLIST_ROUTE_URL,
  authenticateUser,
  removeStockFromUserWatchlistController
)

export default userRoute;
