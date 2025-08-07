

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import Service from "./Service";
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import ForgetPassword from "./ForgetPassword";
import VerifyOTP from "./VerifyOTP";
import UserReport from "./UserReport";

// Dashboard and Admin
import Dashboard from "./Dashboard";
import DashHome from "./DashHome";
import Stock from "./Stock";
import Transaction from "./Transaction";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard"; // (if used in the future)

import AStock from "./AStock";
import ATransaction from "./ATransaction";
import ARegistration from "./ARegistration";
import AReports from "./AReports";
import ASetting from "./ASetting";


import "./App.css";
import AppIcon from "./AppIcon.jpg";


function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith("/dashboard");
  const isAdminPath = location.pathname.startsWith("/admin/dashboard"); // ✅ Corrected line


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
      {!isDashboardPath && !isAdminPath && (
        <nav className="navbar">
          <div className="IconApps">
            <img src={AppIcon} alt="Investment Karo" className="IconApp" />
            <h2 className="app-title">Next Invest</h2>
          </div>

          <div className="navbar-right">
            <Link to="/" className="nav-button home-btn">Home</Link>

            <div className="dropdown">
              <button className="nav-button dropdown-toggle">Login ▾</button>
              <div className="dropdown-menu">
                <Link to="/login" className="dropdown-item">User Login</Link>
                <Link to="/admin-login" className="dropdown-item">Admin Login</Link>
                
              </div>
            </div>

            <Link to="/registration" className="nav-button">Sign Up</Link>
          </div>
        </nav>
      )}

     
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/UserReport" element={<UserReport/>} />
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
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

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

          {/* Dashboard routes */}
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
            <Route index element={<DashHome />} />
            <Route path="home" element={<DashHome />} />
            <Route path="stock" element={<Stock />} />
            <Route path="transaction" element={<Transaction email={email} />} />
          </Route>



<Route
  path="/admin/dashboard"
  element={
    isAdminLoggedIn ? (
      <AdminDashboard />
    ) : (
      <Navigate to="/admin-login" replace />
    )
  }
>
  <Route index element={<ARegistration  />} />
  <Route path="stock" element={<AStock />} />
  <Route path="transaction" element={<ATransaction />} />
  <Route path="registration" element={<ARegistration />} />
  <Route path="reports" element={<AReports />} />
  <Route path="settings" element={<ASetting />} />
</Route>

         
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
