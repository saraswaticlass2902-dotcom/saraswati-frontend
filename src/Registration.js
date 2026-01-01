

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Registration.css";

// // ✅ SAFE API BASE
// const API_BASE =
//   process.env.REACT_APP_API || "http://localhost:5000";

// export default function Registration() {
//   const [step, setStep] = useState(1); // 1=email, 2=otp, 3=register
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpToken, setOtpToken] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(0);

//   const navigate = useNavigate();
//   const emailInputRef = useRef(null);
//   const otpInputRef = useRef(null);

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     if (resendCooldown > 0) {
//       const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
//       return () => clearTimeout(t);
//     }
//   }, [resendCooldown]);

//   /* ================= AUTO FOCUS ================= */
//   useEffect(() => {
//     if (step === 1) emailInputRef.current?.focus();
//     if (step === 2) otpInputRef.current?.focus();
//   }, [step]);

//   const isValidEmail = (e) => /\S+@\S+\.\S+/.test(e);

//   const safeJson = async (res) => {
//     try {
//       return await res.json();
//     } catch {
//       return null;
//     }
//   };

//   /* ================= FETCH HELPER ================= */
//   const postJSON = (path, body) =>
//     fetch(`${API_BASE}${path}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include", // 🔥 required for cookies
//       body: JSON.stringify(body),
//     });

//   /* ================= STEP 1: SEND OTP ================= */
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     const emailTrim = email.trim().toLowerCase();
//     if (!isValidEmail(emailTrim)) {
//       setMessage("Please enter a valid email.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await postJSON("/api/auth/check-email", {
//         email: emailTrim,
//       });
//       const data = await safeJson(res);

//       if (!res.ok) {
//         setMessage(data?.message || "Failed to send OTP.");
//         return;
//       }

//       if (data?.exists) {
//         setMessage("Email already registered. Please login.");
//         setEmail("");
//         setStep(1);
//         return;
//       }

//       if (!data?.otpToken) {
//         setMessage("OTP token missing from server.");
//         return;
//       }

//       setOtpToken(data.otpToken);
//       setStep(2);
//       setResendCooldown(data.resendAfter || 60);
//       setMessage("OTP sent to your email.");
//     } catch {
//       setMessage("Network error while sending OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= RESEND OTP (FIXED) ================= */
//   const handleResendOtp = async () => {
//     if (loading || resendCooldown > 0) return;
//     await handleSendOtp({ preventDefault: () => {} });
//   };

//   /* ================= STEP 2: VERIFY OTP ================= */
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!/^\d{6}$/.test(otp)) {
//       setMessage("Enter valid 6-digit OTP.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await postJSON("/api/auth/verify-otp", {
//         email: email.trim().toLowerCase(),
//         otp,
//         otpToken,
//       });
//       const data = await safeJson(res);

//       if (res.ok && data?.success) {
//         setMessage("OTP verified successfully.");
//         setStep(3);
//       } else {
//         setMessage(data?.message || "Invalid OTP.");
//       }
//     } catch {
//       setMessage("OTP verification failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= STEP 3: REGISTER ================= */
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (username.trim().length < 3) {
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
//         username: username.trim(),
//         email: email.trim().toLowerCase(),
//         password,
//         otpToken,
//       });
//       const data = await safeJson(res);

//       if (res.ok) {
//         setMessage("Registration successful. Redirecting to login...");
//         setTimeout(() => navigate("/login"), 1200);
//       } else {
//         setMessage(data?.message || "Registration failed.");
//       }
//     } catch {
//       setMessage("Network error during registration.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="register-container">
//       <h2>Create Account</h2>

//       {step === 1 && (
//         <form onSubmit={handleSendOtp}>
//           <input
//             ref={emailInputRef}
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={loading}
//             required
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </form>
//       )}

//       {step === 2 && (
//         <form onSubmit={handleVerifyOtp}>
//           <input
//             ref={otpInputRef}
//             type="text"
//             placeholder="Enter 6-digit OTP"
//             value={otp}
//             onChange={(e) =>
//               setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//             }
//             maxLength={6}
//             inputMode="numeric"
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>

//           <button
//             type="button"
//             onClick={handleResendOtp}
//             disabled={loading || resendCooldown > 0}
//           >
//             {resendCooldown > 0
//               ? `Resend (${resendCooldown}s)`
//               : "Resend OTP"}
//           </button>
//         </form>
//       )}

//       {step === 3 && (
//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             disabled={loading}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             disabled={loading}
//             required
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Creating..." : "Create Account"}
//           </button>
//         </form>
//       )}

//       {message && <p className="register-message">{message}</p>}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from "firebase/auth";
// import { auth } from "./firebase";
// import { useNavigate } from "react-router-dom";
// import "./Registration.css";

// const API_BASE =
//   process.env.REACT_APP_API || "http://localhost:5000";

// export default function Registration() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showResend, setShowResend] = useState(false);
//   const [verified, setVerified] = useState(false);

//   const navigate = useNavigate();

//   /* =====================================================
//      🔍 CHECK ONLY MONGODB (Verified users only)
//   ===================================================== */
//   const checkUserInMongo = async (email) => {
//     const res = await fetch(`${API_BASE}/api/auth/check-email`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     if (!res.ok) {
//       throw new Error("Server error while checking user");
//     }

//     const data = await res.json();
//     return data.exists; // true = verified user
//   };

//   /* =====================================================
//      🔁 POLL EMAIL VERIFICATION STATUS
//   ===================================================== */
//   useEffect(() => {
//     let timer;

//     if (showResend && auth.currentUser) {
//       timer = setInterval(async () => {
//         await auth.currentUser.reload();

//         if (auth.currentUser.emailVerified) {
//           setVerified(true);
//           setMessage(
//             "Email verified successfully ✅ You can now login."
//           );
//           clearInterval(timer);
//         }
//       }, 4000);
//     }

//     return () => clearInterval(timer);
//   }, [showResend]);

//   /* =====================================================
//      REGISTER HANDLER
//   ===================================================== */
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setShowResend(false);
//     setVerified(false);

//     if (username.trim().length < 3) {
//       setMessage("Username must be at least 3 characters");
//       return;
//     }

//     if (password.length < 6) {
//       setMessage("Password must be at least 6 characters");
//       return;
//     }

//     setLoading(true);

//     try {
//       const normalizedEmail = email.trim().toLowerCase();

//       /* ===== STEP 1: CHECK VERIFIED USER IN MONGODB ===== */
//       const existsInMongo = await checkUserInMongo(
//         normalizedEmail
//       );

//       if (existsInMongo) {
//         setMessage(
//           "This email is already registered. Please login."
//         );
//         return;
//       }

//       /* ===== STEP 2: FIREBASE REGISTER ===== */
//       const cred = await createUserWithEmailAndPassword(
//         auth,
//         normalizedEmail,
//         password
//       );

//       /* ===== STEP 3: SEND VERIFICATION EMAIL ===== */
//       await sendEmailVerification(cred.user);

//       localStorage.setItem("pendingUsername", username);

//       setMessage(
//         "Verification link sent to your email. Please verify your email first."
//       );
//       setShowResend(true);

//     } catch (err) {
//       console.error("Registration error:", err);

//       if (err.code === "auth/email-already-in-use") {
//         setMessage(
//           "Email already exists but is not verified. Please check your email and verify first."
//         );
//         setShowResend(true);
//       } else {
//         setMessage(err.message || "Registration failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      RESEND VERIFICATION EMAIL
//   ===================================================== */
//   const handleResendVerification = async () => {
//     try {
//       if (auth.currentUser) {
//         await sendEmailVerification(auth.currentUser);
//         setMessage(
//           "Verification link sent again. Please check Inbox or Spam folder."
//         );
//       }
//     } catch (err) {
//       setMessage("Failed to resend verification email");
//     }
//   };

//   return (
//     <form className="registration-form" onSubmit={handleRegister}>
//       <h2>Create Account</h2>

//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         disabled={loading}
//         required
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         disabled={loading}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         disabled={loading}
//         required
//       />

//       <button type="submit" disabled={loading}>
//         {loading ? "Creating..." : "Create Account"}
//       </button>

//       {message && <p className="form-message">{message}</p>}

//       {showResend && !verified && (
//         <button
//           type="button"
//           className="resend-btn"
//           onClick={handleResendVerification}
//         >
//           Resend Verification Email
//         </button>
//       )}

//       {verified && (
//         <button
//           type="button"
//           className="login-btn"
//           onClick={() => navigate("/login")}
//         >
//           Go to Login
//         </button>
//       )}
//     </form>
//   );
// }



// import React, { useState, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from "firebase/auth";
// import { auth } from "./firebase";
// import { useNavigate } from "react-router-dom";
// import "./Registration.css";

// const API_BASE =
//   process.env.REACT_APP_API || "http://localhost:5000";

// export default function Registration() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showResend, setShowResend] = useState(false);
//   const [verified, setVerified] = useState(false);

//   const navigate = useNavigate();

//   /* ================= CHECK USER IN MONGODB ================= */
//   const checkUserInMongo = async (email) => {
//     const res = await fetch(`${API_BASE}/api/auth/check-email`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     const data = await res.json();
//     return data.exists;
//   };

//   /* ================= POLL EMAIL VERIFICATION ================= */
//   useEffect(() => {
//     let timer;

//     if (showResend && auth.currentUser && !verified) {
//       timer = setInterval(async () => {
//         try {
//           await auth.currentUser.reload();

//           if (auth.currentUser.emailVerified) {
//             clearInterval(timer);

//             // ✅ SAVE USER TO MONGODB
//             const res = await fetch(
//               `${API_BASE}/api/auth/register`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   username: localStorage.getItem("pendingUsername"),
//                   email: auth.currentUser.email,
//                   password: "firebase-auth",
//                 }),
//               }
//             );

//             if (res.ok) {
//               setVerified(true);
//               setShowResend(false);
//               setMessage(
//                 "Email verified successfully ✅ You can now login."
//               );
//             } else {
//               setMessage("Verified but failed to save user.");
//             }
//           }
//         } catch (err) {
//           console.error("Verification polling error:", err);
//         }
//       }, 4000);
//     }

//     return () => clearInterval(timer);
//   }, [showResend, verified]);

//   /* ================= REGISTER HANDLER ================= */
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setShowResend(false);
//     setVerified(false);

//     if (username.trim().length < 3) {
//       setMessage("Username must be at least 3 characters");
//       return;
//     }

//     if (password.length < 6) {
//       setMessage("Password must be at least 6 characters");
//       return;
//     }

//     setLoading(true);

//     try {
//       const normalizedEmail = email.trim().toLowerCase();

//       const exists = await checkUserInMongo(normalizedEmail);
//       if (exists) {
//         setMessage("This email is already registered. Please login.");
//         return;
//       }

//       const cred = await createUserWithEmailAndPassword(
//         auth,
//         normalizedEmail,
//         password
//       );

//       await sendEmailVerification(cred.user);

//       localStorage.setItem("pendingUsername", username.trim());

//       setMessage(
//         "Verification link sent to your email. Please verify first."
//       );
//       setShowResend(true);
//     } catch (err) {
//       console.error(err);

//       if (err.code === "auth/email-already-in-use") {
//         setMessage(
//           "Email already exists. Please verify email and login."
//         );
//         setShowResend(true);
//       } else {
//         setMessage("Registration failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= RESEND EMAIL ================= */
//   const handleResendVerification = async () => {
//     try {
//       if (auth.currentUser) {
//         await sendEmailVerification(auth.currentUser);
//         setMessage(
//           "Verification link sent again. Check Inbox/Spam."
//         );
//       }
//     } catch {
//       setMessage("Failed to resend verification email");
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <form className="registration-form" onSubmit={handleRegister}>
//       <h2>Create Account</h2>

//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         disabled={loading}
//         required
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         disabled={loading}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         disabled={loading}
//         required
//       />

//       <button type="submit" disabled={loading}>
//         {loading ? "Creating..." : "Create Account"}
//       </button>

//       {message && <p className="form-message">{message}</p>}

//       {showResend && !verified && (
//         <button
//           type="button"
//           className="resend-btn"
//           onClick={handleResendVerification}
//         >
//           Resend Verification Email
//         </button>
//       )}

//       {verified && (
//         <button
//           type="button"
//           className="login-btn"
//           onClick={() => navigate("/login")}
//         >
//           Go to Login
//         </button>
//       )}
//     </form>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const API_BASE =
  process.env.REACT_APP_API || "http://localhost:5000";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  /* ================= CHECK USER IN MONGODB ================= */
  const checkUserInMongo = async (email) => {
    const res = await fetch(`${API_BASE}/api/auth/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.exists;
  };

  /* ================= POLL EMAIL VERIFICATION (FIXED) ================= */
  useEffect(() => {
  let timer;

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user && showResend && !verified) {
      timer = setInterval(async () => {
        try {
          await user.reload();

          if (user.emailVerified) {
            clearInterval(timer);

            const res = await fetch(
              `${API_BASE}/api/auth/firebase-save`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: user.email,
                  username:
                    localStorage.getItem("pendingUsername") || "User",
                  password: password, // ✅ NOW CORRECT
                }),
              }
            );

            if (res.ok) {
              setVerified(true);
              setShowResend(false);
              setMessage(
                "Email verified successfully ✅ You can now login."
              );
            } else {
              setMessage("Verified but failed to save user.");
            }
          }
        } catch (err) {
          console.error("Verification polling error:", err);
        }
      }, 4000);
    }
  });

  return () => {
    clearInterval(timer);
    unsubscribe();
  };
}, [showResend, verified, password]);

  /* ================= REGISTER HANDLER ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowResend(false);
    setVerified(false);

    if (username.trim().length < 3) {
      setMessage("Username must be at least 3 characters");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const exists = await checkUserInMongo(normalizedEmail);
      if (exists) {
        setMessage("This email is already registered. Please login.");
        return;
      }

      const cred = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );

      await sendEmailVerification(cred.user);

      localStorage.setItem("pendingUsername", username.trim());

      setMessage(
        "Verification link sent to your email. Please verify first."
      );
      setShowResend(true);
    } catch (err) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        setMessage(
          "Email already exists. Please verify email and login."
        );
        setShowResend(true);
      } else {
        setMessage("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESEND EMAIL ================= */
  const handleResendVerification = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setMessage(
          "Verification link sent again. Check Inbox/Spam."
        );
      }
    } catch {
      setMessage("Failed to resend verification email");
    }
  };

  /* ================= UI ================= */
  return (
    <form className="registration-form" onSubmit={handleRegister}>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      {message && <p className="form-message">{message}</p>}

      {showResend && !verified && (
        <button
          type="button"
          className="resend-btn"
          onClick={handleResendVerification}
        >
          Resend Verification Email
        </button>
      )}

      {verified && (
        <button
          type="button"
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      )}
    </form>
  );
}
