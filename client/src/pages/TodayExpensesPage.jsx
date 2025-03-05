import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { fetchExpenses, deleteExpense, updateExpense } from "../services/expenseService";
import ExpenseList from "../components/ExpenseList";
import { format } from "date-fns";
import "../styles/expenseList.css";
import "../styles/global.css";

const TodayExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 

  // Function to fetch and filter today's expenses
  const fetchAndFilterExpenses = async () => {
    try {
      const allExpenses = await fetchExpenses();
      const today = format(new Date(), "yyyy-MM-dd");
      const todaysExpenses = allExpenses.filter((expense) => expense.date === today);
      setExpenses(todaysExpenses);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    fetchAndFilterExpenses();
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

  const totalToday = expenses
  .reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
  .toFixed(2);

  return (
    <div className="page-container">
      <div className="dashboard">
        <h2>Today's Expenses: {totalToday}</h2>
        <ExpenseList
          expenses={expenses}
          onDelete={deleteExpense}
          onUpdate={updateExpense}
        />
      </div>
    </div>
  );
};

export default TodayExpensesPage;
