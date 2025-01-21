import express from "express";
import { getStocks } from "../controllers/stocksController.js";

// Route handler for Stocks Route
const stocksRoute = express.Router();

stocksRoute.get("/", getStocks);

export default stocksRoute;
