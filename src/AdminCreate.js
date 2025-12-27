import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminCreate.css";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

export default function AdminCreate() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password || !secret) {
      setMessage("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          secret,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Admin registered successfully. Redirecting to login...");
        setEmail("");
        setPassword("");
        setSecret("");

        setTimeout(() => {
          navigate("/admin-login");
        }, 1500);
      } else {
        setMessage(data.message || "❌ Failed to create admin");
      }
    } catch {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-create-wrapper">
      <form className="admin-create-card" onSubmit={handleCreate}>
        <h2>Create Admin</h2>

        <input type="email" placeholder="Admin Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} disabled={loading} />

        <input type="password" placeholder="Admin Password" value={password}
          onChange={(e) => setPassword(e.target.value)} disabled={loading} />

        <input type="password" placeholder="Admin Secret Code" value={secret}
          onChange={(e) => setSecret(e.target.value)} disabled={loading} />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Admin"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
