import React, { useState , useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterForm = () => {
    const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Register the user
      await axios.post("http://localhost:8000/user/register", {
        email,
        password,
      });

      // Step 2: Automatically log the user in
      const loginResponse = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      // Step 3: Save the token to local storage
      localStorage.setItem("token", loginResponse.data.token);
      setIsLoggedIn(true); // Update auth state

      // Step 4: Redirect to the dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Signup</h2>
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
        Signup
      </button>
    </form>
  );
};

export default RegisterForm;