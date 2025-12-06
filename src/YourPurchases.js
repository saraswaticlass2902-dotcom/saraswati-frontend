import React, { useEffect, useState } from "react";
import axios from "axios";
import "./YourPurchases.css";

function UserPurchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/purchases/my-purchases", { withCredentials: true });
      setPurchases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-container">
      <h2>My Purchases</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>House</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(p => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPurchases;
