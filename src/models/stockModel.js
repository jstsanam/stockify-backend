import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  stock_name: { type: String, required: true },
  stock_symbol: { type: String, required: true },
  base_price: { type: Number, required: true },
});

export const StockModel = mongoose.model("stock", stockSchema);
