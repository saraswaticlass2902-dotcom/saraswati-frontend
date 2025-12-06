// //AdminDashboard.js

// import { Outlet, Link } from "react-router-dom";
// import React, { useState } from "react";
// import {  FaBox, FaExchangeAlt, FaUsers, FaChartBar } from "react-icons/fa";
// import "./AdminDashboard.css";
// import { FaComments } from "react-icons/fa";
// import AdminMenuBar from "./AdminMenubar";
// import ChatAdmin from "./ChatAdmin";
// import { FaHome } from "react-icons/fa";
// import { AiOutlinePlus } from "react-icons/ai";
// import { AiOutlineInbox } from "react-icons/ai";
// import { MdEmail } from "react-icons/md";
// import { FaFileAlt } from "react-icons/fa";

// const AdminDashboard = () => {
// const [chatOpen, setChatOpen] = useState(false);

//  const toggleChat = () => {
//       setChatOpen(!chatOpen);
//    };

//   return (
// <div className="admin-dashboard-wrapper">

// <AdminMenuBar />


      
//       <nav className="admin-dashboard-navbar">     
//   <Link className="Admin-Button" to="/admin/dashboard/registration">
//     <FaUsers /> Users
//   </Link>  
//   <Link className="Admin-Button" to="/admin/dashboard/ahouserent">
//     <FaHome /> <AiOutlinePlus />
//   </Link>
//   <Link className="Admin-Button" to="/admin/dashboard/adminPurchases">
//     <MdEmail size={22} color="white"/> 
//   </Link>
//   <Link className="Admin-Button" to="/admin/dashboard/reports">
//     <FaFileAlt size={20} color="white" />
//   </Link>

//   {/* 👇 Add this new Teacher Lecture button */}
//   <Link className="Admin-Button" to="/admin/dashboard/teacher-lecture">
//     🎥 Lecture
//   </Link>

//   <button
//     style={{ background: "transparent" }}
//     className="chat-icon-button"
//     onClick={toggleChat}
//   >
//     <FaComments size={24} />
//   </button>
// </nav>

// <main className="admin-main-content">
// <Outlet />
// </main>
// {chatOpen && (
//   <div className="chat-pops">
//      <ChatAdmin onClose={toggleChat} />
//   </div>
// )}
// </div>
//   );
// };

// export default AdminDashboard;

import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import { FaUsers, FaComments, FaHome, FaFileAlt, FaVideo } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import "./AdminDashboard.css";
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
        <Link className="Admin-Button" to="/admin/dashboard/registration">
          <FaUsers /> Users
        </Link>

        <Link className="Admin-Button" to="/admin/dashboard/ahouserent">
          <FaHome /> <AiOutlinePlus />
        </Link>

        <Link className="Admin-Button" to="/admin/dashboard/adminPurchases">
          <MdEmail size={22} color="white" />
        </Link>

        <Link className="Admin-Button" to="/admin/dashboard/reports">
          <FaFileAlt size={20} color="white" />
        </Link>

        {/* Teacher Lecture Button */}
        <Link className="Admin-Button" to="/admin/dashboard/teacher-lecture">
          <FaVideo size={20} /> Lecture
        </Link>

        {/* Upload Lecture Button */}
        <Link className="Admin-Button" to="/admin/dashboard/upload-lecture">
          📤 Upload Lecture
        </Link>

        <button
          style={{ background: "transparent" }}
          className="chat-icon-button"
          onClick={toggleChat}
        >
          <FaComments size={24} />
        </button>
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
