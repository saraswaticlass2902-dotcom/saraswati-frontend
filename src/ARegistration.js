// // ARegistration.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ARegistration.css";

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

// const ARegistration = () => {
//   const [users, setUsers] = useState([]);
//   const [userCount, setUserCount] = useState(0);
//   const [searchEmail, setSearchEmail] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   // ================= FETCH USERS =================
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE}/api/admin/users`,
//         { withCredentials: true }
//       );

//       const usersData = response?.data?.users || [];
//       setUsers(usersData);
//       setFilteredUsers(usersData);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // ================= FETCH USER COUNT =================
//   const fetchUserCount = async () => {
//     try {
//       const res = await axios.get(
//         `${API_BASE}/api/admin/users/count`,
//         { withCredentials: true }
//       );
//       setUserCount(res.data.count);
//     } catch (err) {
//       console.error("Error fetching user count:", err);
//     }
//   };

//   // ================= DELETE USER =================
//   const deleteUser = async (email) => {
//     if (!window.confirm(`Delete user ${email} and all related data?`)) return;

//     try {
//       await axios.delete(
//         `${API_BASE}/api/admin/user/${email}`,
//         { withCredentials: true }
//       );

//       alert(`User ${email} deleted successfully.`);
//       fetchUsers();
//       fetchUserCount();
//     } catch (err) {
//       console.error("Error deleting user:", err);
//       alert("Failed to delete user.");
//     }
//   };

//   // ================= SEARCH =================
//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchEmail(value);

//     const filtered = users.filter((u) =>
//       u.email.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   };

//   // ================= ON LOAD =================
//   useEffect(() => {
//     fetchUsers();
//     fetchUserCount();
//   }, []);

//   return (
//     <div className="aregistration-container">
//       <h2>Total Registered Users: {userCount}</h2>

//       <input
//         type="text"
//         value={searchEmail}
//         onChange={handleSearch}
//         placeholder="Search by email..."
//         className="search-input"
//       />

//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>Sr</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredUsers.map((u, index) => (
//             <tr key={u._id}>
//               <td>{index + 1}</td>
//               <td>{u.username}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//               <td>
//                 <button
//                   className="delete-btn"
//                   onClick={() => deleteUser(u.email)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}

//           {filteredUsers.length === 0 && (
//             <tr>
//               <td colSpan="5">No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ARegistration;


// ARegistration.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ARegistration.css";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

const ARegistration = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // 🔥 View profile states
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/admin/users`,
        { withCredentials: true }
      );

      const usersData = response?.data?.users || [];
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ================= FETCH USER COUNT =================
  const fetchUserCount = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/admin/users/count`,
        { withCredentials: true }
      );
      setUserCount(res.data.count);
    } catch (err) {
      console.error("Error fetching user count:", err);
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (email) => {
    if (!window.confirm(`Delete user ${email} and all related data?`)) return;

    try {
      await axios.delete(
        `${API_BASE}/api/admin/user/${email}`,
        { withCredentials: true }
      );

      alert(`User ${email} deleted successfully.`);
      fetchUsers();
      fetchUserCount();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  // ================= VIEW USER PROFILE =================
  const viewUserProfile = async (email) => {
    try {
      setLoadingProfile(true);

      const res = await axios.get(
        `${API_BASE}/api/profile/details/${email}`,
        { withCredentials: true }
      );

      if (res.data.exists) {
        setProfileData({
          ...res.data.profile,
          dob: res.data.profile.dob
            ? res.data.profile.dob.split("T")[0]
            : "",
        });
        setShowViewPopup(true);
      } else {
        alert("Profile not found");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      alert("Failed to fetch profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  // ================= SEARCH =================
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchEmail(value);

    const filtered = users.filter((u) =>
      u.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // ================= ON LOAD =================
  useEffect(() => {
    fetchUsers();
    fetchUserCount();
  }, []);

  return (
    <div className="aregistration-container">
      <h2>Total Registered Users: {userCount}</h2>

      <input
        type="text"
        value={searchEmail}
        onChange={handleSearch}
        placeholder="Search by email..."
        className="search-input"
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => viewUserProfile(u.email)}
                >
                  View
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(u.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= VIEW PROFILE POPUP ================= */}
      {showViewPopup && profileData && (
        <div className="popup-overlay" onClick={() => setShowViewPopup(false)}>
          <div
            className="popup-box profile-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>👤 User Profile</h3>

            <input value={profileData.email || ""} disabled />
            <input value={profileData.studentName || ""} disabled />
            <input type="date" value={profileData.dob || ""} disabled />
            <input value={profileData.gender || ""} disabled />
            <input value={profileData.village || ""} disabled />
            <input value={profileData.parentName || ""} disabled />
            <input value={profileData.parentContact || ""} disabled />
            <input value={profileData.standard || ""} disabled />

            <button onClick={() => setShowViewPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {loadingProfile && <p>Loading profile...</p>}
    </div>
  );
};

export default ARegistration;
