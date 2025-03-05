import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import TodayExpensesPage from "./pages/TodayExpensesPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/todays" element={<TodayExpensesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;