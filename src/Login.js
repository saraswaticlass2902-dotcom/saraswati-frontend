// //Login.js

// import React, { useState } from "react";
// import "./Login.css";
// import { useNavigate, Link } from "react-router-dom";
// import LoginImage from "./h2.jpg";

// function Login({ onSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Please enter both email and password");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Login Successfully");
//         if (onSuccess) onSuccess(email);
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1000);
//       } else {
//         alert(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="login-split-container">
      
//       <div className="login-left">
//   <img src={LoginImage} alt="RentarHome Illustration" className="login-image" />
//   <h2>Find Your Perfect Rental Home</h2>
//   <ul>
//     <li>✅ Verified Listings for Safe & Reliable Rentals</li>
//     <li>✅ Filter Homes by Location, Rent & Apartment Type</li>
//     <li>✅ 24/7 Support & Quick Assistance</li>
//   </ul>
// </div>

     
//       <div className="login-right">
//         <div className="login-box">
//           <h2>Welcome Back!</h2>
//           <p>Login to access your account.</p>

//           <input
//             type="email"
//             placeholder="Enter Email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <p className="forgot-text">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </p>

//           <button onClick={handleLogin}>Login</button>

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

// Login.js

import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import LoginImage from "./h2.jpg";

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Backend URL (auto switches between localhost & production)
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login Successfully");
        if (onSuccess) onSuccess(email);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-split-container">

      {/* Left side */}
      <div className="login-left">
        <img src={LoginImage} alt="RentarHome Illustration" className="login-image" />
        <h2>Find Your Perfect Rental Home</h2>
        <ul>
          <li>✅ Verified Listings for Safe & Reliable Rentals</li>
          <li>✅ Filter Homes by Location, Rent & Apartment Type</li>
          <li>✅ 24/7 Support & Quick Assistance</li>
        </ul>
      </div>

      {/* Right side */}
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <p>Login to access your account.</p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="forgot-text">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <button onClick={handleLogin}>Login</button>

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
