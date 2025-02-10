import express from "express";
import cors from "cors";
import transactionsHistoryRoute from "./routes/transactionsHistoryRoute.js";
import stocksRoute from "./routes/stocksRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import {
  STOCKS_ROUTE_URL,
  AUTH_ROUTE_URL,
  USER_ROUTE_URL,
  TRANSACTION_HISTORY_ROUTE_URL
} from "./constants/paths.js";

export const app = express();

// Enables Cross-Origin Resource Sharing (CORS) to allow requests 
// from different domains which are blocked otherwise.
app.use(cors());
app.use(express.json());

app.use(TRANSACTION_HISTORY_ROUTE_URL, transactionsHistoryRoute);
app.use(STOCKS_ROUTE_URL, stocksRoute);
app.use(AUTH_ROUTE_URL, authRoute);
app.use(USER_ROUTE_URL, userRoute);
