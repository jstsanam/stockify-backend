import mongoose from "mongoose";

const priceDataSchema = new mongoose.Schema({
  date: { type: String, required: true },
  prices: { type: [Number], required: true },
});

const allStocksTransactionsSchema = new mongoose.Schema({
  company: { type: String, required: true },
  symbol: { type: String, required: true },
  data: { type: [priceDataSchema], required: true },
});

export const AllStocksTransactionsModel = mongoose.model(
  "allStockTransaction",
  allStocksTransactionsSchema
);
