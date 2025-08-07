//ATransaction.js

import React, { useState } from "react";
import "./ATransaction.css";

function ATransaction() {
  const [searchEmail, setSearchEmail] = useState(""); 
  const [userEmail, setUserEmail] = useState("");     
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = () => {
    setLoading(true);
    setError("");

    fetch(`http://localhost:5000/api/admin/transactions/${searchEmail}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User not found") {
          setUsername("User not found");
          setUserEmail("");
          setTransactions([]);
        } else {
          setUsername(data.username || "");
          setUserEmail(data.email || ""); 
          setTransactions(data.transactions || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Transaction fetch failed", err);
        setError("Failed to load transactions");
        setLoading(false);
      });
  };

  const fetchBalance = () => {
    setLoading(true);
    setError("");

    fetch(`http://localhost:5000/api/admin/balance/${searchEmail}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User not found") {
          setBalance(null);
        } else {
          setBalance(data.balance || 0);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Balance fetch failed", err);
        setError("Failed to load balance");
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (!searchEmail) {
      setError("Please enter an email");
      return;
    }
    setError("");
    fetchTransactions();
    fetchBalance();
  };

  return (
    <div className="atransaction-container">
      <h2>Search User Transactions by Email</h2>

      <div className="search-box">
        <input
          type="email"
          placeholder="Enter user email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {(username || balance !== null) && (
            <div className="user-info">
              <p><strong>Username:</strong> {username}</p>
              <p><strong>Email:</strong> {userEmail}</p> 
              <p><strong>Balance:</strong> ₹{balance}</p>
            </div>
          )}

          {transactions.length === 0 ? (
            <p>No transactions found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id}>
                    <td>{tx.type}</td>
                    <td>₹{tx.amount}</td>
                    <td>{tx.status}</td>
                    <td>{new Date(tx.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default ATransaction;

