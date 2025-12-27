

// import React, { useState } from "react";
// import "./Login.css";
// import { Link } from "react-router-dom";

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

// function Login({ onSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setMessage("Please enter email and password");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch(`${API_BASE}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           email: email.trim().toLowerCase(),
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ✅ ONLY update auth state
//         if (onSuccess) {
//           await onSuccess(); 
//         }
//         // ❌ navigate इथे नाही
//       } else {
//         setMessage(data?.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-split-container">
//       <div className="login-right">
//         <div className="login-box">
//           <h2>Welcome Back!</h2>
//           <p>Login to access your account.</p>

//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={loading}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             disabled={loading}
//           />

//           <p className="forgot-text">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </p>

//           <button onClick={handleLogin} disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="signup-text">
//             New User? <Link to="/registration">Signup</Link>
//           </p>

//           {message && <p className="login-message">{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 🔥 ADD THIS

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setMessage("Please enter email and password");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch(`${API_BASE}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // 🔥 MUST for cookies
//         body: JSON.stringify({
//           email: email.trim().toLowerCase(),
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ✅ update auth state in App.js
       
// if (onSuccess) {
//   await onSuccess();
// }

// setTimeout(() => {
//   navigate("/dashboard", { replace: true });
// }, 150); // 🔥 cookie attach होण्यासाठी थोडा वेळ 
//       } else {
//         setMessage(data?.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

const handleLogin = async () => {
  if (!email || !password) {
    setMessage("Please enter email and password");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 important for cookies
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // update session state
      if (onSuccess) {
        await onSuccess();
      }

      // 🔥 small delay so cookie attaches properly
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 150);
    } else {
      setMessage(data?.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    setMessage("Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-split-container">
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <p>Login to access your account.</p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <p className="forgot-text">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-text">
            New User? <Link to="/registration">Signup</Link>
          </p>

          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
