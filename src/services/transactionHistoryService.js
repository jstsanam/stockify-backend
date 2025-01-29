import { TransactionHistoryModel } from "../models/transactionHistoryModel.js";
import {
  TransactionStatus,
  TransactionType,
} from "../constants/enums.js";

export const getTransactionsHistory = async () => {
  try {
    const transactions = await TransactionHistoryModel.find();
    return { transactions };
  } catch (error) {
    throw new Error("Failed to fetch transactions history");
  }
};

export const postTransaction = async (transaction) => {
  const requiredFields = [
    "stock_id",
    "stock_name",
    "stock_symbol",
    "stocks_quantity",
    "timestamp",
    "transaction_price",
    "type",
    "status",
  ];

  for (let field of requiredFields) {
    if (!transaction[field]) {
      throw new Error(`${field} is required!`);
    }
  }

  const { type, status, stocks_quantity } = transaction;

  if (!Object.values(TransactionType).includes(type)) {
    throw new Error("Type field is not correct! It should be 'Buy' or 'Sell'");
  }

  if (!Object.values(TransactionStatus).includes(status)) {
    throw new Error(
      "Status field is not correct! It should be 'Passed' or 'Failed'"
    );
  }

  if (stocks_quantity < 1) {
    throw new Error("Stocks quantity cannot be negative!");
  }

  try {
    const newTransaction = new TransactionHistoryModel(transaction);
    const savedTransaction = await newTransaction.save();
    return { savedTransaction };
  } catch (error) {
    throw new Error("Error saving transaction!");
  }
};
