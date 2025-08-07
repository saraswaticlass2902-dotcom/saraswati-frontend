
//ChatAdmin.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./ChatAdmin.css";

const socket = io("http://localhost:5000");

const ChatAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/registration/all")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error("User fetch error:", err));
  }, []);


  useEffect(() => {
    if (selectedEmail) {
      fetchChat(selectedEmail);
      markMessagesAsRead(selectedEmail);
    }
  }, [selectedEmail]);

const fetchUnreadCounts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/chat/unread-count");
    const counts = {};
    console.log("Unread raw response:", res.data);
    res.data.forEach((entry) => {
      counts[entry._id] = entry.count;
    });
    console.log("Parsed unreadCounts:", counts);
    setUnreadCounts(counts); 
  } catch (err) {
    console.error("Failed to fetch unread counts", err);
  }
};



  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (msg.sender === "user") {
        
        if (msg.email === selectedEmail) {
          setChatHistory((prev) => [...prev, msg]);
          markMessagesAsRead(msg.email);
        } else {
          
          setUnreadCounts((prev) => ({
            ...prev,
            [msg.email]: (prev[msg.email] || 0) + 1,
          }));

            fetchUnreadCounts();
        }
      }
    });

    return () => socket.off("receive_message");
  }, [selectedEmail]);



  useEffect(() => {
    if (!selectedEmail) return;
    const interval = setInterval(() => {
      fetchChat(selectedEmail);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedEmail]);

  
  const fetchChat = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/get/${email}`);
      if (res.data.success) {
        setChatHistory(res.data.messages);
      } else {
        setChatHistory([]);
      }
    } catch (err) {
      console.error("Error fetching chat:", err);
    }
  };


useEffect(() => {
  fetchUnreadCounts();
}, []);

  const markMessagesAsRead = async (email) => {
  try {
    await axios.put(`http://localhost:5000/api/chat/mark-read/${email}`);
    setUnreadCounts((prev) => ({ ...prev, [email]: 0 }));
  } catch (err) {
    console.error("Failed to mark as read:", err);
  }
};


 
  const handleSend = async () => {
    if (!message.trim() || !selectedEmail) return;

    const msgObj = {
      sender: "admin",
      receiver: "user",
      email: selectedEmail,
      message,
      time: new Date().toISOString(),
    };

    socket.emit("send_message", msgObj);

    try {
      await axios.post("http://localhost:5000/api/chat/save", msgObj);
    } catch (error) {
      console.error("Error saving message:", error);
    }

    setChatHistory((prev) => [...prev, msgObj]);
    setMessage("");
  };

  return (
    <div className="admin-chat-container">
      <div className="user-list">
        <h4 >Users Email</h4>
        {users.map((user) => {
          const isActive = user.email === selectedEmail;
          const unread = unreadCounts[user.email] || 0;

          return (
            <div
              key={user.email}
              className={`user-item ${isActive ? "active" : ""}`}
              onClick={() => setSelectedEmail(user.email)}
            >
              {user.username} ({user.email})
              {unread > 0 && <span className="unread-badge">{unread}</span>}
            </div>
          );
        })}
      </div>

      <div className="chat-box">
        <h3>Admin Chat</h3>
        {selectedEmail ? (
          <>
            <div className="chat-history">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={msg.sender === "admin" ? "admin-msg" : "user-msg"}
                >
                  <p>{msg.message}</p>
                  <span>{new Date(msg.time).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={message}
                placeholder="Type your message..."
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatAdmin;

