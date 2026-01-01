// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔥 Firebase config (तुझाच)
const firebaseConfig = {
  apiKey: "AIzaSyC5r2nJS1KH-pr1-iV5GdxYVxky5a7yUk0",
  authDomain: "saraswatiapp-5b274.firebaseapp.com",
  projectId: "saraswatiapp-5b274",
  storageBucket: "saraswatiapp-5b274.firebasestorage.app",
  messagingSenderId: "830538678242",
  appId: "1:830538678242:web:0b4f75f7b9ff0e74c743bb",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Export auth (IMPORTANT)
export const auth = getAuth(app);
