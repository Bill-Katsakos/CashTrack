import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const ExpenseList = ({ expenses, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null); // Tracks which expense is being edited
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  // Handle clicking the Edit button
  const handleEditClick = (expense) => {
    setEditingId(expense._id); // Set the expense ID being edited
    setEditedDescription(expense.description); // Pre-fill the description
    setEditedDate(expense.date); // Pre-fill the date
    setEditedAmount(expense.amount); // Pre-fill the amount
  };

  // Handle saving the edited expense
  const handleSaveClick = async (expenseId) => {
    const updatedExpense = {
      expenseId,
      description: editedDescription,
      date: editedDate,
      amount: editedAmount,
    };
    await onUpdate(updatedExpense); // Call the onUpdate function passed from the parent
    setEditingId(null); // Exit edit mode
  };

  // Handle canceling the edit
  const handleCancelClick = () => {
    setEditingId(null); // Exit edit mode without saving
  };

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense._id} className="expense-item">
          {editingId === expense._id ? (
            // Edit mode
            <div className="edit-form">
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="edit-input"
                placeholder="Description"
              />
              <input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="edit-input"
              />
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                className="edit-input"
                placeholder="Amount"
              />
              <button
                onClick={() => handleSaveClick(expense._id)}
                className="save-btn"
                aria-label="Save"
              >
                <FaSave />
              </button>
              <button
                onClick={handleCancelClick}
                className="cancel-btn"
                aria-label="Cancel"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            // Display mode
            <div className="expense-details">
              <span className="expense-description">{expense.description}</span>
              <span className="expense-amount">${expense.amount}</span>
              <span className="expense-date">{expense.date}</span>
              <div className="expense-actions">
                <button
                  onClick={() => handleEditClick(expense)}
                  className="edit-btn"
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(expense._id)}
                  className="delete-btn"
                  aria-label="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;