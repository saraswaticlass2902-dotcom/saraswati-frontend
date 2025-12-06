
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      setMessage("❌ Please enter your email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("forgot-password response:", res.status, data); // debug

      setLoading(false);

      if (res.ok) {
        // Expect server to return { success: true, otpToken: "...", message: "OTP sent..." }
        if (data.otpToken) {
          // store token temporarily in sessionStorage (so refresh doesn't lose it)
          sessionStorage.setItem("otpToken", data.otpToken);
          sessionStorage.setItem("otpEmail", email);

          setMessage("✅ OTP sent! Redirecting to verification...");

          // navigate and pass token & email via state as well (preferred)
          setTimeout(() => {
            navigate("/verify-otp", { state: { email, otpToken: data.otpToken } });
          }, 1000);
        } else {
          // server responded ok but no otpToken found — show useful message
          setMessage("❌ Server didn't return otpToken. Check server logs.");
        }
      } else {
        setMessage("❌ " + (data.message || "Failed to send OTP"));
      }
    } catch (error) {
      console.error("forgot-password error:", error);
      setLoading(false);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="auth-box">
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSendOTP} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>

      {/* Message UI */}
      {message && (
        <div
          style={{
            marginTop: "1rem",
            padding: "12px",
            backgroundColor: message.startsWith("✅") ? "#d4edda" : "#f8d7da",
            color: message.startsWith("✅") ? "#155724" : "#721c24",
            border: "1px solid",
            borderColor: message.startsWith("✅") ? "#c3e6cb" : "#f5c6cb",
            borderRadius: "8px",
            fontSize: "0.9rem",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
