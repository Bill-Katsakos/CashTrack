import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import AddExpenseForm from "../components/AddExpenseForm";
import "../styles/forms.css";
import "../styles/global.css";
import "../styles/dashboardPage.css";

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate();


  const fetchExpensesData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false); // If no token, update auth state
      navigate("/");       // Redirect to homepage
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
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
    fetchExpensesData();
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

  // Handler for adding a new expense
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]); // Add the new expense to the state
  };

  return (
    <div className="page-container">
      <div className="dashboard">
        {/* <h2>Dashboard</h2> */}
        <AddExpenseForm onAddExpense={handleAddExpense} defaultDate={new Date().toISOString().split('T')[0]} />
      </div>
    </div>
  );
};

export default DashboardPage;
