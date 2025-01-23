import { AllStocksTransactionsModel } from "../models/allStocksTransactionsModel.js";

export const getAllStocksTransactions = async (req, res) => {
  try {
    const allStocksTransactions = await AllStocksTransactionsModel.find();
    res.status(200).json(allStocksTransactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all stocks transactions" });
  }
};