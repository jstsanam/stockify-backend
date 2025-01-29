import express from "express";
import transactionsHistoryRoute from "./routes/transactionsHistoryRoute.js";
import stocksRoute from "./routes/stocksRoute.js";
import allStocksTransactionsRoute from "./routes/allStocksTransactionsRoute.js";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
import authRoute from "./routes/authRoute.js";
import {
  ALL_STOCKS_TRANSACTIONS_ROUTE_URL,
  AUTH_ROUTE_URL,
  STOCKS_ROUTE_URL,
  TRANSACTION_HISTORY_ROUTE_URL,
  USER_ROUTE_URL,
} from "./constants/paths.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(TRANSACTION_HISTORY_ROUTE_URL, transactionsHistoryRoute);
app.use(STOCKS_ROUTE_URL, stocksRoute);
app.use(ALL_STOCKS_TRANSACTIONS_ROUTE_URL, allStocksTransactionsRoute);
app.use(USER_ROUTE_URL, usersRoute);
app.use(AUTH_ROUTE_URL, authRoute);
