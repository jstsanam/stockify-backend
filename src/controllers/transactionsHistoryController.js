import {
  getTransactionsHistoryByEmail,
  postTransaction,
} from "../services/transactionHistoryService.js";

export const getTransactionsHistoryController = async (req, res) => {
  try {
    const transactions = await getTransactionsHistoryByEmail();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postTransactionController = async (req, res) => {
  const { transaction } = req.body;

  try {
    const savedTransaction = await postTransaction(transaction);
    res.status(201).json({
      message: "Transaction saved successfully",
      data: savedTransaction,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
