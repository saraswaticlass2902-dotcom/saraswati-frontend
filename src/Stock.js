//Stock.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Stock.css";

const initialStocks = [
  { id: 1, name: "TCS", price: 3850.25, volume: 120 },
  { id: 2, name: "RELIANCE", price: 2725.4, volume: 200 },
  { id: 3, name: "INFY", price: 1550.1, volume: 98000 },
  { id: 4, name: "HDFCBANK", price: 1685.7, volume: 125 },
  { id: 5, name: "WIPRO", price: 535.6, volume: 750 },
  { id: 6, name: "ICICIBANK", price: 1010.3, volume: 105 },
  { id: 7, name: "SBIN", price: 715.2, volume: 150 },
  { id: 8, name: "HCLTECH", price: 1412.45, volume: 850 },
  { id: 9, name: "ITC", price: 460.0, volume: 170000 },
  { id: 10, name: "BAJAJFIN", price: 7400.5, volume: 620 },
  { id: 11, name: "ASIANPAINT", price: 3120.35, volume: 670 },
  { id: 12, name: "MARUTI", price: 10250.75, volume: 450 },
  { id: 13, name: "LT", price: 3785.9, volume: 710 },
  { id: 14, name: "SUNPHARMA", price: 1325.4, volume: 500 },
  { id: 15, name: "POWERGRID", price: 240.85, volume: 110 },
  { id: 16, name: "ONGC", price: 180.3, volume: 980 },
  { id: 17, name: "ADANIPORTS", price: 1250.6, volume: 580 },
  { id: 18, name: "ULTRACEMCO", price: 8700.0, volume: 300 },
  { id: 19, name: "COALINDIA", price: 470.1, volume: 890 },
  { id: 20, name: "NTPC", price: 285.2, volume: 920 },
].map(stock => ({ ...stock, initialPrice: stock.price, trend: "up" }));

function Stock() {
  const [stocks, setStocks] = useState(initialStocks);
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const change = parseFloat((Math.random() * 10).toFixed(2));
          const up = Math.random() > 0.5;
          let newPrice = up ? stock.price + change : stock.price - change;
          if (newPrice > stock.initialPrice + 100) {
            newPrice = stock.initialPrice + Math.random() * 5;
          }
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            trend: up ? "up" : "down",
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);



const handleBuy = async (stock) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/stock/buy",
      {
        name: stock.name,
        price: stock.price,
        volume: stock.volume,
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      alert(`✅ Buy successful for ${stock.name}`);
    } else {
      alert("❌ Failed to buy stock");
    }
  } catch (err) {
    const errorMessage =
      err?.response?.data?.message || "Server error during buy";
    alert("❌ " + errorMessage);
  }
};

const handleSell = async (stock) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/stock/sell",
      {
        name: stock.name,
        price: stock.price,
        volume: stock.volume,
     
      },
      {
        withCredentials: true, 
      }
    );

    if (res.data.success) {
      alert(`📤 Sell successful for ${stock.name}`);
    } else {
      alert("❌ Failed to sell stock");
    }
  } catch (err) {
    console.error("Error during sell:", err);
    alert("❌ Server error during sell");
  }
};
const fetchHistory = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/stock/user", {
      withCredentials: true, 
    });

    if (res.data.success) {
       const fixedHistory = res.data.stocks.map(item => ({
        ...item,
         createdAt: item.createdAt || item.boughtAt || item.soldAt || new Date().toISOString(),

      }));
      setHistory(fixedHistory);
      setShowHistory(true);
    } else {
      alert("❌ Could not fetch stock history");
    }
  } catch (err) {
    console.error("Error fetching history:", err);
    alert("❌ Server error");
  }
};


  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="stock-container">
      
      <h1>📊 Stock Market</h1>
      
      <p className="Nextinvestment">📈 Investing On Next Investment</p>
    <div class="history-button-container">
      <button className="history-button" onClick={fetchHistory}>
        Show Stock History
      </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search stock name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="stock-list">
        {filteredStocks.length > 0 ? (
          filteredStocks.map(stock => (
            <div key={stock.id} className="stock-card">
              <h2>{stock.name}</h2>
              <p> Price: ₹{stock.price.toFixed(2)}</p>
              <p> Volume: {stock.volume.toLocaleString()}</p>
              <p>
                 Trend:{" "}
                <span className={`trend ${stock.trend ?? "neutral"}`}>
                  {stock.trend ? stock.trend.toUpperCase() : "UNKNOWN"}
                </span>
              </p>
              <div className="stock-actions">
                <button onClick={() => handleBuy(stock)}>Buy</button>
                <button onClick={() => handleSell(stock)}>Sell</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-result">❌ No stocks found</p>
        )}
      </div>

      {showHistory && (
        <div className="history-section">
          <h2>📋 Stock Transaction History</h2>
          {history.length > 0 ? (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Stock Name</th>
                  <th>Type</th>
                  <th>Price (₹)</th>
                  <th>Volume</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td style={{ color: item.type === "buy" ? "green" : "red" }}>
                      {item.type?.toUpperCase() || "N/A"}
                    </td>
                    <td>{item.price?.toFixed(2) ?? "0.00"}</td>
                    <td>{item.volume}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>📭 No stock history found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Stock;
