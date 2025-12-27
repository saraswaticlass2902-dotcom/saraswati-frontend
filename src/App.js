




// // App.js
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   Link,
//   useNavigate,
// } from "react-router-dom";

// // Pages
// import Home from "./Home";
// import AboutUs from "./AboutUs";
// import Service from "./Service";
// import Contact from "./Contact";
// import Registration from "./Registration";
// import Login from "./Login";
// import ForgetPassword from "./ForgetPassword";
// import VerifyOTP from "./VerifyOTP";
// import UserReport from "./UserReport";

// // User Dashboard
// import Dashboard from "./Dashboard";
// import Houserent from "./Houserent";
// import YourPurchases from "./YourPurchases";
// import StudentLecture from "./StudentLive";
// import RecordedLectures from "./RecordedLectures";

// // Admin
// import AdminLogin from "./AdminLogin";
// import AdminDashboard from "./AdminDashboard";
// import AHouserent from "./AHouserent";
// import AdminPurchases from "./AdminPurchases";
// import ARegistration from "./ARegistration";
// import AReports from "./AReports";
// import ASetting from "./ASetting";
// import AdminCreate from "./AdminCreate";

// // UI
// import { FaGraduationCap } from "react-icons/fa";
// import "./App.css";

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";
// const FRONTEND_ADMIN_SECRET = "ADMIN@123";

// /* ================= SESSION FETCH ================= */
// async function fetchSession(path) {
//   try {
//     const res = await fetch(`${API_BASE}${path}`, {
//       credentials: "include",
//     });
//     if (!res.ok) return null;
//     return await res.json();
//   } catch (error) {
//     console.error(`Error fetching session from ${path}:`, error);
//     return null;
//   }
// }

// /* ================= ROUTE GUARDS ================= */
// const ProtectedRoute = ({ isAuth, children }) =>
//   isAuth ? children : <Navigate to="/login" replace />;

// const AdminProtectedRoute = ({ isAuth, children }) =>
//   isAuth ? children : <Navigate to="/admin-login" replace />;

// /* ================= APP WRAPPER ================= */
// function AppWrapper() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* 🔐 Admin secret states */
//   const [showAdminPopup, setShowAdminPopup] = useState(false);
//   const [adminSecret, setAdminSecret] = useState("");
//   const [adminError, setAdminError] = useState("");
//   const [adminVerified, setAdminVerified] = useState(false);
//   const [pendingAdminRegister, setPendingAdminRegister] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const isDashboardPath = location.pathname.startsWith("/dashboard");
//   const isAdminPath = location.pathname.startsWith("/admin/dashboard");


// const verifySessions = useCallback(async () => {
//   setLoading(true);

//   try {
//     // 🔴 ADMIN FIRST (IMPORTANT)
//     const admin = await fetchSession("/api/admin/me");
//     if (admin?.ok) {
//       setIsAdminLoggedIn(true);
//       setIsLoggedIn(false);
//       setUserEmail("");
//       return;
//     }

//     // 🔵 USER SECOND
//     const user = await fetchSession("/api/auth/me");
//     if (user?.ok) {
//       setIsLoggedIn(true);
//       setIsAdminLoggedIn(false);
//       setUserEmail(user.user?.email || "");
//       return;
//     }

//     // ❌ NO SESSION
//     setIsLoggedIn(false);
//     setIsAdminLoggedIn(false);
//     setUserEmail("");
//   } catch (err) {
//     setIsLoggedIn(false);
//     setIsAdminLoggedIn(false);
//     setUserEmail("");
//   } finally {
//     setLoading(false);
//   }
// }, []);

//   useEffect(() => {
//     verifySessions();
//   }, [verifySessions]);

//   /* 🔥 Detect direct URL hit for admin-register */
//   useEffect(() => {
//     if (location.pathname === "/admin-register" && !adminVerified) {
//       setShowAdminPopup(true);
//       setPendingAdminRegister(true);
//       navigate("/", { replace: true });
//     }
//   }, [location.pathname, adminVerified, navigate]);

