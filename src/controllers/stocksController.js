import { StockModel } from "../models/stockModel.js";

export const getStocks = async (req, res) => {
  try {
    const stocks = await StockModel.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};