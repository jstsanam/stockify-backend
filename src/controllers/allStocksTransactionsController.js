import { allStocksTransactions } from "../data/allStocksTransactions.js";

export const getAllStocksTransactions = (req, res) => {
  res.json(allStocksTransactions);
};
