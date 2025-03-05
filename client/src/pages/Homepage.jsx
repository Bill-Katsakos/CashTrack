import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/landingPage.css";
import "../styles/glassmorphism.css";


const Homepage = () => {
  const [showLogin, setShowLogin] = useState(true);

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