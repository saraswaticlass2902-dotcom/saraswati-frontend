// import React, { useState, useEffect } from "react";
// import { FiLogOut, FiUserPlus, FiUsers } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import "./AdminMenuBar.css";

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

// function AdminMenubar({ onLogout }) {
//   const navigate = useNavigate();

//   /* ===== SIDEBAR ===== */
//   const [isOpen, setIsOpen] = useState(false);

//   /* ===== POPUPS ===== */
//   const [showCreateAdmin, setShowCreateAdmin] = useState(false);
//   const [showViewAdmin, setShowViewAdmin] = useState(false);

//   /* ===== CREATE ADMIN ===== */
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [secret, setSecret] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ===== VIEW ADMIN ===== */
//   const [admins, setAdmins] = useState([]);
//   const [viewLoading, setViewLoading] = useState(false);

//   /* ===== LOGOUT ===== */
//   const handleLogout = async () => {
//     try {
//       await fetch(`${API_BASE}/api/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } finally {
//       if (onLogout) await onLogout();
//       navigate("/", { replace: true });
//     }
//   };

//   /* ===== CREATE ADMIN ===== */
//   const handleCreateAdmin = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!email || !password || !secret) {
//       setMessage("❌ All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/api/admin/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: email.trim().toLowerCase(),
//           password,
//           secret,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Admin created successfully");
//         setEmail("");
//         setPassword("");
//         setSecret("");
//       } else {
//         setMessage(data.message || "❌ Failed to create admin");
//       }
//     } catch {
//       setMessage("❌ Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===== FETCH ADMINS ===== */
//   const fetchAdmins = async () => {
//   setViewLoading(true);
//   try {
//     const response = await axios.get(
//       `${API_BASE}/api/admin/all-admins`,
//       { withCredentials: true }
//     );

//     const adminsData = response?.data?.admins || [];
//     setAdmins(adminsData);
//   } catch (error) {
//     console.error("Error fetching admins:", error);
//     setAdmins([]);
//   } finally {
//     setViewLoading(false);
//   }
// };


//   /* ===== OPEN VIEW ADMIN ===== */
//   const openViewAdmin = () => {
//     setShowViewAdmin(true);
//     fetchAdmins();
//   };

//   return (
//     <>
//       {/* ===== HAMBURGER ===== */}
//       {!isOpen && (
//         <div className="hamburger" onClick={() => setIsOpen(true)}>
//           <div className="bar" />
//           <div className="bar" />
//           <div className="bar" />
//         </div>
//       )}

//       {/* ===== SIDEBAR ===== */}
//       {isOpen && (
//         <div className="admin-menu-bar sidebar show">
//           <button className="close-btn" onClick={() => setIsOpen(false)}>
//             ×
//           </button>

//           <ul>
//             <li onClick={openViewAdmin}>
//               <FiUsers style={{ marginRight: "8px" }} />
//               View Admin
//             </li>

//             <li onClick={() => setShowCreateAdmin(true)}>
//               <FiUserPlus style={{ marginRight: "8px" }} />
//               Create Admin
//             </li>

//             <li onClick={handleLogout}>
//               <FiLogOut style={{ marginRight: "8px" }} />
//               Logout
//             </li>
//           </ul>
//         </div>
//       )}

//       {/* ===== VIEW ADMIN POPUP ===== */}
//       {showViewAdmin && (
//         <div className="admin-popup-overlay">
//           <div className="admin-popup">
//             <button className="close-btn" onClick={() => setShowViewAdmin(false)}>
//               ×
//             </button>

//             <h3>Admin List</h3>

//             {viewLoading ? (
//               <p style={{ textAlign: "center" }}>Loading...</p>
//             ) : admins.length === 0 ? (
//               <p style={{ textAlign: "center" }}>No admins found</p>
//             ) : (
//               <ul className="admin-list">
//                 {admins.map((a) => (
//                   <li key={a._id}>{a.email}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ===== CREATE ADMIN POPUP ===== */}
//       {showCreateAdmin && (
//         <div className="admin-popup-overlay">
//           <div className="admin-popup">
//             <button
//               className="close-btn"
//               onClick={() => setShowCreateAdmin(false)}
//             >
//               ×
//             </button>

