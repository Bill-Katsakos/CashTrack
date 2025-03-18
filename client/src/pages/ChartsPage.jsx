import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/ChartsPage.css"; 
import { fetchExpenseHistory } from "../services/expenseService";

const ChartsPage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetchExpenseHistory();
        console.log("Fetched expenses:", response); 
        setExpenses(response || []); 
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setExpenses([]); 
      }
    };
    fetchExpenses();
  }, []);
  
  const monthlyExpenses = Array(12).fill(0);
  expenses.forEach((expense) => {
    if (!expense.date || isNaN(expense.amount)) return; 
    const month = new Date(expense.date).getMonth();
    monthlyExpenses[month] += Number(expense.amount);
  });

  const totalSpent = monthlyExpenses.reduce((a, b) => (a || 0) + (b || 0), 0);
  const monthlyAverage = totalSpent / 12;
  const highestMonth = Math.max(...monthlyExpenses, 0); 
  const lowestMonth = Math.min(...monthlyExpenses, 0); 

  const chartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyExpenses,
        backgroundColor: "#ff8906",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="chart-page">
      <h2>Yearly Expenses Overview</h2>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
      <div className="quick-stats">
        <div className="stat-box">
          <p>Total Spent</p>
          <h3>${totalSpent.toFixed(2)}</h3>  
        </div>
        <div className="stat-box">
          <p>Monthly Average</p>
          <h3>${monthlyAverage.toFixed(2)}</h3>
        </div>
        <div className="stat-box">
          <p>Highest Month</p>
          <h3>${highestMonth.toFixed(2)}</h3>
        </div>
        <div className="stat-box">
          <p>Lowest Month</p>
          <h3>${lowestMonth.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage; 
