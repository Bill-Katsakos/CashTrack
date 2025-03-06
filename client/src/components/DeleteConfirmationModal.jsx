import React from 'react';
import "../styles/modal.css"

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glassmorphism">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this expense?</p>
        <div className="modal-actions">
          <button className="btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn confirm-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;