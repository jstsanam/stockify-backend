import mongoose from "mongoose";
import {
  TransactionType,
  TransactionStatus,
} from "../constants/enums.js";

export const transactionHistorySchema = new mongoose.Schema({
  stock_id: { type: String, required: true },
  stock_name: { type: String, required: true },
  stock_symbol: { type: String, required: true },
  stocks_quantity: { type: Number, required: true },
  timestamp: { type: String, required: true },
  transaction_price: { type: Number, required: true },
  type: {
    type: String,
    enum: Object.values(TransactionType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    required: true,
  },
});

export const TransactionHistoryModel = mongoose.model(
  "transactionHistory",
  transactionHistorySchema
);
