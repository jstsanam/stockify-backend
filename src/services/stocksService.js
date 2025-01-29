import { StockModel } from "../models/stockModel.js";

export const getStocks = async () => {
  try {
    const stocks = await StockModel.find();
    return { stocks };
  } catch (error) {
    throw new Error("Failed to fetch stocks");
  }
};