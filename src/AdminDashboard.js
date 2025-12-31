import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FaUsers,
  FaComments,
  FaHome,
  FaFileAlt,
  FaVideo,
} from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

import "./AdminDashboard.css";
import AdminMenuBar from "./AdminMenuBar";
import ChatAdmin from "./ChatAdmin";

const AdminDashboard = ({ onSessionChange }) => {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* ===== LEFT SIDEBAR ===== */}
      <AdminMenuBar onLogout={onSessionChange } />


      {/* ===== RIGHT CONTENT AREA ===== */}
      <div className="admin-content-area">
        {/* ===== TOP NAVBAR ===== */}
        <nav className="admin-dashboard-navbar">
          <Link className="Admin-Button" to="/admin/dashboard/registration">
            <FaUsers /> Users
          </Link>

          {/* <Link className="Admin-Button" to="/admin/dashboard/ahouserent">
            <FaHome /> <AiOutlinePlus />
          </Link> */}

          <Link className="Admin-Button" to="/admin/dashboard/adminPurchases">
            <MdEmail size={18} /> Messages
          </Link>

          <Link className="Admin-Button" to="/admin/dashboard/courses">
            <FaFileAlt size={18} /> Add Course
          </Link>

          <Link className="Admin-Button" to="/admin/dashboard/teacher-lecture">
            <FaVideo size={18} /> Lecture
          </Link>

          <Link className="Admin-Button" to="/admin/dashboard/upload-lecture">
            📤 Upload
          </Link>

        
          {/* <button
            className="chat-icon-button"
            onClick={toggleChat}
            title="Open Chat"
          >
            <FaComments size={22} />
          </button> */}
        </nav>

    
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>

    
      {chatOpen && (
        <div className="chat-pops">
          <ChatAdmin onClose={toggleChat} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
