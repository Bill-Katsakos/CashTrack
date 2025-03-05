import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExpenses, deleteExpense, updateExpense } from "../services/expenseService";
import ExpenseList from "../components/ExpenseList";
import { format, parseISO } from "date-fns";

const HistoryPage = () => {
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const navigate = useNavigate();

  // Fetch and group expenses
  const fetchAndGroupExpenses = async () => {
    try {
      const allExpenses = await fetchExpenses();
      const grouped = groupExpensesByMonth(allExpenses);
      setGroupedExpenses(grouped);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
      navigate("/login");
    }
  };

  // Handle delete
  const handleDelete = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      fetchAndGroupExpenses(); // Re-fetch to update the list
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  // Handle update
  const handleUpdate = async (updatedExpense) => {
    try {
      await updateExpense(updatedExpense);
      fetchAndGroupExpenses(); // Re-fetch to update the list
    } catch (err) {
      console.error("Failed to update expense", err);
    }
  };

  useEffect(() => {
    fetchAndGroupExpenses();
  }, [navigate]);

  return (
    <div className="history-page">
      <h2>Expense History</h2>
      {Object.entries(groupedExpenses)
        .sort((a, b) => new Date(b[0]) - new Date(a[0]))
        .map(([monthYear, expenses]) => (
          <div key={monthYear} className="month-section">
            <h3 className="month-header">{monthYear}</h3>
            <ExpenseList
              expenses={expenses}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        ))}
    </div>
  );
};

// Helper function to group expenses by month/year
const groupExpensesByMonth = (expenses) => {
  const grouped = {};
  expenses.forEach((expense) => {
    const date = parseISO(expense.date);
    const monthYear = format(date, "MMMM yyyy");
    if (!grouped[monthYear]) grouped[monthYear] = [];
    grouped[monthYear].push(expense);
  });
  return grouped;
};

export default HistoryPage;