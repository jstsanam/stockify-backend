import mongoose from "mongoose";
import { transactionHistorySchema } from "./transactionHistoryModel.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    current_balance: { type: Number, required: true },
    transactions: { type: [transactionHistorySchema], required: false },
  }
);

export const UserModel = mongoose.model("user", userSchema);
