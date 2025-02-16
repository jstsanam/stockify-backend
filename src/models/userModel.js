import mongoose from "mongoose";
import { stockSchemaWithoutId } from "./stockModel.js";
import {
  TransactionType,
  TransactionStatus,
} from "../constants/enums.js";

const transactionHistorySchema = new mongoose.Schema({
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

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  current_balance: { type: Number, required: true },
  transactions: { type: [transactionHistorySchema], required: false },
  watchlist: {type: [stockSchemaWithoutId], required: false}
});

export const UserModel = mongoose.model("user", userSchema);
