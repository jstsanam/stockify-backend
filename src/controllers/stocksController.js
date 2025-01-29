import { getStocks } from "../services/stocksService.js";

export const getStocksController = async (req, res) => {
  try {
    const { stocks } = await getStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};
