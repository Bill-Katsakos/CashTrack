import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update auth state
    navigate("/"); // Redirect to landing page
  };

  // Only show navbar if user is logged in
  if (!isLoggedIn) return null;

  return (
    <nav>
       <Link to="/dashboard">+ </Link>
      <Link to="/todays">Today's Expenses </Link>
      
      <Link to="/history">History </Link>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;