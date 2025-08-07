

import React, { useEffect, useState } from "react";
import "./UserReport.css";

function UserReport() {
  const [messages, setMessages] = useState([]);
  const [filterText, setFilterText] = useState("");

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

  
  const filteredMessages = messages.filter((msg) =>
    `${msg.firstName} ${msg.lastName} ${msg.email} ${msg.type} ${msg.message}`
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <div className="reports-container">
      <h2>All Reports</h2>

      <input
        type="text"
        placeholder="Search by name, email, or type..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="search-input"
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.firstName} {msg.lastName}</td>
                <td>{msg.email}</td>
                <td>{msg.type}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td>{msg.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No messages found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserReport;
