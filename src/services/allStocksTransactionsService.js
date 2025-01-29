import { AllStocksTransactionsModel } from "../models/allStocksTransactionsModel.js";

export const getAllStocksTransactions = async () => {
  try {
    const allStocksTransactions = await AllStocksTransactionsModel.find();
    return { allStocksTransactions };
  } catch (error) {
    throw new Error("Failed to fetch all stocks transactions");
  }
};