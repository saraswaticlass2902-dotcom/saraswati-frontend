//ARegistration.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ARegistration.css";

const ARegistration = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/all-users", {
        withCredentials: true,
      });
      const usersData = response?.data?.users || [];
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/user-count", {
        withCredentials: true,
      });
      setUserCount(res.data.count);
    } catch (err) {
      console.error("Error fetching user count:", err);
    }
  };

  const deleteUser = async (email) => {
    const confirmDelete = window.confirm(`Delete user ${email} and all related data?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-user/${email}`, {
        withCredentials: true,
      });
      alert(`User ${email} deleted successfully.`);
      fetchUsers();      
      fetchUserCount();   
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchEmail(value);
    const filtered = users.filter((u) =>
      u.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    fetchUsers();       
    fetchUserCount();
  }, []);

  return (
    <div className="aregistration-container">
      <h2>Total Registered Users: {userCount}</h2>
      <input
        type="text"
        value={searchEmail}
        onChange={handleSearch}
        placeholder="Search by email..."
        className="search-input"
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(u.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ARegistration;
