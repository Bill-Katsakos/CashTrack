import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";

const TodayExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  // Get today's date in "YYYY-MM-DD" format (matches the backend)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Fetch today's expenses
  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Filter expenses for today
      const today = getTodayDate();
      const todaysExpenses = response.data.filter(
        (expense) => expense.date === today
      );
      
      setExpenses(todaysExpenses);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h2>Today's Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses added today.</p>
      ) : (
        <ExpenseList expenses={expenses} />
      )}
    </div>
  );
};

export default TodayExpensesPage;