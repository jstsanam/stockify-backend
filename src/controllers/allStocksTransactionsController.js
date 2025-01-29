import { getAllStocksTransactions } from "../services/allStocksTransactionsService.js";

export const getAllStocksTransactionsController = async (req, res) => {
  try {
    const { allStocksTransactions } = await getAllStocksTransactions();
    res.status(200).json(allStocksTransactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all stocks transactions" });
  }
};
