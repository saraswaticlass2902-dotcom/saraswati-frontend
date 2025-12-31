


import { useState } from "react";
import { FaComments } from "react-icons/fa";
import { BiHistory } from "react-icons/bi";
import { MdCastForEducation } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";

import ChatUser from "./ChatUser";
import DashMenuBar from "./DashMenuBar";

import "./Dashboard.css";

function Dashboard({ email, onLogout }) {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="dashboard-wrapper">
      {/* LEFT SLIDE MENU */}
      <DashMenuBar email={email} onLogout={onLogout} />

      {/* TOP BAR */}
      <header className="dashboard-topbar">
        <div className="topbar-right">
          <Link to="/dashboard/Courses" className="topbar-btn">
            Course
          </Link>
          <Link to="/dashboard/history" className="topbar-btn">
            <BiHistory /> History
          </Link>

          <Link to="/dashboard/student-lecture" className="topbar-btn">
            <MdCastForEducation /> Live Lecture
          </Link>

          <Link to="/dashboard/recorded-lectures" className="topbar-btn">
            <BsCameraVideo /> Recordings
          </Link>

          <button
            className="topbar-btn"
            onClick={() => setShowChat(!showChat)}
          >
            <FaComments /> Chat
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        <Outlet />

        {showChat && (
          <div className="chat-popup">
            <ChatUser />
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
