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
    origin: '*', // Allows requests from ANY origin
    methods: '*', // Allows ALL HTTP methods (GET, POST, PUT, DELETE, etc.)
    credentials: true, // Allow credentials like cookies and auth headers
  })
);

app.options('*', cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App is running 😉")
})

app.use(STOCKS_ROUTE_URL, stocksRoute);
app.use(AUTH_ROUTE_URL, authRoute);
app.use(USER_ROUTE_URL, userRoute);
