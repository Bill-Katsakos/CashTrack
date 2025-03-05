import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/forms.css"
import { AuthContext } from "../context/AuthContext"; 

const getTodayDate = () => {
  return new Date().toLocaleDateString("sv-SE"); 
};


const AddExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
    const { currencySymbol } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/expenses/add",
        { description, date, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAddExpense(response.data.createdExpense); // Update the expenses list
      setDescription("");
      setDate(getTodayDate());
      setAmount("");
      setError("");
    } catch (err) {
      setError("Failed to add expense. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add New Expense</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          max={getTodayDate()} // max date user can add
        />
      </div>
      <div className="form-group">
        <label>Amount{` ${currencySymbol}`}</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;