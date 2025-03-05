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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false); // Update auth state
          navigate("/");      // Redirect to homepage
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigate, setIsLoggedIn]);

  useEffect(() => {
    // If user is not logged in, redirect to homepage immediately
    if (!isLoggedIn) {
      setIsLoggedIn(false); // Ensure auth state is false
      navigate("/");
      return;
    }

    // Function to fetch and group expenses by month/year
    const fetchAndGroupExpenses = async () => {
      try {
        const allExpenses = await fetchExpenses();
        const grouped = groupExpensesByMonth(allExpenses);
        setGroupedExpenses(grouped);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
        setIsLoggedIn(false); // In case of error, log out the user
        navigate("/");
      }
    };

    fetchAndGroupExpenses();
  }, [isLoggedIn, navigate, setIsLoggedIn]);

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

  return (
    <div className="page-container">
      <div className="history-page">
        <h2>Expense History</h2>
        {Object.entries(groupedExpenses)
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .map(([monthYear, expenses]) => (
            <div key={monthYear} className="month-section">
              <h3 className="month-header">{monthYear}</h3>
              <ExpenseList
                expenses={expenses}
                onDelete={deleteExpense}
                onUpdate={updateExpense}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HistoryPage;
