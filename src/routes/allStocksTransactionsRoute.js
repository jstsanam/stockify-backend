import express from "express";
import { getAllStocksTransactionsController } from "../controllers/allStocksTransactionsController.js";

// Route handler for All Stocks Transactions Route
const allStocksTransactionsRoute = express.Router();

allStocksTransactionsRoute.get("/", getAllStocksTransactionsController);

export default allStocksTransactionsRoute;
