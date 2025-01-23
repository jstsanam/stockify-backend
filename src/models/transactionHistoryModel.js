import mongoose from "mongoose";

const transactionHistorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  stock_name: { type: String, required: true },
  stock_symbol: { type: String, required: true },
  stocksQuantity: { type: Number, required: true },
  timestamp: { type: String, required: true },
  transaction_price: { type: Number, required: true },
  type: { type: String, enum: ["Buy", "Sell"], required: true },
  status: { type: String, required: true },
});

export const TransactionHistoryModel = mongoose.model(
  "transactionHistory",
  transactionHistorySchema
);
