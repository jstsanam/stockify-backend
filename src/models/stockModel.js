import mongoose from "mongoose";

export const stockSchema = new mongoose.Schema({
  stock_name: { type: String, required: true },
  base_price: { type: Number, required: true },
});

export const stockSchemaWithoutId = new mongoose.Schema({
  stockSchema,
  _id: false,
});

export const StockModel = mongoose.model("stock", stockSchema);
