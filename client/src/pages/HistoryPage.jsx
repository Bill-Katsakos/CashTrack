// HistoryPage.jsx

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchExpenses, deleteExpense, updateExpense } from "../services/expenseService";
import ExpenseList from "../components/ExpenseList";
import { format, parseISO } from "date-fns";
import "../styles/historyPage.css";
import "../styles/global.css";

const HistoryPage = () => {
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // This function is used to group expenses by "MMMM yyyy"
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

  const fetchAndGroupExpenses = async () => {
    try {
      const allExpenses = await fetchExpenses();
      const grouped = groupExpensesByMonth(allExpenses);
      setGroupedExpenses(grouped);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  // Ensure user is logged in, otherwise redirect to "/"
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    fetchAndGroupExpenses();
  }, [isLoggedIn, navigate, setIsLoggedIn]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          navigate("/");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigate, setIsLoggedIn]);

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      fetchAndGroupExpenses(); // Re-fetch to update the list
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  const handleUpdate = async (updatedExpense) => {
    try {
      await updateExpense(updatedExpense);
      fetchAndGroupExpenses(); // Re-fetch to update the list
    } catch (err) {
      console.error("Failed to update expense", err);
    }
  };

  return (
    <div className="page-container">
      <div className="history-page">
        <h2>Expense History</h2>
        {Object.entries(groupedExpenses)
          // Sort so that the most recent month is displayed first
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .map(([monthYear, expenses]) => {
            // Calculate monthly total
            const monthlyTotal = expenses
              .reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
              .toFixed(2);

            return (
              <div key={monthYear} className="month-section">
                {/* Display the monthly total next to the monthYear */}
                <h3 className="month-header">
                  {monthYear} - ${monthlyTotal}
                </h3>
                <ExpenseList
                  expenses={expenses}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HistoryPage;
