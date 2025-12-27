

import React, { useState, useEffect, useRef } from "react";
import "./DashMenuBar.css";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

function DashMenuBar({ email, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");

  const [showDeleteOtp, setShowDeleteOtp] = useState(false);
  const [deleteOtp, setDeleteOtp] = useState("");

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    studentName: "",
    dob: "",
    gender: "",
    village: "",
    parentName: "",
    parentContact: "",
    standard: "",
  });

  const navigate = useNavigate();
  const logoutTimerRef = useRef(null);

  /* ================= AUTO LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      if (onLogout) await onLogout();
      navigate("/login", { replace: true });
    }
  };

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    if (!email) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profile/details`, {
          credentials: "include",
        });
        const data = await res.json();

        if (data.exists) {
          setProfileData({
            ...data.profile,
            dob: data.profile.dob
              ? data.profile.dob.split("T")[0]
              : "",
          });
        } else {
          setProfileData((p) => ({ ...p, email, username: email }));
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [email]);

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/profile/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      const data = await res.json();
      if (data.ok) {
        alert("✅ Profile updated");
        setEditMode(false);
      }
    } catch {
      alert("❌ Update failed");
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!oldPass || !newPass || !confirmPass) return alert("Fill all fields");
    if (newPass !== confirmPass) return alert("Passwords do not match");

    const res = await fetch(`${API_BASE}/api/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass }),
    });

    if (res.ok) {
      alert("Password changed");
      setActiveSection("");
    }
  };

  /* ================= DELETE ACCOUNT OTP ================= */
  const handleDeleteAccount = async () => {
    if (!window.confirm("Delete account permanently?")) return;

    const res = await fetch(`${API_BASE}/api/auth/delete-account-otp`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      alert("OTP sent");
      setShowDeleteOtp(true);
    }
  };

  const verifyDeleteOtp = async () => {
    const res = await fetch(`${API_BASE}/api/auth/verify-delete-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ otp: deleteOtp }),
    });

    if (res.ok) handleLogout();
    else alert("Invalid OTP");
  };

  return (
    <>
      {/* ===== HAMBURGER ===== */}
      {!isOpen && (
        <div className="hamburger" onClick={() => setIsOpen(true)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      )}

      {/* ===== SIDEBAR ===== */}
      {isOpen && (
        <div className="sidebar show">
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>

          <ul>
            <li
              onClick={() => {
                setShowProfilePopup(true);
                setIsOpen(false);
              }}
            >
              <FaUserCircle /> My Profile
            </li>

            <li onClick={() => setActiveSection("password")}>
              <RiLockPasswordLine /> Change Password
            </li>

            <li onClick={handleLogout}>
              <FiLogOut /> Logout
            </li>

            <li onClick={handleDeleteAccount}>
              <FiTrash2 /> Delete Account
            </li>
          </ul>
        </div>
      )}

      {/* ===== CHANGE PASSWORD POPUP ===== */}
      {activeSection === "password" && (
        <div className="popup-overlay" onClick={() => setActiveSection("")}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Change Password</h3>
            <input placeholder="Old Password" type="password" onChange={(e) => setOldPass(e.target.value)} />
            <input placeholder="New Password" type="password" onChange={(e) => setNewPass(e.target.value)} />
            <input placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPass(e.target.value)} />
            <button className="primary-btn" onClick={handleChangePassword}>Update</button>
          </div>
        </div>
      )}

      {/* ===== PROFILE POPUP ===== */}
      {showProfilePopup && (
        <div className="popup-overlay" onClick={() => setShowProfilePopup(false)}>
          <div className="popup-box profile-popup" onClick={(e) => e.stopPropagation()}>
            <h3>👤 My Profile</h3>

            <input value={profileData.email} disabled />

            <input
              placeholder="Student Name"
              disabled={!editMode}
              value={profileData.studentName}
              onChange={(e) => setProfileData({ ...profileData, studentName: e.target.value })}
            />

            <input
              type="date"
              disabled={!editMode}
              value={profileData.dob}
              onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
            />

            <select
              disabled={!editMode}
              value={profileData.gender}
              onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              placeholder="Village"
              disabled={!editMode}
              value={profileData.village}
              onChange={(e) => setProfileData({ ...profileData, village: e.target.value })}
            />

            <input
              placeholder="Parent Name"
              disabled={!editMode}
              value={profileData.parentName}
              onChange={(e) => setProfileData({ ...profileData, parentName: e.target.value })}
            />

            <input
              placeholder="Parent Contact"
              disabled={!editMode}
              value={profileData.parentContact}
              onChange={(e) => setProfileData({ ...profileData, parentContact: e.target.value })}
            />

            <input
              placeholder="Standard"
              disabled={!editMode}
              value={profileData.standard}
              onChange={(e) => setProfileData({ ...profileData, standard: e.target.value })}
            />

            {!editMode ? (
              <button className="primary-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            ) : (
              <button className="primary-btn" onClick={saveProfile}>Save Profile</button>
            )}

            <button className="secondary-btn" onClick={() => setShowProfilePopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===== DELETE OTP POPUP ===== */}
      {showDeleteOtp && (
        <div className="popup-overlay" onClick={() => setShowDeleteOtp(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Verify OTP</h3>
            <input
              maxLength={6}
              value={deleteOtp}
              onChange={(e) => setDeleteOtp(e.target.value.replace(/\D/g, ""))}
            />
            <button className="primary-btn" onClick={verifyDeleteOtp}>
              Verify & Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DashMenuBar;
