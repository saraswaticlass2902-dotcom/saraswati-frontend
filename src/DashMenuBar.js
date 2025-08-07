//DashMenubar.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashMenuBar.css";
import { FiLogOut } from 'react-icons/fi'; 
import { FiTrash2 } from 'react-icons/fi';
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";



function DashMenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  //const [showProfile, setShowProfile] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [activeSection, setActiveSection] = useState("");

  const [userDetails, setUserDetails] = useState({ email: "", username: "" });

  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const a=showChangePassword;


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

  if (email) fetchProfile();
}, [email]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };




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
          setShowChangePassword(false);
          setIsOpen(false);
        } else {
          alert(`❌ ${data.error}`);
        }
      } catch (err) {
        alert("❌ Error changing password");
      }
    }
  };

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
  setActiveSection(prev => prev === sectionName ? "" : sectionName);
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
 <li onClick={() => toggleSection("profile")}><FaUserCircle /> My Profile</li>
<li onClick={() => toggleSection("changePassword")}><RiLockPasswordLine style={{ fontSize: "22px", marginRight: "8px" }} />{a} Change Password</li>
<li onClick={handleLogout}> <FiLogOut style={{ marginRight: "8px" }} />Logout</li>
<li onClick={handleDeleteAccount} ><FiTrash2 style={{ marginRight: "8px" }} />Delete account</li>
</ul> 



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
    <button className="Update-password" onClick={handleChangePassword}>Update Password</button>
  </div>
)}



        </div>
      )}
    </div>
  );
}

export default DashMenuBar;



// // DashMenuBar.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiLogOut, FiTrash2 } from "react-icons/fi";
// import { FaUserCircle } from "react-icons/fa";
// import { RiLockPasswordLine } from "react-icons/ri";
// import "bootstrap/dist/css/bootstrap.min.css";

// function DashMenuBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("");
//   const [oldPass, setOldPass] = useState("");
//   const [newPass, setNewPass] = useState("");
//   const [confirmPass, setConfirmPass] = useState("");
//   const [userDetails, setUserDetails] = useState({ email: "", username: "" });

//   const navigate = useNavigate();
//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/profile/details?email=${email}`);
//         if (!res.ok) return;
//         const data = await res.json();
//         setUserDetails({ email: data.email, username: data.username });
//       } catch (err) {
//         console.error("Error fetching profile:", err.message);
//       }
//     };
//     if (email) fetchProfile();
//   }, [email]);

//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:5000/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!oldPass || !newPass || !confirmPass) {
//       alert("❗ Please fill all fields!");
//     } else if (newPass !== confirmPass) {
//       alert("❗ New and Confirm password do not match!");
//     } else {
//       try {
//         const res = await fetch("http://localhost:5000/api/auth/change-password", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass }),
//         });

//         const data = await res.json();
//         if (res.ok) {
//           alert("✅ Password changed successfully!");
//           setOldPass("");
//           setNewPass("");
//           setConfirmPass("");
//           setActiveSection("");
//           setIsOpen(false);
//         } else {
//           alert(`❌ ${data.error}`);
//         }
//       } catch (err) {
//         alert("❌ Error changing password");
//       }
//     }
//   };

//   const handleDeleteAccount = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete your account permanently?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/delete-account`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("🗑️ Account deleted successfully!");
//         localStorage.clear();
//         navigate("/registration");
//       } else {
//         alert(`❌ ${data.error || "Failed to delete account"}`);
//       }
//     } catch (error) {
//       alert("❌ Something went wrong while deleting the account.");
//     }
//   };

//   const toggleSection = (sectionName) => {
//     setActiveSection(prev => prev === sectionName ? "" : sectionName);
//   };

//   return (
//     <div className="position-relative">
//       {!isOpen && (
//         <div className="btn btn-secondary m-3" onClick={() => setIsOpen(true)}>
//           ☰ Menu
//         </div>
//       )}

//       {isOpen && (
//         <div className="position-fixed top-0 start-0 bg-light p-3 shadow rounded" style={{ width: "300px", height: "100vh", zIndex: 1000 }}>
//           <button className="btn-close float-end" onClick={() => setIsOpen(false)}></button>
//           <ul className="list-group mb-3 mt-4">
//             <li className="list-group-item" onClick={() => toggleSection("profile")}>
//               <FaUserCircle className="me-2" /> My Profile
//             </li>
//             <li className="list-group-item" onClick={() => toggleSection("changePassword")}>
//               <RiLockPasswordLine className="me-2" /> Change Password
//             </li>
//             <li className="list-group-item text-danger" onClick={handleDeleteAccount}>
//               <FiTrash2 className="me-2" /> Delete Account
//             </li>
//             <li className="list-group-item text-primary" onClick={handleLogout}>
//               <FiLogOut className="me-2" /> Logout
//             </li>
//           </ul>

//           {activeSection === "profile" && (
//             <div className="alert alert-info">
//               <h5>👤 My Profile</h5>
//               <p><strong>Username:</strong> {userDetails.username}</p>
//               <p><strong>Email:</strong> {userDetails.email}</p>
//             </div>
//           )}

//           {activeSection === "changePassword" && (
//             <div>
//               <h5 className="mb-3">🔐 Change Password</h5>
//               <input
//                 type="password"
//                 className="form-control mb-2"
//                 placeholder="Old Password"
//                 value={oldPass}
//                 onChange={(e) => setOldPass(e.target.value)}
//               />
//               <input
//                 type="password"
//                 className="form-control mb-2"
//                 placeholder="New Password"
//                 value={newPass}
//                 onChange={(e) => setNewPass(e.target.value)}
//               />
//               <input
//                 type="password"
//                 className="form-control mb-3"
//                 placeholder="Confirm Password"
//                 value={confirmPass}
//                 onChange={(e) => setConfirmPass(e.target.value)}
//               />
//               <button className="btn btn-primary w-100" onClick={handleChangePassword}>
//                 Update Password
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DashMenuBar;