//   /* 🔐 Secret verify */
//   const verifyAdminSecret = () => {
//     if (adminSecret.trim() !== FRONTEND_ADMIN_SECRET) {
//       setAdminError("❌ Wrong secret code");
//       return;
//     }

//     setAdminVerified(true);
//     setShowAdminPopup(false);
//     setAdminSecret("");
//     setAdminError("");

//     if (pendingAdminRegister) {
//       setPendingAdminRegister(false);
//       navigate("/admin-register");
//     }
//   };

//   /* Handle Enter key in admin popup */
//   const handleAdminSecretKeyPress = (e) => {
//     if (e.key === "Enter") {
//       verifyAdminSecret();
//     }
//   };

//   /* Cancel admin popup */
//   const cancelAdminPopup = () => {
//     setShowAdminPopup(false);
//     setAdminSecret("");
//     setAdminError("");
//     setPendingAdminRegister(false);
//   };


// if (loading) {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <h3>Loading…</h3>
//     </div>
//   );
// }

//   return (
//     <div className="app-wrapper">
//       {/* ================= NAVBAR ================= */}
//       {!isDashboardPath && !isAdminPath && (
//         <nav className="navbar">
//   <h4>
//     <FaGraduationCap /> Saraswati Classes
//   </h4>

//   <div className="navbar-right">
//     {!isLoggedIn && !isAdminLoggedIn && (
//       <>
//         <Link to="/" className="nav-button">Home</Link>

//         <div className="dropdown">
//           <button className="nav-button dropdown-toggle">
//             Login ▾
//           </button>
//           <div className="dropdown-menu">
//             <Link to="/login" className="dropdown-item">User Login</Link>
//             <Link to="/admin-login" className="dropdown-item">Admin Login</Link>
//           </div>
//         </div>

//         <Link to="/registration" className="nav-button">Sign Up</Link>
//       </>
//     )}
//   </div>
// </nav>
//       )}

//       {/* ================= ADMIN SECRET POPUP ================= */}
//       {showAdminPopup && (
//         <div className="admin-popup-overlay" onClick={cancelAdminPopup}>
//           <div
//             className="admin-popup"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3>🔐 Admin Verification</h3>

//             <input
//               type="password"
//               placeholder="Enter secret code"
//               value={adminSecret}
//               onChange={(e) => setAdminSecret(e.target.value)}
//               onKeyPress={handleAdminSecretKeyPress}
//               autoFocus
//             />

//             {adminError && <p className="error-text">{adminError}</p>}

//             <div className="popup-actions">
//               <button onClick={verifyAdminSecret}>Verify</button>
//               <button onClick={cancelAdminPopup}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= ROUTES ================= */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/service" element={<Service />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/registration" element={<Registration />} />
//         <Route path="/forgot-password" element={<ForgetPassword />} />
//         <Route path="/verify-otp" element={<VerifyOTP />} />
//         <Route path="/userreport" element={<UserReport />} />

//         <Route
//           path="/login"
//           element={<Login onSuccess={verifySessions} />}
//         />
//         <Route
//           path="/admin-login"
//           element={<AdminLogin onSuccess={verifySessions} />}
//         />

//         {/* 🔐 ADMIN REGISTER (SECRET REQUIRED) */}
//         <Route
//           path="/admin-register"
//           element={
//             adminVerified ? (
//               <AdminCreate />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         {/* USER DASHBOARD */}
//         <Route
//           path="/dashboard/*"
//           element={
//             <ProtectedRoute isAuth={isLoggedIn}>
//               <Dashboard email={userEmail} />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Houserent />} />
//           <Route path="houserent" element={<Houserent />} />
//           <Route path="history" element={<YourPurchases />} />
//           <Route path="student-lecture" element={<StudentLecture />} />
//           <Route path="recorded-lectures" element={<RecordedLectures />} />
//         </Route>

//         {/* ADMIN DASHBOARD */}
//         <Route
//           path="/admin/dashboard/*"
//           element={
//             <AdminProtectedRoute isAuth={isAdminLoggedIn}>
//               <AdminDashboard onSessionChange={verifySessions} />
//             </AdminProtectedRoute>
//           }
//         >
//           <Route index element={<ARegistration />} />
//           <Route path="ahouserent" element={<AHouserent />} />
//           <Route path="adminPurchases" element={<AdminPurchases />} />
//           <Route path="registration" element={<ARegistration />} />
//           <Route path="reports" element={<AReports />} />
//           <Route path="settings" element={<ASetting />} />
//           <Route path="create-admin" element={<AdminCreate />} />
//         </Route>

