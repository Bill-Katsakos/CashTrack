const Expenses = require("../models/expenseModel");

// Test route to see all the expenses (app.get("/expenses/test", ...))
const getTestExpenses = async (req, res) => {
  try {
    let expenses = await Expenses.find();
    return res.send(expenses);
  } catch (error) {
    return res.send(error);
  }
};

// Create expense without auth (for test)
const createExpenseTest = async (req, res) => {
  try {
    let createdExpense = await Expenses.create(req.body);
    res
      .status(200)
      .send({ msg: "An expense has been added successfully 🤑", createdExpense });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create expense with user ID from the token
const createExpense = async (req, res) => {
  try {
    let userId = req.user.userId;
    const { description, date, amount } = req.body;

    let createdExpense = await Expenses.create({
      description,
      date,
      amount,
      user: userId,
    });

    res
      .status(200)
      .send({ msg: "An expense has been added successfully 🤑", createdExpense });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get user-specific expenses
const getUserExpenses = async (req, res) => {
  try {
    let userId = req.user.userId;
    let userExpenses = await Expenses.find({ user: userId });
    return res.status(200).send(userExpenses);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Delete expense (test)
const deleteExpenseTest = async (req, res) => {
  try {
    const deleteExpense = await Expenses.findByIdAndDelete(req.params.id);
    if (!deleteExpense) {
      return res.status(404).json({ msg: "Expense not found." });
    }
    return res.status(200).json({ msg: "Expense successfully deleted." });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Delete expense (with auth)
const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.body;
    if (!expenseId)
      return res.status(400).json({ msg: "Please provide the expense ID." });

    const expense = await Expenses.findByIdAndDelete(expenseId);
    if (!expense) {
      return res.status(404).json({ msg: "Expense not found." });
    }
    return res.status(200).json({ msg: "Expense successfully deleted." });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update expense (test)
const updateExpenseTest = async (req, res) => {
  try {
    const updateExpense = await Expenses.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateExpense) {
      res.status(404).send({ msg: "Expense not found" });
    } else {
      res
        .status(200)
        .send({ msg: "Expense updated successfully", updateExpense });
    }
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Cannot retrieve Expense", error: error.message });
  }
};

// Update expense (with auth)
const updateExpense = async (req, res) => {
  try {
    const expense = await Expenses.findById(req.body.expenseId);
    if (!expense)
      return res.status(404).json({ msg: "Expense not found." });

    const updatedExpense = await Expenses.findByIdAndUpdate(
      req.body.expenseId,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .send({ msg: "Expense updated successfully", updatedExpense });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Cannot retrieve Expense", error: error.message });
  }
};

module.exports = {
  getTestExpenses,
  createExpenseTest,
  createExpense,
  getUserExpenses,
  deleteExpenseTest,
  deleteExpense,
  updateExpenseTest,
  updateExpense,
};
// 🦖