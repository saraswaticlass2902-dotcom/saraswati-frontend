//ChatUser.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./ChatUser.css";

const socket = io("http://localhost:5000");

const ChatUser = () => {
  const [email, setEmail] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (msg.email === email) {
        setChatHistory((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receive_message");
  }, [email]);


  // const fetchChat = async () => {
  //   if (!email) return;
  //   try {
  //     const res = await axios.get(`http://localhost:5000/api/chat/get/${email}`);
  //     if (res.data.success) {
  //       setChatHistory(res.data.messages);
  //     } else {
  //       setChatHistory([]);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching chat:", err);
  //   }
  // };

//   useEffect(() => {
//   if (!email) return;

//   const fetchChat = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/chat/get/${email}`);
//       if (res.data.success) {
//         setChatHistory(res.data.messages);
//       } else {
//         setChatHistory([]);
//       }
//     } catch (err) {
//       console.error("Error fetching chat:", err);
//     }
//   };

//   fetchChat();
// }, [email]);

//  useEffect(() => {
//     if (!email) return;

//     const fetchChat = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/chat/get/${email}`);
//         if (res.data.success) {
//           setChatHistory(res.data.messages);
//         } else {
//           setChatHistory([]);
//         }
//       } catch (err) {
//         console.error("Error fetching chat:", err);
//       }
//     };

//     fetchChat();
//   }, [email]);


//   useEffect(() => {
//     if (!email) return;
//     fetchChat();
//     const interval = setInterval(fetchChat, 500);
//     return () => clearInterval(interval);
//   }, [email]);

//  const fetchChat = async () => {
//     if (!email) return;
//     try {
//       const res = await axios.get(`http://localhost:5000/api/chat/get/${email}`);
//       if (res.data.success) {
//         setChatHistory(res.data.messages);
//       } else {
//         setChatHistory([]);
//       }
//     } catch (err) {
//       console.error("Error fetching chat:", err);
//     }
//   };

//   // On email change: start polling every 500ms
//   useEffect(() => {
//     if (!email) return;

//     fetchChat(); // Initial load

//     const interval = setInterval(() => {
//       fetchChat();
//     }, 500);

//     return () => clearInterval(interval); // Cleanup
//   }, [email]);

useEffect(() => {
  if (!email) return;

  const fetchChat = async () => {
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

  fetchChat();

  const interval = setInterval(() => {
    fetchChat();
  }, 500);

  return () => clearInterval(interval);
}, [email]);


  const handleSend = async () => {
    if (message.trim() === "" || email.trim() === "") return;

    const msgObj = {
      sender: "user",
      receiver: "admin",
      email,
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
    <div className="wa-chat-container">
      <div className="wa-chat-header">24/7  Chat with Admin</div>

      <div className="wa-chat-email">
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="wa-chat-messages">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`wa-chat-bubble ${msg.sender === "user" ? "wa-user" : "wa-admin"}`}
          >
            <div className="wa-chat-text">{msg.message}</div>
            <div className="wa-chat-time">{new Date(msg.time).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      <div className="wa-chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatUser;
