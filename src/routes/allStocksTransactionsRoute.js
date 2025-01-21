import express from "express";
import { getAllStocksTransactions } from "../controllers/allStocksTransactionsController.js";

// Route handler for All Stocks Transactions Route
const allStocksTransactionsRoute = express.Router();

allStocksTransactionsRoute.get("/", getAllStocksTransactions);

export default allStocksTransactionsRoute;
