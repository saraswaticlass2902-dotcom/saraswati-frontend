
// //src/components/Registration.js
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Registration.css";

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

// export default function Registration() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpToken, setOtpToken] = useState(""); // opaque token from server
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(0);

//   const navigate = useNavigate();
//   const pendingFetch = useRef(null);
//   const cooldownTimer = useRef(null);

//   useEffect(() => {
//     if (resendCooldown > 0) {
//       cooldownTimer.current = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
//     }
//     return () => {
//       if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
//     };
//   }, [resendCooldown]);

//   useEffect(() => {
//     // cleanup pending fetch on unmount
//     return () => {
//       if (pendingFetch.current) pendingFetch.current.abort();
//       if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
//     };
//   }, []);

//   const isValidEmail = (e) => /\S+@\S+\.\S+/.test(e);

//   // helper to POST JSON with abort support
//   const postJSON = async (path, body) => {
//     if (pendingFetch.current) pendingFetch.current.abort();
//     const controller = new AbortController();
//     pendingFetch.current = controller;

//     const res = await fetch(`${API_BASE}${path}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//       signal: controller.signal,
//     });

//     pendingFetch.current = null;
//     return res;
//   };

//   // STEP 1: request OTP
//   const handleEmailCheck = async (e) => {
//     e?.preventDefault();
//     setMessage("");

//     const emailTrim = email.trim();
//     if (!isValidEmail(emailTrim)) {
//       setMessage("Please enter a valid email.");
//       return;
//     }
//     if (resendCooldown > 0) {
//       setMessage(`Please wait ${resendCooldown}s before resending OTP.`);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await postJSON("/api/auth/check-email", { email: emailTrim });
//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(data.message || "Failed to send OTP.");
//         return;
//       }

//       if (data.exists) {
//         setMessage("Email already registered. Please login or use another email.");
//         return;
//       }

//       if (data.otpToken) {
//         setOtpToken(data.otpToken);
//         setMessage("OTP sent to your email. Enter it below.");
//         setStep(2);
//         const cd = Number.isFinite(Number(data.resendAfter)) ? Number(data.resendAfter) : 60;
//         setResendCooldown(cd);
//       } else {
//         setMessage("Unexpected server response. OTP token missing.");
//       }
//     } catch (err) {
//       if (err.name !== "AbortError") {
//         console.error(err);
//         setMessage("Network error while sending OTP.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2: verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!otpToken) {
//       setMessage("Missing otp token. Please request OTP again.");
//       return;
//     }

//     const otpTrim = otp.trim();
//     if (!/^\d{6}$/.test(otpTrim)) {
//       setMessage("Enter a 6-digit OTP.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await postJSON("/api/auth/verify-otp", {
//         email: email.trim(),
//         otp: otpTrim,
//         otpToken,
//       });
//       const data = await res.json();

//       if (res.ok && data.success) {
//         setMessage("Email verified! Please complete registration.");
//         setStep(3);
//       } else {
//         setMessage(data.message || "Invalid OTP. Try again.");
//       }
//     } catch (err) {
//       if (err.name !== "AbortError") {
//         console.error(err);
//         setMessage("Network error during OTP verification.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend OTP (calls handleEmailCheck)
//   const handleResend = async () => {
//     if (resendCooldown > 0) {
//       setMessage(`Please wait ${resendCooldown}s before resending.`);
//       return;
//     }
//     await handleEmailCheck();
//   };

//   // STEP 3: final register
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     const usernameTrim = username.trim();
//     const emailTrim = email.trim();

//     if (usernameTrim.length < 3) {
//       setMessage("Username must be at least 3 characters.");
//       return;
//     }
//     if (password.length < 6) {
//       setMessage("Password must be at least 6 characters.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await postJSON("/api/auth/register", {
//         username: usernameTrim,
//         email: emailTrim,
//         password,
//         // optionally include otpToken if your server requires
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setMessage("Registration successful — redirecting to login...");
//         setTimeout(() => navigate("/login"), 1000);
//       } else {
//         setMessage(data.message || "Registration failed.");
//       }
//     } catch (err) {
//       if (err.name !== "AbortError") {
//         console.error(err);
//         setMessage("Network error during registration.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Sign Up</h2>

//       {step === 1 && (
//         <form onSubmit={handleEmailCheck} className="register-form" aria-label="Send OTP">
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={loading}
//             aria-describedby="email-help"
//           />
//           <small id="email-help">OTP will be sent to this email</small>
//           <button type="submit" disabled={loading}>
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </form>
//       )}

//       {step === 2 && (
//         <form onSubmit={handleVerifyOtp} className="register-form" aria-label="Verify OTP">
//           <label htmlFor="otp">OTP</label>
//           <input
//             id="otp"
//             name="otp"
//             type="text"
//             placeholder="Enter 6-digit OTP"
//             value={otp}
//             required
//             onChange={(e) => setOtp(e.target.value)}
//             disabled={loading}
//             inputMode="numeric"
//             pattern="\d{6}"
//             maxLength={6}
//             aria-describedby="otp-help"
//           />
//           <small id="otp-help">Check your email for the 6-digit code</small>

//           <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
//             <button type="submit" disabled={loading}>
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>

//             <button
//               type="button"
//               onClick={handleResend}
//               disabled={loading || resendCooldown > 0}
//             >
//               {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend OTP"}
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setStep(1);
//                 setOtp("");
//                 setOtpToken("");
//                 setMessage("");
//               }}
//               disabled={loading}
//             >
//               Change Email
//             </button>
//           </div>
//         </form>
//       )}

