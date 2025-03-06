import React, { useState, useContext } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import "../styles/expenseList.css";
import { parseISO, format } from "date-fns";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { AuthContext } from "../context/AuthContext";

const ExpenseList = ({ expenses, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleDeleteClick = (expenseId) => {
    setExpenseToDelete(expenseId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(expenseToDelete);
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  const handleEditClick = (expense) => {
    setEditingId(expense._id);
    setEditedDescription(expense.description);
    setEditedAmount(expense.amount);
    setEditedDate(expense.date);
  };

  const { currencySymbol } = useContext(AuthContext);

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
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      
      <ul className="expense-list">
  {expenses.map((expense) => {
    const displayDate = format(parseISO(expense.date), "dd/MM/yy");

    return (
      <li key={expense._id} className="expense-item">
        {editingId === expense._id ? (
          <div className="edit-form">
            <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="edit-input" placeholder="Description" />
            <input type="number" value={editedAmount} onChange={(e) => setEditedAmount(e.target.value)} className="edit-input" placeholder="Amount" />
            <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} className="edit-input" />
          
            <button onClick={() => handleSaveClick(expense._id)} className="save-btn" aria-label="Save"><FaSave /></button>
            <button onClick={handleCancelClick} className="cancel-btn" aria-label="Cancel"><FaTimes /></button>
          </div>
        ) : (
          <div className="expense-details">
            <div className="expense-row">
              <span className="expense-label">Description:      </span>
              <span className="expense-value"> {expense.description}</span>
            </div>

            <div className="expense-row">
              <span className="expense-label">Amount: </span>
              <span className="expense-value">{expense.amount} {currencySymbol}</span>
            </div>

            <div className="expense-row">
              <span className="expense-label">Date: </span>
              <span className="expense-value">{displayDate}</span>
            </div>

            <div className="expense-row">
              <span className="expense-label">Actions: </span>
              <div className="expense-actions">
                <button onClick={() => handleEditClick(expense)} className="edit-btn" aria-label="Edit">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteClick(expense._id)} className="delete-btn" aria-label="Delete">
                  <FaTrash />
                </button>
              </div>
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
