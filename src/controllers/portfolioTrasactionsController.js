import { portfolioTransactions } from "../data/portfolioTransactions.js";

export const getPortfolioTransactions = (req, res) => {
  res.json(portfolioTransactions);
};
