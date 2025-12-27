
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

export default function Registration() {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=register
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();
  const otpInputRef = useRef(null);
  const emailInputRef = useRef(null);

  // ================= TIMER FOR RESEND OTP =================
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown((c) => c - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // ================= AUTO FOCUS =================
  useEffect(() => {
    if (step === 1) emailInputRef.current?.focus();
    if (step === 2) otpInputRef.current?.focus();
  }, [step]);

  const isValidEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  const postJSON = (path, body) =>
    fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  // ================= STEP 1: SEND OTP =================
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    const emailTrim = email.trim().toLowerCase();
    if (!isValidEmail(emailTrim)) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await postJSON("/api/auth/check-email", {
        email: emailTrim,
      });
      const data = await safeJson(res);

      if (!res.ok) {
        setMessage(data?.message || "Failed to send OTP.");
        return;
      }

      // 🔥 EMAIL ALREADY REGISTERED
      if (data?.exists) {
        setMessage(
          "Email already registered. Please login or use a different email."
        );
        setEmail(""); // clear email field
        setOtp("");
        setOtpToken("");
        setStep(1);
        return;
      }

      if (!data?.otpToken) {
        setMessage("OTP token missing from server.");
        return;
      }

      setOtpToken(data.otpToken);
      setStep(2);
      setMessage("OTP sent to your email.");
      setResendCooldown(data.resendAfter || 60);
    } catch {
      setMessage("Network error while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // ================= STEP 2: VERIFY OTP =================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setMessage("Enter valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await postJSON("/api/auth/verify-otp", {
        email: email.trim().toLowerCase(),
        otp,
        otpToken,
      });
      const data = await safeJson(res);

      if (res.ok && data?.success) {
        setMessage("OTP verified successfully.");
        setStep(3);
      } else {
        setMessage(data?.message || "Invalid OTP.");
      }
    } catch {
      setMessage("OTP verification failed.");
    } finally {
      setLoading(false); // ✅ button unlocks here
    }
  };

  // ================= STEP 3: REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (username.trim().length < 3) {
      setMessage("Username must be at least 3 characters.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await postJSON("/api/auth/register", {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
        otpToken,
      });
      const data = await safeJson(res);

      if (res.ok) {
        setMessage("Registration successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setMessage(data?.message || "Registration failed.");
      }
    } catch {
      setMessage("Network error during registration.");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="register-container">
      <h2>Create Account</h2>

      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <input
            ref={emailInputRef}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <input
            ref={otpInputRef}
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            maxLength={6}
            inputMode="numeric"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || resendCooldown > 0}
          >
            {resendCooldown > 0
              ? `Resend (${resendCooldown}s)`
              : "Resend OTP"}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      )}

      {message && (
  <p className={`register-message ${messageType}`}>
    {message}
  </p>
)}

    </div>
  );
}
