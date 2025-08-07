//Footer.js

import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-body">
      <div className="footer-container">
        <h2>Smart Invest</h2>
        <p className="footer-tagline">
          Secure your future with safe and smart investments.
        </p>

        <div className="footer-links">
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/service" className="footer-link">Services</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>

        <div className="footer-contact">
          <p>&copy; 2025 Smart Invest. All rights reserved.</p>
          <p>Email: support@nextinvest.com | Phone: +91-9876543210</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
