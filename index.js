const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let historyBuySell = [];

app.get("/api/history", (req, res) => {
  res.json(historyBuySell);
});

app.post("/api/history", (req, res) => {
  const { transaction } = req.body;
  console.log("transaction: ", transaction);
  if (!transaction)
    return res.status(400).json({ error: "Transaction is required" });

  historyBuySell.push(transaction);
  res.status(201).json({ message: "Transaction added successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});