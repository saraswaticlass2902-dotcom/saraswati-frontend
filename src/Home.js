//Home.js

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Footer.css";
function Home() {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>Welcome to <span className="highlight">Next Investment</span></h1>
        <p>Your trusted platform for smart and secure investing</p>
        <Link to="/registration" className="get-started-button">Get Started</Link>
         
         
      </header>

     
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-time Trading</h3>
            <p>Get live updates and trade stocks in real time with precision.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Transactions</h3>
            <p>Your funds and data are fully encrypted with industry standards.</p>
          </div>
          <div className="feature-card">
            <h3>Analytics & Insights</h3>
            <p>Get smart portfolio suggestions based on your performance.</p>
          </div>
          <div className="feature-card">
            <h3>Low Fees</h3>
            <p>We offer one of the lowest fees in the industry without compromising quality.</p>
          </div>
        </div>
      </section>

   
      <section className="about-section">
        <h2>About Next Investment</h2>
        <p>
          We are on a mission to empower every Indian to achieve financial freedom.
          Next Investment is a modern trading platform designed for both new and
          experienced investors. Track your stocks, manage your transactions, and grow your wealth with confidence.
        </p>
        <p>
          Whether you are a student, working professional, or retired individual,
          we have personalized tools to help you make the right decisions.
        </p>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Next Investment helped me understand how to trade. It’s user-friendly and secure!"</p>
            <strong>- Priya Sharma</strong>
          </div>
          <div className="testimonial-card">
            <p>"I loved how simple and clean the UI is. Everything works smoothly."</p>
            <strong>- Rahul Deshmukh</strong>
          </div>
          <div className="testimonial-card">
            <p>"My portfolio has grown ever since I started using this app."</p>
            <strong>- Anjali Mehta</strong>
          </div>
        </div>
      </section>

    
      <section className="cta-section">
        <h2>Ready to Start Investing?</h2>
        <p>Sign up today and take your first step towards financial growth.</p>
        <Link to="/registration" className="get-started-button">Create Account</Link>
      </section>


      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Next Investment. All rights reserved.</p>
        <div className="footer-links">
          <h2>Smart Invest</h2>
        <p className="footer-tagline">
          Secure your future with safe and smart investments.
        </p>

          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/service" className="footer-link">Services</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>
        <div className="footer-contact">
          <p>&copy; 2025 Smart Invest. All rights reserved.</p>
          <p>Email: support@nextinvest.com | Phone: +91-9876543210</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
