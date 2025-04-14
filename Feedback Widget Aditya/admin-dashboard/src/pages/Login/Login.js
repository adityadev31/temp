import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/login-admin", {
        email,
        password,
      });

      if (response.data.err) {
        setError(response.data.err);
        return;
      }

      localStorage.setItem("token", response.data.data.jwtToken);
      navigate("/");
    } catch (err) {
      console.log("Invalid credentials");
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="signup-redirect">
        Don't have an account? <span onClick={() => navigate("/signup")}>Sign up here</span>
      </p>
    </div>
  );
};

export default Login;
