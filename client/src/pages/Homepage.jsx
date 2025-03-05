import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/landingPage.css";
import "../styles/glassmorphism.css";

const Homepage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { setIsLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Check token on initial load
  useEffect(() => {
    // If a token exists on initial load, update auth state and navigate to /dashboard
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate, setIsLoggedIn]);

  // Listen for tab visibility changes (if another tab logs in)
  useEffect(() => {
    // This function will check for a token when the tab becomes visible
    const handleVisibilityChange = () => {
      // If the tab is now active/visible, check if there's a valid token
      if (document.visibilityState === "visible") {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          navigate("/dashboard");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="landing-page">
      <h1>Welcome to CashTrack</h1>
      <div className="auth-buttons">
        <button
          onClick={() => setShowLogin(true)}
          className={showLogin ? "btn active" : "btn"}
        >
          Login
        </button>
        <button
          onClick={() => setShowLogin(false)}
          className={!showLogin ? "btn active" : "btn"}
        >
          Signup
        </button>
      </div>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default Homepage;
