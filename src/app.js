import express from "express";
import transactionsHistoryRoute from "./routes/transactionsHistoryRoute.js";
import stocksRoute from "./routes/stocksRoute.js";
import allStocksTransactionsRoute from "./routes/allStocksTransactionsRoute.js"
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/transactions-history", transactionsHistoryRoute);
app.use("/stocks", stocksRoute);
app.use("/all-stocks-transactions", allStocksTransactionsRoute);