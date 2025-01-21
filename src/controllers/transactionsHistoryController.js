let historyBuySell = [];

export const getTransactionsHistory = (req, res) => {
  res.json(historyBuySell);
};

export const postTransaction = (req, res) => {
  const { transaction } = req.body;

  if (!transaction) {
    return res.status(400).json({ error: "Transaction not found!" });
  }

  historyBuySell.push(transaction);
  res.status(201).json({ message: "Transaction completed successfully" });
};