//         <Route path="*" element={<h2>404 - Page Not Found</h2>} />
//       </Routes>
//     </div>
//   );
// }

// /* ================= ROOT ================= */
// export default function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }



// // App.js
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   Link,
// } from "react-router-dom";

// import Home from "./Home";
// import AboutUs from "./AboutUs";
// import Service from "./Service";
// import Contact from "./Contact";
// import Registration from "./Registration";
// import Login from "./Login";
// import ForgetPassword from "./ForgetPassword";
// import VerifyOTP from "./VerifyOTP";
// import UserReport from "./UserReport";

// import Dashboard from "./Dashboard";
// import CourseList from "./CourseList";
// import YourPurchases from "./YourPurchases";
// import StudentLecture from "./StudentLive";
// import RecordedLectures from "./RecordedLectures";

// import AdminLogin from "./AdminLogin";
// import AdminDashboard from "./AdminDashboard";
// import ACourse from "./ACourse";
// import AdminPurchases from "./AdminPurchases";
// import ARegistration from "./ARegistration";
// import AReports from "./AReports";
// import ASetting from "./ASetting";
// import AdminCreate from "./AdminCreate";

// import { FaGraduationCap } from "react-icons/fa";
// import "./App.css";

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

// /* ================= SESSION FETCH ================= */
// async function fetchMe() {
//   try {
//     const res = await fetch(`${API_BASE}/api/auth/me`, {
//       credentials: "include",
//     });
//     if (!res.ok) return null;
//     return await res.json();
//   } catch {
//     return null;
//   }
// }

// /* ================= ROUTE GUARDS ================= */
// const UserRoute = ({ auth, children }) =>
//   auth?.role === "user" ? children : <Navigate to="/login" replace />;

// const AdminRoute = ({ auth, children }) =>
//   auth?.role === "admin" ? children : <Navigate to="/admin-login" replace />;

// /* ================= APP WRAPPER ================= */
// function AppWrapper() {
//   const [auth, setAuth] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ===== ADMIN POPUP STATES ===== */
//   const [showAdminPopup, setShowAdminPopup] = useState(false);
//   const [adminSecret, setAdminSecret] = useState("");
//   const [adminError, setAdminError] = useState("");

//   const location = useLocation();
//   const hideNavbar =
//     location.pathname.startsWith("/dashboard") ||
//     location.pathname.startsWith("/admin/dashboard");

//   /* ===== VERIFY SESSION ===== */
//   const verifySession = useCallback(async () => {
//     setLoading(true);
//     const data = await fetchMe();
//     setAuth(data?.ok ? data.user : null);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     verifySession();
//   }, [verifySession]);

//   /* ===== ADMIN POPUP FUNCTIONS ===== */
//   const openAdminPopup = () => {
//     setShowAdminPopup(true);
//     setAdminSecret("");
//     setAdminError("");
//   };

//   const cancelAdminPopup = () => {
//     setShowAdminPopup(false);
//     setAdminSecret("");
//     setAdminError("");
//   };

//   const verifyAdminSecret = () => {
//     // 🔐 change secret if needed
//     if (adminSecret === "ADMIN123") {
//       setShowAdminPopup(false);
//       window.location.href = "/admin-login";
//     } else {
//       setAdminError("❌ Invalid admin secret code");
//     }
//   };

//   const handleAdminSecretKeyPress = (e) => {
//     if (e.key === "Enter") {
//       verifyAdminSecret();
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
//         <h3>Loading…</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="app-wrapper">
//       {/* ================= NAVBAR ================= */}
//       {!hideNavbar && (
//         <nav className="navbar">
//           <h4>
//             <FaGraduationCap /> Saraswati Classes
//           </h4>

//           <div className="navbar-right">
//             {!auth && (
//               <>
//                 <Link to="/" className="nav-button">Home</Link>

