

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPurchases.css";

function AdminPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchPurchases(); }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/purchases/admin", { withCredentials: true });
      setPurchases(res.data);
      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/purchases/admin/${id}`, { status }, { withCredentials: true });
      fetchPurchases();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - Purchases</h2>
      {loading ? <p>Loading...</p> :
        <table className="admin-table">
          <thead>
            <tr>
              <th>House</th><th>Buyer Name</th><th>Email</th><th>Phone</th><th>Amount</th>
              <th>ID Proof</th><th>Payment Receipt</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.buyerName}</td>
                <td>{p.buyerEmail}</td>
                <td>{p.buyerPhone}</td>
                <td>{p.amount}</td>
                <td>{p.idProof ? <a href={`http://localhost:5000/${p.idProof}`} target="_blank" rel="noreferrer">View</a> : "N/A"}</td>
                <td>{p.paymentReceipt ? <a href={`http://localhost:5000/${p.paymentReceipt}`} target="_blank" rel="noreferrer">View</a> : "N/A"}</td>
                <td>{p.status}</td>
                <td>
                  {p.status === "pending" ? (
                    <>
                      <button onClick={() => handleStatusChange(p._id, "approved")}>Approve</button>
                      <button onClick={() => handleStatusChange(p._id, "rejected")}>Reject</button>
                    </>
                  ) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default AdminPurchases;
