import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExpenses, deleteExpense, updateExpense } from "../services/expenseService";
import ExpenseList from "../components/ExpenseList";
import { format, parseISO } from "date-fns";
import "../styles/expenseList.css";
import "../styles/global.css";

const TodayExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  // Fetch and filter today's expenses
  const fetchAndFilterExpenses = async () => {
    try {
      const allExpenses = await fetchExpenses();
      const today = format(new Date(), "yyyy-MM-dd");
      const todaysExpenses = allExpenses.filter((expense) => expense.date === today);
      setExpenses(todaysExpenses);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
      navigate("/login");
    }
  };

  // Handle delete
  const handleDelete = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      fetchAndFilterExpenses(); // Re-fetch to update the list
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  // Handle update
  const handleUpdate = async (updatedExpense) => {
    try {
      await updateExpense(updatedExpense);
      fetchAndFilterExpenses(); // Re-fetch to update the list
    } catch (err) {
      console.error("Failed to update expense", err);
    }
  };

  useEffect(() => {
    fetchAndFilterExpenses();
  }, [navigate]);

  return (
    <div className="page-container">
    <div className="dashboard">
      <h2>Today's Expenses</h2>
      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
    </div>
  );
};

export default TodayExpensesPage;