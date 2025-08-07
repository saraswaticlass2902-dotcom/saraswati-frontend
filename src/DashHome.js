//DashHome.js

import React, { useState } from "react";
import ChatUser from "./ChatUser";
import "./DashHome.css";
import { FaComments } from "react-icons/fa";

const DashHome = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="dashhome-container">
      <h1>Welcome to Next Investment</h1>

      <button className="chat-toggle-btn" onClick={() => setShowChat(!showChat)}>
        <FaComments /> {showChat ? "Close Chat" : "Live Chat"}
      </button>

      {showChat && (
        <div className="chat-popup">
          <ChatUser />
        </div>
      )}
    </div>
  );
};

export default DashHome;