//                 <div className="dropdown">
//                   <button className="nav-button dropdown-toggle">
//                     Login ▾
//                   </button>
//                   <div className="dropdown-menu">
//                     <Link to="/login" className="dropdown-item">
//                       User Login
//                     </Link>

//                     <Link to="/admin-login" className="dropdown-item">
//                       Admin Login
//                     </Link>
//                     <button
//                       className="dropdown-item"
//                       onClick={openAdminPopup}
//                     >
//                       Admin Create
//                     </button>
//                   </div>
//                 </div>

//                 <Link to="/registration" className="nav-button">
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </nav>
//       )}

//       {/* ================= ADMIN VERIFICATION POPUP ================= */}
//       {showAdminPopup && (
//         <div className="admin-popup-overlay" onClick={cancelAdminPopup}>
//           <div
//             className="admin-popup"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3>🔐 Admin Verification</h3>

//             <input
//               type="password"
//               placeholder="Enter secret code"
//               value={adminSecret}
//               onChange={(e) => setAdminSecret(e.target.value)}
//               onKeyDown={handleAdminSecretKeyPress}
//               autoFocus
//             />

//             {adminError && (
//               <p className="error-text">{adminError}</p>
//             )}

//             <div className="popup-actions">
//               <button onClick={verifyAdminSecret}>Verify</button>
//               <button onClick={cancelAdminPopup}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= ROUTES ================= */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/service" element={<Service />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/registration" element={<Registration />} />
//         <Route path="/forgot-password" element={<ForgetPassword />} />
//         <Route path="/verify-otp" element={<VerifyOTP />} />
//         <Route path="/userreport" element={<UserReport />} />

//         <Route path="/login" element={<Login onSuccess={verifySession} />} />
//         <Route path="/admin-login" element={<AdminLogin onSuccess={verifySession} />} />

//         {/* USER DASHBOARD */}
//         <Route
//           path="/dashboard/*"
//           element={
//             <UserRoute auth={auth}>
//               <Dashboard email={auth?.email} />
//             </UserRoute>
//           }
//         >
//           <Route index element={<CourseList />} />
//           <Route path="courses" element={<CourseList />} />
//           <Route path="history" element={<YourPurchases />} />
//           <Route path="student-lecture" element={<StudentLecture />} />
//           <Route path="recorded-lectures" element={<RecordedLectures />} />
//         </Route>

//         {/* ADMIN DASHBOARD */}
//         <Route
//           path="/admin/dashboard/*"
//           element={
//             <AdminRoute auth={auth}>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         >
//           <Route index element={<ARegistration />} />
//           <Route path="courses" element={<ACourse />} />
//           <Route path="adminPurchases" element={<AdminPurchases />} />
//           <Route path="registration" element={<ARegistration />} />
//           <Route path="reports" element={<AReports />} />
//           <Route path="settings" element={<ASetting />} />
//           <Route path="create-admin" element={<AdminCreate />} />
//         </Route>

//         <Route path="*" element={<h2>404 - Page Not Found</h2>} />
//       </Routes>
//     </div>
//   );
// }

// /* ================= ROOT ================= */
// export default function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }


// App.js
import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";

import Home from "./Home";
import AboutUs from "./AboutUs";
import Service from "./Service";
import Contact from "./Contact";
import Registration from "./Registration";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import VerifyOTP from "./VerifyOTP";
import UserReport from "./UserReport";

import Dashboard from "./Dashboard";
import CourseList from "./CourseList";
import YourPurchases from "./YourPurchases";
import StudentLecture from "./StudentLive";
import RecordedLectures from "./RecordedLectures";

import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ACourse from "./ACourse";
import AdminPurchases from "./AdminPurchases";
import ARegistration from "./ARegistration";
import AReports from "./AReports";
import ASetting from "./ASetting";
import AdminCreate from "./AdminCreate";

import { FaGraduationCap } from "react-icons/fa";
import "./App.css";

const API_BASE = process.env.REACT_APP_API;

