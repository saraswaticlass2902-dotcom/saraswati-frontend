

// VerifyOTP.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerifyOTP.css";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Try to get email & token from location.state (navigate) or sessionStorage (fallback)
  const email = location.state?.email || sessionStorage.getItem("otpEmail") || "";
  const initialToken = location.state?.otpToken || sessionStorage.getItem("otpToken") || "";

  const [otpToken, setOtpToken] = useState(initialToken);

  useEffect(() => {
    console.log("VerifyOTP mounted:", { email, otpToken });
  }, [email, otpToken]);

  const handleVerify = async () => {
    setMessage("");
    if (!email) {
      setMessage("Email missing — go back and request OTP again.");
      return;
    }

    // pick token from state first, else sessionStorage
    const token = otpToken || sessionStorage.getItem("otpToken");
    if (!token) {
      setMessage("Missing otpToken — please request OTP again.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setMessage("Enter a valid 6-digit OTP.");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }

    const payload = { email, otp, otpToken: token };
    if (newPassword) payload.newPassword = newPassword;

    console.log("Sending verify-otp payload:", payload);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("verify-otp response:", res.status, data);

      if (res.ok && data.success) {
        // clear stored token after success
        sessionStorage.removeItem("otpToken");
        sessionStorage.removeItem("otpEmail");
        alert("✅ Password reset successful");
        navigate("/login");
      } else {
        setMessage(data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("verify-otp fetch error:", err);
      setMessage("Network/server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <h2>Verify OTP</h2>

      <input
        type="tel"
        pattern="[0-9]*"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "");
          if (val.length <= 6) setOtp(val);
        }}
        autoComplete="one-time-code"
      />

      <input
        type="password"
        placeholder="Enter New Password (optional)"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Reset Password"}
      </button>

      {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}

      <div style={{ marginTop: 12, fontSize: 12, color: "#555" }}>
        Debug token: <code>{otpToken || sessionStorage.getItem("otpToken") || "<none>"}</code>
      </div>
    </div>
  );
}

export default VerifyOTP;
