//AdminMenubar.js

import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./AdminMenuBar.css";

function AdminMenubar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await fetch("http://localhost:5000/api/admin-logout", {
      method: "POST",
      credentials: "include",
    });
 navigate("/admin-login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};



  return (
    <div>
      {!isOpen && (
        <div className="hamburger" onClick={() => setIsOpen(true)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" style={{ marginBottom: "40px" }} />
        </div>
      )}

      {isOpen && (
        <div className={`sidebar ${isOpen ? "show" : "hide"}`}>
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>

          <ul>
            {/* <li>
              <FaCog style={{ marginRight: "8px" }} />
              Settings
            </li> */}
            <li onClick={handleLogout}> <FiLogOut style={{ marginRight: "8px" }} />Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminMenubar;
