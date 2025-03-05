import React, { useState , useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/forms.css"
import "../styles/glassmorphism.css"

const LoginForm = () => {
 const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });
  
      // Check if response contains a valid token before proceeding
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true); // Update auth state
        navigate("/dashboard");  // Redirect to dashboard after login
      } else {
        // Display error message from server if available
        setError(response.data.msg || "Login failed. Please try again.");
        setEmail("")
        setPassword("")
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;