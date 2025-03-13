import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css"
import "../styles/glassmorphism.css"
import "../styles/global.css"

const Navbar = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    setIsLoggedIn,

    currencySymbol,
    setCurrencySymbol
  } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update auth state
    navigate("/"); // Redirect to landing page
  };

  const handleCurrencyChange = (e) => {
    setCurrencySymbol(e.target.value);
  };

  // Only show navbar if user is logged in
  if (!isLoggedIn) return null;

  return (
    <nav>
    <div className="nav-left">
      <Link to="/dashboard">✚</Link>
      <Link to="/todays">Today's Expenses</Link>
      <Link to="/history">History</Link>

      <select 
      value={currencySymbol} 
      onChange={handleCurrencyChange}
      className="currency"
      >
        <option value="$">$ (USD)</option>
        <option value="€">€ (Euro)</option>
        <option value="£">£ (GBP)</option>
        <option value="¥">¥ (JPY)</option>
      </select>
      <Link to="/charts">Charts</Link>
    </div>
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  </nav>
  );
};

export default Navbar;