/* ================= SESSION FETCH ================= */
async function fetchMe() {
  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/* ================= ROUTE GUARDS ================= */
const UserRoute = ({ auth, children }) =>
  auth?.role === "user" ? children : <Navigate to="/login" replace />;

const AdminRoute = ({ auth, children }) =>
  auth?.role === "admin" ? children : <Navigate to="/admin-login" replace />;

/* ================= APP WRAPPER ================= */
function AppWrapper() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== ADMIN CREATE POPUP STATES ===== */
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminVerified, setAdminVerified] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin/dashboard");

  /* ===== VERIFY SESSION ===== */
  const verifySession = useCallback(async () => {
    setLoading(true);
    const data = await fetchMe();
    setAuth(data?.ok ? data.user : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  /* ===== ADMIN CREATE LOGIC ===== */
  const openAdminPopup = () => {
    setShowAdminPopup(true);
    setAdminSecret("");
    setAdminError("");
  };

  const cancelAdminPopup = () => {
    setShowAdminPopup(false);
    setAdminSecret("");
    setAdminError("");
  };

  const verifyAdminSecret = () => {
    // ✅ secret only for Admin Create
    if (adminSecret === "ADMIN123") {
  setAdminVerified(true);          // ✅ mark verified
  setShowAdminPopup(false);
  navigate("/admin-register");
} else {
  setAdminError("❌ Invalid secret key");
}
  };



  const handleAdminSecretKeyPress = (e) => {
    if (e.key === "Enter") verifyAdminSecret();
  };

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <h3>Loading…</h3>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* ================= NAVBAR ================= */}
      {!hideNavbar && (
        <nav className="navbar">
          <h4>
            <FaGraduationCap /> Saraswati Classes
          </h4>

          <div className="navbar-right">
            {!auth && (
              <>
                <Link to="/" className="nav-button">Home</Link>

                <div className="dropdown">
                  <button className="nav-button dropdown-toggle">
                    Login ▾
                  </button>
                  <div className="dropdown-menu">
                    <Link to="/login" className="dropdown-item">
                      User Login
                    </Link>

                    <Link to="/admin-login" className="dropdown-item">
                      Admin Login
                    </Link>

                    {/* <button
                      className="dropdown-item"
                      onClick={openAdminPopup}
                    >
                      Admin Create
                    </button> */}
                  </div>
                </div>

                <Link to="/registration" className="nav-button">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}

      {/* ================= ADMIN CREATE POPUP ================= */}
      {showAdminPopup && (
        <div className="admin-popup-overlay" onClick={cancelAdminPopup}>
          <div
            className="admin-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>🔐 Admin Verification</h3>

            <input
              type="password"
              placeholder="Enter secret key"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              onKeyDown={handleAdminSecretKeyPress}
              autoFocus
            />

            {adminError && <p className="error-text">{adminError}</p>}

            <div className="popup-actions">
              <button onClick={verifyAdminSecret}>Verify</button>
              <button onClick={cancelAdminPopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ROUTES ================= */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/userreport" element={<UserReport />} />

        <Route path="/login" element={<Login onSuccess={verifySession} />} />
        <Route
          path="/admin-login"
          element={<AdminLogin onSuccess={verifySession} />}
        />
        <Route
          path="/admin-register"
          element={
            adminVerified ? (
              <AdminCreate />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        
        {/* USER DASHBOARD */}
        <Route
          path="/dashboard/*"
          element={
            <UserRoute auth={auth}>
              <Dashboard email={auth?.email} />
            </UserRoute>
          }
        >
          <Route index element={<CourseList />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="history" element={<YourPurchases />} />
          <Route path="student-lecture" element={<StudentLecture />} />
          <Route path="recorded-lectures" element={<RecordedLectures />} />
        </Route>

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard/*"
          element={
            <AdminRoute auth={auth}>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<ARegistration />} />
          <Route path="courses" element={<ACourse />} />
          <Route path="adminPurchases" element={<AdminPurchases />} />
          <Route path="registration" element={<ARegistration />} />
          <Route path="reports" element={<AReports />} />
          <Route path="settings" element={<ASetting />} />
          <Route path="create-admin" element={<AdminCreate />} />
        </Route>

        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

/* ================= ROOT ================= */
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
