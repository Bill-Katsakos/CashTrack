const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
  description: String,
  date: String,
  amount: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
// 🦖