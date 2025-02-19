import mongoose from "mongoose";
import { stockSchemaWithoutId } from "./stockModel.js";
import { TransactionType, TransactionStatus } from "../constants/enums.js";

const userTransactionsSchema = new mongoose.Schema({
  stock_id: { type: String, required: true },
  stock_name: { type: String, required: true },
  stock_quantity: { type: Number, required: true },
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

const stockHoldingsSchema = new mongoose.Schema({
  stock_id: { type: String, required: true },
  stock_name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  current_balance: { type: Number, required: true },
  transactions: { type: [userTransactionsSchema], required: false },
  watchlist: { type: [stockSchemaWithoutId], required: false },
  stockHoldings: { type: [stockHoldingsSchema], required: false },
});

export const UserModel = mongoose.model("user", userSchema);
