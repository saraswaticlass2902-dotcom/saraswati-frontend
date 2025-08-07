//AStock.js

import React, { useState } from "react";
import axios from "axios";
import "./AStock.css";


const AStock = () => {
  const [email, setEmail] = useState("");
  const [stocks, setStocks] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const fetchStockHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/byemail/${email}`, {
        withCredentials: true,
      });

      if (res.data.username === "User Not Found") {
        setStocks([]);
        setUsername("User Not Found");
        setError("No user found with this email.");
      } else {
        setStocks(res.data.stocks);
        setUsername(res.data.username);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setStocks([]);
      setUsername("User Not Found");
      setError("Something went wrong while fetching stock history.");
    }
  };

  return (
    <div className="astock-container">
      <h2>User Stock History</h2>
      <div className="search-box">
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchStockHistory}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {username && !error && (
        <div>
          <h3>Username: {username}</h3>
          <h4>Email: {email}</h4>
        </div>
      )}

      {stocks.length > 0 && (
        <table className="stock-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.name}</td>
                <td>{stock.type}</td>
                <td>{stock.price}</td>
                <td>{stock.volume}</td>
                <td>{stock.amount}</td>
                <td>{new Date(stock.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AStock;
