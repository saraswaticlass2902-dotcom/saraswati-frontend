//AdminDashboard.js


import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import {  FaBox, FaExchangeAlt, FaUsers, FaChartBar } from "react-icons/fa";
import "./AdminDashboard.css";
import { FaComments } from "react-icons/fa";
import AdminMenuBar from "./AdminMenubar";
import ChatAdmin from "./ChatAdmin";

const AdminDashboard = () => {
const [chatOpen, setChatOpen] = useState(false);

 const toggleChat = () => {
      setChatOpen(!chatOpen);
   };

  return (
<div className="admin-dashboard-wrapper">

<AdminMenuBar />

<nav className="admin-dashboard-navbar">     
   
<Link className="Admin-Button" to="/admin/dashboard/registration"><FaUsers /> Users</Link>  
<Link className="Admin-Button" to="/admin/dashboard/stock"><FaBox /> Stock</Link>
<Link className="Admin-Button" to="/admin/dashboard/transaction"><FaExchangeAlt /> Transactions</Link>
<Link className="Admin-Button" to="/admin/dashboard/reports"><FaChartBar />Reports</Link>
<button className="chat-icon-button" onClick={toggleChat}><FaComments size={24} />  </button>
</nav>
      

<main className="admin-main-content">
<Outlet />
</main>
{chatOpen && (
  <div className="chat-pops">
     <ChatAdmin onClose={toggleChat} />
  </div>
)}
</div>
  );
};

export default AdminDashboard;

