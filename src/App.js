// //App.js

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router,Routes,Route,Navigate,Link,useLocation,} from "react-router-dom";

// import TeacherLecture from "./TeacherLecture";
// import StudentLecture from "./StudentLecture";


// import Home from "./Home";
// import Login from "./Login";
// import Registration from "./Registration";
// import Service from "./Service";
// import Contact from "./Contact";
// import AboutUs from "./AboutUs";
// import ForgetPassword from "./ForgetPassword";
// import VerifyOTP from "./VerifyOTP";
// import UserReport from "./UserReport";


// import Dashboard from "./Dashboard";
// import YourPurchases from "./YourPurchases";

// import Houserent from "./Houserent";
// import AdminLogin from "./AdminLogin";
// import AdminDashboard from "./AdminDashboard"; 
// import AHouserent from "./AHouserent";
// import AdminPurchases from "./AdminPurchases";
// import ARegistration from "./ARegistration";
// import AReports from "./AReports";
// import ASetting from "./ASetting";
// import "./App.css";
// import AppIcon from "./Appicons.jpg";
// import { FaHome} from "react-icons/fa";


// function AppWrapper() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const location = useLocation();
//   const isDashboardPath = location.pathname.startsWith("/dashboard");
//   const isAdminPath = location.pathname.startsWith("/admin/dashboard"); 

//   useEffect(() => {
//     const storedLogin = localStorage.getItem("isLoggedIn");
//     const storedEmail = localStorage.getItem("email");
//     const storedPassword = localStorage.getItem("password");
//     const adminLogged = localStorage.getItem("isAdminLoggedIn");

//     if (storedLogin === "true") {
//       setIsLoggedIn(true);
//       setEmail(storedEmail || "");
//       setPassword(storedPassword || "");
//     }
//     if (adminLogged === "true") {
//       setIsAdminLoggedIn(true);
//     }
//   }, []);

//   return (
//     <div className="app-wrapper">
//       {!isDashboardPath && !isAdminPath && (
//         <nav className="navbar">
//           <div className="IconApps">
//             <h4><FaHome /> MyRentalHub</h4>
//           </div>

//           <div className="navbar-right">
//             <Link to="/" className="nav-button home-btn">Home</Link>
//             <div className="dropdown">
//               <button className="nav-button dropdown-toggle">Login ▾</button>
//               <div className="dropdown-menu">
//                 <Link to="/login" className="dropdown-item">User Login</Link>
//                 <Link to="/admin-login" className="dropdown-item">Admin Login</Link> 
//               </div>
//             </div>
//             <Link to="/registration" className="nav-button">Sign Up</Link>
//           </div>
//         </nav>
//       )}

     
//       <div className="main-content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/registration" element={<Registration />} />
//           <Route path="/service" element={<Service />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/UserReport" element={<UserReport/>} />
//           <Route
//             path="/login"
//             element={
//               <Login
//                 onSuccess={(email, password) => {
//                   setIsLoggedIn(true);
//                   setEmail(email);
//                   setPassword(password);
//                   localStorage.setItem("isLoggedIn", "true");
//                   localStorage.setItem("email", email);
//                   localStorage.setItem("password", password);
//                 }}
//               />
//             }
//           />
//           <Route path="/forgot-password" element={<ForgetPassword />} />
//           <Route path="/verify-otp" element={<VerifyOTP />} />

//           <Route path="/teacher-lecture" element={<TeacherLecture />} />
//           <Route path="/student-lecture" element={<StudentLecture />} />


