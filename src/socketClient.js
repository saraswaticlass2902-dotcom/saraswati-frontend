// src/socketClient.js
import { io } from "socket.io-client";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const socket = io(API, {
  transports: ["websocket","polling"],
  withCredentials: true
});
