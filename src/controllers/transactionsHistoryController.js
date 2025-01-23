import { TransactionHistoryModel } from "../models/transactionHistoryModel.js";

export const getTransactionsHistory = async (req, res) => {
  try {
    const transactions = await TransactionHistoryModel.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions history" });
  }
};

export const postTransaction = async (req, res) => {
  const { transaction } = req.body;

  if (!transaction) {
    return res.status(400).json({ error: "Transaction not found!" });
  }

  try {
    const newTransaction = new TransactionHistoryModel(transaction);
    const savedTransaction = await newTransaction.save();
    res.status(201).json({
      message: "Transaction saved successfully",
      data: savedTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save transaction" });
  }
};
