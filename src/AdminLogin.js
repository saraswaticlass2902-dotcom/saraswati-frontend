//AdminLogin.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin({ onSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  
const handleAdminLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/admin/admin-login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", 
  body: JSON.stringify({ email, password }),
});

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("isAdminLoggedIn", "true");
      if (onSuccess) onSuccess();
      setMessage("Login successful");
      navigate("/admin/dashboard");
    } else {
      setMessage(data.message || "Invalid credentials");
    }
  } catch (err) {
    setMessage("Server error");
  }
};


  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Enter Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

     
      <button className="LoginAdmin" onClick={handleAdminLogin}>Login</button>

      {message && <p style={{ color: message.includes("Invalid") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}

export default AdminLogin;
