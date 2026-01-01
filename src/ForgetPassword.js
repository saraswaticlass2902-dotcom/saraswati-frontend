
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ForgetPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSendOTP = async () => {
//     if (!email) {
//       setMessage("❌ Please enter your email");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       console.log("forgot-password response:", res.status, data); // debug

//       setLoading(false);

//       if (res.ok) {
//         // Expect server to return { success: true, otpToken: "...", message: "OTP sent..." }
//         if (data.otpToken) {
//           // store token temporarily in sessionStorage (so refresh doesn't lose it)
//           sessionStorage.setItem("otpToken", data.otpToken);
//           sessionStorage.setItem("otpEmail", email);

//           setMessage("✅ OTP sent! Redirecting to verification...");

//           // navigate and pass token & email via state as well (preferred)
//           setTimeout(() => {
//             navigate("/verify-otp", { state: { email, otpToken: data.otpToken } });
//           }, 1000);
//         } else {
//           // server responded ok but no otpToken found — show useful message
//           setMessage("❌ Server didn't return otpToken. Check server logs.");
//         }
//       } else {
//         setMessage("❌ " + (data.message || "Failed to send OTP"));
//       }
//     } catch (error) {
//       console.error("forgot-password error:", error);
//       setLoading(false);
//       setMessage("❌ Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="auth-box">
//       <h2>Forgot Password</h2>

//       <input
//         type="email"
//         placeholder="Enter your Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <button onClick={handleSendOTP} disabled={loading}>
//         {loading ? "Sending..." : "Send OTP"}
//       </button>

//       {/* Message UI */}
//       {message && (
//         <div
//           style={{
//             marginTop: "1rem",
//             padding: "12px",
//             backgroundColor: message.startsWith("✅") ? "#d4edda" : "#f8d7da",
//             color: message.startsWith("✅") ? "#155724" : "#721c24",
//             border: "1px solid",
//             borderColor: message.startsWith("✅") ? "#c3e6cb" : "#f5c6cb",
//             borderRadius: "8px",
//             fontSize: "0.9rem",
//           }}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ForgetPassword;


// import React, { useState } from "react";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "./firebase";

// function ForgetPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleResetPassword = async () => {
//     if (!email) {
//       setMessage("❌ Please enter your email");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       // 🔥 Firebase forgot password
//       await sendPasswordResetEmail(auth, email.trim());

//       setMessage(
//         "✅ Password reset link sent to your email. Please check Inbox or Spam."
//       );
//     } catch (error) {
//       console.error("Firebase reset error:", error);

//       // user-friendly messages
//       if (error.code === "auth/user-not-found") {
//         setMessage("❌ Email not registered.");
//       } else if (error.code === "auth/invalid-email") {
//         setMessage("❌ Invalid email address.");
//       } else {
//         setMessage("❌ Failed to send reset link. Try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-box">
//       <h2>Forgot Password</h2>
//       <p>Enter your registered email to reset password</p>

//       <input
//         type="email"
//         placeholder="Enter your Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         disabled={loading}
//       />

//       <button onClick={handleResetPassword} disabled={loading}>
//         {loading ? "Sending..." : "Send Reset Link"}
//       </button>

//       {/* Message UI */}
//       {message && (
//         <div
//           style={{
//             marginTop: "1rem",
//             padding: "12px",
//             backgroundColor: message.startsWith("✅") ? "#d4edda" : "#f8d7da",
//             color: message.startsWith("✅") ? "#155724" : "#721c24",
//             border: "1px solid",
//             borderColor: message.startsWith("✅") ? "#c3e6cb" : "#f5c6cb",
//             borderRadius: "8px",
//             fontSize: "0.9rem",
//           }}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ForgetPassword;

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import { auth } from "./firebase";

const API_BASE =
  process.env.REACT_APP_API || "http://localhost:5000";

function ChangePassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = params.get("oobCode");

  const [step, setStep] = useState("email"); // email | reset
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= LINK CLICK झाल्यावर =================
  useEffect(() => {
    if (!oobCode) return;

    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setEmail(email);
        setStep("reset");
      })
      .catch(() => alert("Invalid or expired link"));
  }, [oobCode]);

  // ================= SEND LINK (EMAIL EXISTS CHECK) =================
  const handleSendLink = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    setLoading(true);
    try {
      // 🔹 1️⃣ Backend ला email check
      const res = await fetch(`${API_BASE}/api/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.exists) {
        alert("Email not registered");
        return;
      }

      // 🔹 2️⃣ Email exists → Firebase reset link
      await sendPasswordResetEmail(auth, email);

      alert("Reset link sent to your email");
    } catch (err) {
      console.error(err);
      alert("Failed to send link");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async () => {
    if (!newPass || !confirmPass) {
      alert("Fill all fields");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // 🔹 Firebase password update
      await confirmPasswordReset(auth, oobCode, newPass);

      // 🔹 MongoDB password update
      await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword: newPass,
        }),
      });

      alert("Password changed successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">
      {step === "email" && (
        <>
          <h2>Enter Email</h2>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleSendLink} disabled={loading}>
            {loading ? "Sending..." : "Send Link"}
          </button>
        </>
      )}

      {step === "reset" && (
        <>
          <h2>Set New Password</h2>
          <p><b>Email:</b> {email}</p>

          <input
            type="password"
            placeholder="New password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <button onClick={handleResetPassword} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </>
      )}
    </div>
  );
}

export default ChangePassword;
