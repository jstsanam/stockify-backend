import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import * as userController from "../controllers/userController.js";
import {
  PROFILE_ROUTE_URL,
  TRANSACTIONS_ROUTE_URL,
  WATCHLIST_ROUTE_URL,
} from "../constants/paths.js";

// Route handler for Users Route
const userRoute = express.Router();

// User Token Authentication Middleware
userRoute.use(authenticateUser);

// User Profile Routes
userRoute
  .route(PROFILE_ROUTE_URL)
  .get(userController.getUserProfileController)
  .put(userController.updateUserProfileController);

// User Watchlist Routes
userRoute
  .route(WATCHLIST_ROUTE_URL)
  .get(userController.getUserWatchlistController)
  .patch(userController.addStockToUserWatchlistController)
  .delete(userController.removeStockFromUserWatchlistController);

// User Transactions Routes
userRoute
  .route(TRANSACTIONS_ROUTE_URL)
  .get(userController.getUserTransactionsController)
  .patch(userController.addUserTransactionController);

export default userRoute;
