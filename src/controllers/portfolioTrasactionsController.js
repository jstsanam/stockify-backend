import { PortfolioTransactionModel } from "../models/portfolioTransactionModel.js";

export const getPortfolioTransactions = async (req, res) => {
  try {
    const portfolioTransactions = await PortfolioTransactionModel.find();
    res.status(200).json(portfolioTransactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to portfolio transactions" });
  }
};
