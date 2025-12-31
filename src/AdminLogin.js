// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminLogin.css";

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

// function AdminLogin({ onSuccess }) {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAdminLogin = async () => {
//     setMessage("");

//     if (!email || !password) {
//       setMessage("❌ Email and password required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/api/admin/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           email: email.trim().toLowerCase(),
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok && data.ok) {
//         setMessage("✅ Admin login successful");

//         // 🔥 refresh admin session
//        if (onSuccess) {
//   await onSuccess();
// }

// setTimeout(() => {
//   navigate("/admin/dashboard", { replace: true });
// }, 150);


//       } else {
//         setMessage(data.message || "❌ Invalid credentials");
//       }
//     } catch (err) {
//       console.error("Admin login error:", err);
//       setMessage("❌ Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <h2>Admin Login</h2>

//       <input
//         type="email"
//         placeholder="Enter Admin Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         disabled={loading}
//       />

//       <input
//         type="password"
//         placeholder="Enter Admin Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         disabled={loading}
//       />

//       <button
//         className="LoginAdmin"
//         onClick={handleAdminLogin}
//         disabled={loading}
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>

//       {message && (
//         <p style={{ color: message.startsWith("❌") ? "red" : "green" }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }

// export default AdminLogin;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const API_BASE =
  process.env.REACT_APP_API || "http://localhost:5000";

function AdminLogin({ onSuccess }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e?.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("❌ Email and password required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setMessage("✅ Admin login successful");

        if (onSuccess) await onSuccess();

        setTimeout(() => {
          navigate("/admin/dashboard", { replace: true });
        }, 200);
      } else {
        setMessage(data.message || "❌ Invalid credentials");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Enter Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      <button
        className="LoginAdmin"
        onClick={handleAdminLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {message && (
        <p style={{ color: message.startsWith("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AdminLogin;