//           <Route
//             path="/admin-login"
//             element={
//               <AdminLogin
//                 onSuccess={() => {
//                   setIsAdminLoggedIn(true);
//                   localStorage.setItem("isAdminLoggedIn", "true");
//                 }}
//               />
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={
//               isLoggedIn ? (
//                 <Dashboard
//                   email={email}
//                   password={password}
//                   setIsLoggedIn={setIsLoggedIn}
//                 />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           >
        
//           <Route index element={<Houserent />} />
//           <Route path="Houserent" element={<Houserent />} />
//           <Route path="History" element={<YourPurchases/>} />
//           </Route>

//          <Route
//          path="/admin/dashboard"
//          element={
//          isAdminLoggedIn ? (
//          <AdminDashboard />
//          ) : (
//          <Navigate to="/admin-login" replace />
//          )
//          }
//          >
//          <Route index element={<ARegistration  />} />
//          <Route path="ahouserent" element={<AHouserent />} />
//          <Route path="adminPurchases" element={<AdminPurchases />} />
//          <Route path="registration" element={<ARegistration />} />
//          <Route path="reports" element={<AReports />} />
//          <Route path="settings" element={<ASetting />} />
//          <Route path="teacher-lecture" element={<TeacherLecture />} />

//          </Route>
//          <Route path="*" element={<h2>404 - Page Not Found</h2>} />

//         </Routes>
//       </div>
//     </div>
//   );
// }

//    function App() {
//    return (
//    <Router>
//      <AppWrapper />
//    </Router>
//  );
// }
// export default App;

// App.js

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";

// Pages
import Home from "./Home";
import AboutUs from "./AboutUs";
import Service from "./Service";
import Contact from "./Contact";
import Registration from "./Registration";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import VerifyOTP from "./VerifyOTP";
import UserReport from "./UserReport";

// Dashboards
import Dashboard from "./Dashboard";
import Houserent from "./Houserent";
import YourPurchases from "./YourPurchases";
import TeacherLecture from "./TeacherLive";
import StudentLecture from "./StudentLive";
import RecordedLectures from "./RecordedLectures";
import UploadLecture from "./UploadLecture";

// Admin
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AHouserent from "./AHouserent";
import AdminPurchases from "./AdminPurchases";
import ARegistration from "./ARegistration";
import AReports from "./AReports";
import ASetting from "./ASetting";

// Icons & CSS
import { FaHome } from "react-icons/fa";
import "./App.css";

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith("/dashboard");
  const isAdminPath = location.pathname.startsWith("/admin/dashboard");

  // Check localStorage for login
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const adminLogged = localStorage.getItem("isAdminLoggedIn");

    if (storedLogin === "true") {
      setIsLoggedIn(true);
      setEmail(storedEmail || "");
      setPassword(storedPassword || "");
    }
    if (adminLogged === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <div className="app-wrapper">
      {/* Navbar for public pages */}
      {!isDashboardPath && !isAdminPath && (
        <nav className="navbar">
          <div className="IconApps">
            <h4>
              <FaHome /> MyRentalHub
            </h4>
          </div>
          <div className="navbar-right">
            <Link to="/" className="nav-button home-btn">
              Home
            </Link>
            <div className="dropdown">
              <button className="nav-button dropdown-toggle">Login ▾</button>
              <div className="dropdown-menu">
                <Link to="/login" className="dropdown-item">
                  User Login
                </Link>
                <Link to="/admin-login" className="dropdown-item">
                  Admin Login
                </Link>
              </div>
            </div>
            <Link to="/registration" className="nav-button">
              Sign Up
            </Link>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/UserReport" element={<UserReport />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Login Routes */}
          <Route
            path="/login"
            element={
              <Login
                onSuccess={(email, password) => {
                  setIsLoggedIn(true);
                  setEmail(email);
                  setPassword(password);
                  localStorage.setItem("isLoggedIn", "true");
                  localStorage.setItem("email", email);
                  localStorage.setItem("password", password);
                }}
              />
            }
          />
          <Route
            path="/admin-login"
            element={
              <AdminLogin
                onSuccess={() => {
                  setIsAdminLoggedIn(true);
                  localStorage.setItem("isAdminLoggedIn", "true");
                }}
              />
            }
          />

          {/* Teacher / Student Live Lecture */}
          <Route path="/teacher-lecture" element={<TeacherLecture />} />
          <Route path="/student-lecture" element={<StudentLecture />} />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard
                  email={email}
                  password={password}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Houserent />} />
            <Route path="Houserent" element={<Houserent />} />
            <Route path="History" element={<YourPurchases />} />
            <Route path="student-lecture" element={<StudentLecture />} />
            <Route path="recorded-lectures" element={<RecordedLectures />} />
          </Route>

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" replace />
            }
          >
            <Route index element={<ARegistration />} />
            <Route path="ahouserent" element={<AHouserent />} />
            <Route path="adminPurchases" element={<AdminPurchases />} />
            <Route path="registration" element={<ARegistration />} />
            <Route path="reports" element={<AReports />} />
            <Route path="settings" element={<ASetting />} />
            <Route path="teacher-lecture" element={<TeacherLecture />} />
            <Route path="upload-lecture" element={<UploadLecture />} />

          </Route>

          {/* 404 Page */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
