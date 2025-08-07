
//Dashboard.js

import { useState } from "react";
import { FaComments } from "react-icons/fa";
import ChatUser from "./ChatUser";
import DashMenuBar from "./DashMenuBar";
import "./Dashboard.css";
import { Outlet, Link } from "react-router-dom";

function Dashboard() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="dashboard-wrapper">
      <DashMenuBar />

      <nav className="dashboard-navbar">
        <Link to="/dashboard/home" className="Dashboard-button"> Home</Link>
        <Link to="/dashboard/stock" className="Dashboard-button"> Stock</Link>
        <Link to="/dashboard/transaction" className="Dashboard-button"> Transaction</Link>

        <button
          className="Dashboard-button"
          onClick={() => setShowChat(!showChat)}
        >
          <FaComments /> Chat
        </button>
      </nav>

      <div className="dashboard-content">
        <Outlet />
        {showChat && (
          <div className="chat-popup">
            <ChatUser />
          </div>
        )}
      </div>
    </div>
  );
}
export default Dashboard;