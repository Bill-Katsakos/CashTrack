import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import "../styles/expenseList.css";
import { parseISO, format } from "date-fns";

const ExpenseList = ({ expenses, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  const handleEditClick = (expense) => {
    setEditingId(expense._id);
    setEditedDescription(expense.description);
    setEditedDate(expense.date);
    setEditedAmount(expense.amount);
  };

  const handleSaveClick = async (expenseId) => {
    const updatedExpense = {
      expenseId,
      description: editedDescription,
      date: editedDate,
      amount: editedAmount,
    };
    await onUpdate(updatedExpense);
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  return (
    <div className="expense-list-container">
      <div className="expense-header">
        <span className="header-description">Description</span>
        <span className="header-amount">Amount</span>
        <span className="header-date">Date</span>
        <span className="header-actions">Actions</span>
      </div>
      <ul className="expense-list">
        {expenses.map((expense) => {
          // Parse and format the date to "dd/MM/yy"
          const displayDate = format(parseISO(expense.date), "dd/MM/yy");

          return (
            <li key={expense._id} className="expense-item">
              {editingId === expense._id ? (
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
                <div className="expense-details">
                  <span className="expense-description">{expense.description}</span>
                  <span className="expense-amount">${expense.amount}</span>

                  {/* display the date with "dd/MM/yy" format */}
                  <span className="expense-date">{displayDate}</span>

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
          );
        })}
      </ul>
    </div>
  );
};

export default ExpenseList;