import mongoose from "mongoose";
import { transactionHistorySchema } from "./transactionHistoryModel.js";
import { stockSchemaWithoutId } from "./stockModel.js";

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