//       {step === 3 && (
//         <form onSubmit={handleRegister} className="register-form" aria-label="Register">
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             name="username"
//             type="text"
//             placeholder="Username"
//             value={username}
//             required
//             onChange={(e) => setUsername(e.target.value)}
//             disabled={loading}
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             disabled={loading}
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Creating..." : "Create Account"}
//           </button>
//         </form>
//       )}

//       {message && (
//         <p className="register-message" role="status" aria-live="polite">
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }
// src/components/Registration.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

export default function Registration() {
  const [step, setStep] = useState(1); // 1=request OTP, 2=verify, 3=finish
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();
  const controllerRef = useRef(null);
  const cooldownTimer = useRef(null);
  const mounted = useRef(true);
  const otpInputRef = useRef(null);

  useEffect(() => {
    return () => {
      mounted.current = false;
      if (controllerRef.current) controllerRef.current.abort();
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      cooldownTimer.current = setTimeout(() => {
        if (mounted.current) setResendCooldown((s) => s - 1);
      }, 1000);
    }
    return () => {
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, [resendCooldown]);

  useEffect(() => {
    if (step === 2) {
      // tiny delay helps ensure the input is rendered before focusing
      setTimeout(() => otpInputRef.current?.focus(), 50);
    }
  }, [step]);

  const isValidEmail = (e) => /\S+@\S+\.\S+/.test(e);

  // safe JSON parse (returns null on non-JSON)
  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  // Post JSON with abort support
  const postJSON = async (path, body) => {
    // Abort any previous pending fetch from this component
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    // release controllerRef if it references this call
    if (controllerRef.current === controller) controllerRef.current = null;
    return res;
  };

  // STEP 1: Request OTP
  const handleEmailCheck = async (e) => {
    e?.preventDefault();
    setMessage("");

    const emailTrim = email.trim().toLowerCase();
    if (!isValidEmail(emailTrim)) {
      setMessage("Please enter a valid email.");
      return;
    }
    if (resendCooldown > 0) {
      setMessage(`Please wait ${resendCooldown}s before resending OTP.`);
      return;
    }

    setLoading(true);
    try {
      const res = await postJSON("/api/auth/check-email", { email: emailTrim });
      const data = await safeJson(res);

      if (!res.ok) {
        setMessage((data && data.message) || "Failed to send OTP.");
        return;
      }

      if (data?.exists) {
        setMessage("Email already registered. Please login or use another email.");
        return;
      }

      if (data?.otpToken) {
        setOtpToken(data.otpToken);
        setMessage("OTP sent to your email. Enter it below.");
        setStep(2);
        const cd = Number.isFinite(Number(data.resendAfter)) ? Number(data.resendAfter) : 60;
        setResendCooldown(cd);
      } else {
        setMessage("Unexpected server response. OTP token missing.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("handleEmailCheck error:", err);
        setMessage("Network error while sending OTP.");
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setMessage("");

    if (!otpToken) {
      setMessage("Missing otp token. Please request OTP again.");
      return;
    }

    const otpTrim = String(otp).replace(/\D/g, "").slice(0, 6);
    if (!/^\d{6}$/.test(otpTrim)) {
      setMessage("Enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await postJSON("/api/auth/verify-otp", {
        email: email.trim(),
        otp: otpTrim,
        otpToken,
      });
      const data = await safeJson(res);

      if (res.ok && data?.success) {
        setMessage("Email verified! Please complete registration.");
        setStep(3);
      } else {
        setMessage((data && data.message) || "Invalid OTP. Try again.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("handleVerifyOtp error:", err);
        setMessage("Network error during OTP verification.");
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) {
      setMessage(`Please wait ${resendCooldown}s before resending.`);
      return;
    }
    await handleEmailCheck();
  };

  // STEP 3: Final register
  const handleRegister = async (e) => {
    e?.preventDefault();
    setMessage("");

    const usernameTrim = username.trim();
    const emailTrim = email.trim().toLowerCase();

    if (usernameTrim.length < 3) {
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
        username: usernameTrim,
        email: emailTrim,
        password,
        otpToken, // include token if server expects it
      });
      const data = await safeJson(res);

      if (res.ok) {
        setMessage("Registration successful — redirecting to login...");
        setTimeout(() => navigate("/login"), 900);
      } else {
        setMessage((data && data.message) || "Registration failed.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("handleRegister error:", err);
        setMessage("Network error during registration.");
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: 480, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>

      {step === 1 && (
        <form onSubmit={handleEmailCheck} className="register-form" aria-label="Send OTP">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            aria-describedby="email-help"
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />
          <small id="email-help">OTP will be sent to this email</small>
          <div style={{ marginTop: 12 }}>
            <button type="submit" disabled={loading} style={{ padding: "10px 16px" }}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="register-form" aria-label="Verify OTP">
          <label htmlFor="otp">OTP</label>
          <input
            ref={otpInputRef}
            id="otp"
            name="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            disabled={loading}
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            aria-describedby="otp-help"
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />
          <small id="otp-help">Check your email for the 6-digit code</small>

          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
            <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button type="button" onClick={handleResend} disabled={loading || resendCooldown > 0} style={{ padding: "8px 12px" }}>
              {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend OTP"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp("");
                setOtpToken("");
                setMessage("");
              }}
              disabled={loading}
              style={{ padding: "8px 12px" }}
            >
              Change Email
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleRegister} className="register-form" aria-label="Register">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />

          <div style={{ marginTop: 12 }}>
            <button type="submit" disabled={loading} style={{ padding: "10px 16px" }}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      )}

      {message && (
        <p className="register-message" role="status" aria-live="polite" style={{ marginTop: 14 }}>
          {message}
        </p>
      )}
    </div>
  );
}
