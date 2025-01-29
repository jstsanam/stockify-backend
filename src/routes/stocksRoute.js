import express from "express";
import { getStocksController } from "../controllers/stocksController.js";

// Route handler for Stocks Route
const stocksRoute = express.Router();

stocksRoute.get("/", getStocksController);

export default stocksRoute;
