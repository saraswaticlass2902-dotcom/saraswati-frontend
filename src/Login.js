//Login.js

import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import LoginImage from "./Login-Image.svg";

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login Successfully");
        if (onSuccess) onSuccess(email);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-split-container">
      
      <div className="login-left">
        <img src={LoginImage} alt="Invest Illustration" className="login-image" />
        <h2>Invest in Bonds & FDs Online</h2>
        <ul>
          <li>✅ Competitive Pricing for 100+ Bonds</li>
          <li>✅ Tech-Driven Investment Tools</li>
          <li>✅ Learning Modules & Live Webinars</li>
        </ul>
      </div>

     
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <p>Login to access your account.</p>

          <input
            type="email"
            placeholder="Enter Email"
            name="email"
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

          <p className="forgot-text">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <button onClick={handleLogin}>Login</button>

          <p className="signup-text">
            New User? <Link to="/registration">Signup</Link>
          </p>

          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
