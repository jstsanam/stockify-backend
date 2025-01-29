import express from "express";
import { getTransactionsHistoryController, postTransactionController } from "../controllers/transactionsHistoryController.js";

// Route handler for Transactions History Route
const transactionsHistoryRoute = express.Router();

transactionsHistoryRoute.get("/", getTransactionsHistoryController);
transactionsHistoryRoute.post("/", postTransactionController);

export default transactionsHistoryRoute;