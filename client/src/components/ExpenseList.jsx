import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense._id} className="expense-item">
          <span className="expense-description">{expense.description}</span>
          <span className="expense-amount">${expense.amount}</span>
          <span className="expense-date">{expense.date}</span>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;