import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TodayExpensesPage.jsx"
import AddExpenseForm from "../components/AddExpenseForm";

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

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
      setExpenses(response.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [navigate]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]); // Add the new expense to the list
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <AddExpenseForm onAddExpense={handleAddExpense} />
   </div>
  )
};

export default DashboardPage;