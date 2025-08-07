//AReports.js

import React, { useEffect, useState } from "react";

import "./AReports.css";
function AReports() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/admin/all-contacts", {
    method: "GET",
    credentials: "include", 
  })
    .then((res) => res.json())
    .then((data) => {

      setTimeout(() => {
   setMessages(data);
     }, 1000);
   
    })
    .catch((err) => {
      console.error("Failed to fetch contact messages", err);
    });
}, []);

const handleStatusUpdate = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/admin/update-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status: "Successful" }),
    });

    if (response.ok) {
      const updatedMessages = messages.map((msg) =>
        msg._id === id ? { ...msg, status: "Successful" } : msg
      );
      setMessages(updatedMessages);
    } else {
      console.error("Failed to update status");
    }
  } catch (err) {
    console.error("Error updating status:", err);
  }
};


  return (
    <div className="reports-container">
      <h2>All Reports From Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Message</th>
            <th>Created At</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.firstName} {msg.lastName}</td>
              <td>{msg.email}</td>
              <td>{msg.type}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.createdAt).toLocaleString()}</td>
              <td>
  {msg.status === "Pending" ? (
    <button className="status-btn" onClick={() => handleStatusUpdate(msg._id)}>
      Pending
    </button>
  ) : (
    <span className="success-label">Successful</span>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AReports;
