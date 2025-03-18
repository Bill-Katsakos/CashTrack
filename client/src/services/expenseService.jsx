import axios from "axios";

const API_URL = "http://localhost:8000/expenses";

// Fetch all expenses
export const fetchExpenses = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch expenses", err);
    throw err;
  }
};

// Fetch expense history for charts
export const fetchExpenseHistory = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched expenses:", response.data); // ✅ Debugging
    return response.data;
  } catch (err) {
    console.error("Failed to fetch expense history", err);
    return []; 
  }
};

// Add a new expense
export const addExpense = async (expenseData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_URL}/add`, expenseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to add expense", err);
    throw err;
  }
};

// Update an expense
export const updateExpense = async (expenseData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${API_URL}/update`, expenseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to update expense", err);
    throw err;
  }
};

// Delete an expense
export const deleteExpense = async (expenseId) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${API_URL}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { expenseId },
    });
  } catch (err) {
    console.error("Failed to delete expense", err);
    throw err;
  }
};