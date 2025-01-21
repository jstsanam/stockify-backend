import express from "express";
import { getPortfolioTransactions } from "../controllers/portfolioTrasactionsController.js";

// Route handler for Portfolio Transactions Route
const portfolioTransactionsRoute = express.Router();

portfolioTransactionsRoute.get("/", getPortfolioTransactions);

export default portfolioTransactionsRoute;
