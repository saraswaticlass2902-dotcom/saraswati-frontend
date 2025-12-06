

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./DashMenuBar.css";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

function DashMenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [userDetails, setUserDetails] = useState({ email: "", username: "" });

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  // 15 मिनिट inactivity timeout (milliseconds)
  const INACTIVITY_LIMIT = 15 * 60 * 1000;

  // State for remaining time (milliseconds)
  const [remainingTime, setRemainingTime] = useState(INACTIVITY_LIMIT);

  // Timer refs
  const logoutTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Reset timer function
  const resetInactivityTimer = () => {
    setRemainingTime(INACTIVITY_LIMIT);

    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    // Logout timeout
    logoutTimerRef.current = setTimeout(() => {
      alert("⏰ Session expired due to inactivity.");
      localStorage.clear();
      navigate("/login");
    }, INACTIVITY_LIMIT);

    // Countdown updater every second
    countdownIntervalRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1000) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  // Listen to user activity to reset timer
  useEffect(() => {
    if (!email) return;

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const activityHandler = () => resetInactivityTimer();

    events.forEach(event => window.addEventListener(event, activityHandler));
    resetInactivityTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, activityHandler));
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [email, navigate]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/details?email=${email}`);
        if (!res.ok) {
          console.error("Failed to fetch profile:", res.statusText);
          return;
        }

        const data = await res.json();
        setUserDetails({ email: data.email, username: data.username });
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };

    if (email) {
      fetchProfile();
    }
  }, [email]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Change password handler
  const handleChangePassword = async () => {
    if (!oldPass || !newPass || !confirmPass) {
      alert("❗ Please fill all fields!");
    } else if (newPass !== confirmPass) {
      alert("❗ New and Confirm password do not match!");
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/auth/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("✅ Password changed successfully!");
          setOldPass("");
          setNewPass("");
          setConfirmPass("");
          setIsOpen(false);
        } else {
          alert(`❌ ${data.error}`);
        }
      } catch (err) {
        alert("❌ Error changing password");
      }
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account permanently?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/auth/delete-account`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🗑️ Account deleted successfully!");
        localStorage.clear();
        navigate("/registration");
      } else {
        alert(`❌ ${data.error || "Failed to delete account"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Something went wrong while deleting the account.");
    }
  };

  const toggleSection = (sectionName) => {
    setActiveSection(prev => (prev === sectionName ? "" : sectionName));
  };

  // Format milliseconds to mm:ss format
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
  };

  return (
    <div>
      {!isOpen && (
        <div className="hamburger" onClick={() => setIsOpen(true)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" style={{ marginBottom: "40px" }} />
        </div>
      )}

      {isOpen && (
        <div className={`sidebar ${isOpen ? "show" : "hide"}`}>
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>

          <ul>
            <li onClick={() => toggleSection("profile")}>
              <FaUserCircle /> My Profile
            </li>

            <li onClick={() => toggleSection("changePassword")}>
              <RiLockPasswordLine style={{ fontSize: "22px", marginRight: "8px" }} />
              Change Password
            </li>

            <li onClick={handleLogout}>
              <FiLogOut style={{ marginRight: "8px" }} /> Logout
            </li>

            <li onClick={handleDeleteAccount}>
              <FiTrash2 style={{ marginRight: "8px" }} /> Delete account
            </li>
          </ul>

          {/* Countdown display */}
          <div style={{ margin: "10px", fontWeight: "bold", fontSize: "14px", color: "#b22222" }}>
            Logout in: {formatTime(remainingTime)} (mm:ss)
          </div>

          {activeSection === "profile" && (
            <div className="profile-box">
              <h3>👤 My Profile</h3>
              <p><strong>Username:</strong> {userDetails.username || "N/A"}</p>
              <p><strong>Email:</strong> {userDetails.email || "N/A"}</p>
            </div>
          )}

          {activeSection === "changePassword" && (
            <div className="change-password-form">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button className="Update-password" onClick={handleChangePassword}>
                Update Password
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
  export default DashMenuBar;
