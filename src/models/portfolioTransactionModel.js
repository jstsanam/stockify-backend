import mongoose from "mongoose";

const portfolioTransactionSchema = new mongoose.Schema({
  stock_name: { type: String, required: true },
  stock_symbol: { type: String, required: true },
  transaction_price: { type: Number, required: true },
  timestamp: { type: String, required: true },
  status: { type: String, required: true },
});

export const PortfolioTransactionModel = mongoose.model(
  "portfolioTransaction",
  portfolioTransactionSchema
);
