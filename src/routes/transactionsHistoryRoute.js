import express from "express";
import { getTransactionsHistory, postTransaction } from "../controllers/transactionsHistoryController.js";

// Route handler for Transactions History Route
const transactionsHistoryRoute = express.Router();

transactionsHistoryRoute.get("/", getTransactionsHistory);
transactionsHistoryRoute.post("/", postTransaction);

export default transactionsHistoryRoute;