const express = require("express");
const authMiddleware = require("../middleware/auth");

const {
  getTestExpenses,
  createExpenseTest,
  createExpense,
  getUserExpenses,
  deleteExpenseTest,
  deleteExpense,
  updateExpenseTest,
  updateExpense,
} = require("../controllers/expenseController");

const router = express.Router();

// ---------- TEST routes ----------
router.get("/test", getTestExpenses);
router.post("/add/test", createExpenseTest);
router.delete("/delete/test/:id", deleteExpenseTest);
router.put("/update/test/:id", updateExpenseTest);

// ---------- Normal routes (with auth) ----------
router.get("/", authMiddleware, getUserExpenses);
router.post("/add", authMiddleware, createExpense);
router.delete("/delete", authMiddleware, deleteExpense);
router.put("/update", authMiddleware, updateExpense);

module.exports = router;
// 🦖