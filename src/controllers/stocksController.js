import { stocks } from "../data/stocks.js";

export const getStocks = (req, res) => {
  res.json(stocks);
};
