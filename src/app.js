import express from "express";
import cors from "cors";
import stocksRoute from "./routes/stocksRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import {
  STOCKS_ROUTE_URL,
  AUTH_ROUTE_URL,
  USER_ROUTE_URL
} from "./constants/paths.js";
import { ENV } from "./config/environment.js";

export const app = express();

const allowedOrigins = ENV.ALLOWED_ORIGINS.split(',');
// Enables Cross-Origin Resource Sharing (CORS) to allow requests 
// from different domains which are blocked otherwise.
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App is running 😉")
})

app.use(STOCKS_ROUTE_URL, stocksRoute);
app.use(AUTH_ROUTE_URL, authRoute);
app.use(USER_ROUTE_URL, userRoute);