//             <h3>Create Admin</h3>

//             <form onSubmit={handleCreateAdmin}>
//               <input
//                 type="email"
//                 placeholder="Admin Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//               />

//               <input
//                 type="password"
//                 placeholder="Admin Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//               />

//               <input
//                 type="password"
//                 placeholder="Secret Code"
//                 value={secret}
//                 onChange={(e) => setSecret(e.target.value)}
//                 disabled={loading}
//               />

//               <button type="submit" disabled={loading}>
//                 {loading ? "Creating..." : "Create Admin"}
//               </button>

//               {message && <p className="admin-msg">{message}</p>}
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default AdminMenubar;


import React, { useState } from "react";
import axios from "axios";
import { FiLogOut, FiUserPlus, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./AdminMenuBar.css";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

function AdminMenubar({ onLogout }) {
  const navigate = useNavigate();

  /* ================= SIDEBAR ================= */
  const [isOpen, setIsOpen] = useState(false);

  /* ================= POPUPS ================= */
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [showViewAdmin, setShowViewAdmin] = useState(false);

  /* ================= CREATE ADMIN ================= */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= VIEW ADMIN ================= */
  const [admins, setAdmins] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      if (onLogout) await onLogout();
      navigate("/", { replace: true });
    }
  };

  /* ================= CREATE ADMIN ================= */
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password || !secret) {
      setMessage("❌ All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          secret,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Admin created successfully");
        setEmail("");
        setPassword("");
        setSecret("");
      } else {
        setMessage(data.message || "❌ Failed to create admin");
      }
    } catch (err) {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH ADMINS ================= */
  const fetchAdmins = async () => {
    setViewLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE}/api/admin/all-admins`,
        { withCredentials: true }
      );

      const adminsData = response?.data?.admins || [];
      setAdmins(adminsData);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setAdmins([]);
    } finally {
      setViewLoading(false);
    }
  };

  /* ================= OPEN VIEW ADMIN ================= */
  const openViewAdmin = () => {
    setShowViewAdmin(true);
    fetchAdmins();
  };

  return (
    <>
      {/* ================= HAMBURGER ================= */}
      {!isOpen && (
        <div className="hamburger" onClick={() => setIsOpen(true)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      {isOpen && (
        <div className="admin-menu-bar sidebar show">
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ×
          </button>

          <ul>
            <li onClick={openViewAdmin}>
              <FiUsers style={{ marginRight: "8px" }} />
              View Admin
            </li>

            <li onClick={() => setShowCreateAdmin(true)}>
              <FiUserPlus style={{ marginRight: "8px" }} />
              Create Admin
            </li>

            <li onClick={handleLogout}>
              <FiLogOut style={{ marginRight: "8px" }} />
              Logout
            </li>
          </ul>
        </div>
      )}

      {/* ================= VIEW ADMIN POPUP ================= */}
      {showViewAdmin && (
        <div className="admin-popup-overlay">
          <div className="admin-popup">
            <button
              className="close-btn"
              onClick={() => setShowViewAdmin(false)}
            >
              ×
            </button>

            <h3>Admin List</h3>

            {viewLoading ? (
              <p style={{ textAlign: "center" }}>Loading...</p>
            ) : admins.length === 0 ? (
              <p style={{ textAlign: "center" }}>No admins found</p>
            ) : (
              <ul className="admin-list">
                {admins.map((admin) => (
                  <li key={admin._id}>
                    {admin.email}
                    <span style={{ float: "right", opacity: 0.6 }}>
                      {admin.role}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ================= CREATE ADMIN POPUP ================= */}
      {showCreateAdmin && (
        <div className="admin-popup-overlay">
          <div className="admin-popup">
            <button
              className="close-btn"
              onClick={() => setShowCreateAdmin(false)}
            >
              ×
            </button>

            <h3>Create Admin</h3>

            <form onSubmit={handleCreateAdmin}>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <input
                type="password"
                placeholder="Secret Code"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                disabled={loading}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Admin"}
              </button>

              {message && <p className="admin-msg">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminMenubar;
