import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutus-wrapper">
      <header className="aboutus-header">
        <h1>About Next Investment</h1>
        <p>Your trusted partner in financial growth and wealth building.</p>
      </header>

      <section className="aboutus-section">
        <h2>Our Mission</h2>
        <p>
          At Next Investment, we aim to empower individuals by providing intuitive investment tools, real-time tracking, and a secure platform to grow your financial assets confidently.
        </p>
      </section>

      <section className="aboutus-section">
        <h2>Our Vision</h2>
        <p>
          To democratize financial investment by delivering a smart, secure, and user-friendly digital platform that ensures transparency, control, and efficiency for every user.
        </p>
      </section>

      <section className="aboutus-grid-section">
        <h2>What Makes Us Unique</h2>
        <div className="aboutus-cards">
          <div className="aboutus-card">
            <h3>🔐 Security First</h3>
            <p>
              We use industry-standard encryption, two-factor authentication, and secure transactions to keep your money and data safe.
            </p>
          </div>
          <div className="aboutus-card">
            <h3>📊 Real-time Tracking</h3>
            <p>
              Monitor your balance, stock portfolio, and transaction history with up-to-date market data and analytics.
            </p>
          </div>
          <div className="aboutus-card">
            <h3>🚀 Fast & Simple</h3>
            <p>
              Designed with ease-of-use in mind, our platform is optimized for beginners and professionals alike.
            </p>
          </div>
        </div>
      </section>

      <section className="aboutus-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/team/vijay.jpg" alt="Vijay Raut" />
            <h4>Vijay Raut</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="/team/sheetal.jpg" alt="Sheetal K." />
            <h4>Sheetal K.</h4>
            <p>Head of Design</p>
          </div>
          <div className="team-member">
            <img src="/team/rahul.jpg" alt="Rahul D." />
            <h4>Rahul D.</h4>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      <section className="aboutus-journey">
        <h2>Our Journey</h2>
        <ul>
          <li><strong>2023:</strong> Idea conceptualized, core team formed.</li>
          <li><strong>2024:</strong> MVP launched with wallet and transaction support.</li>
          <li><strong>2025:</strong> Stock buying/selling, balance history, and AI insights introduced.</li>
        </ul>
      </section>

      <section className="aboutus-stats">
        <h2>Our Achievements</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>₹2Cr+</h3>
            <p>Transactions Processed</p>
          </div>
          <div className="stat-item">
            <h3>99.9%</h3>
            <p>Uptime Guarantee</p>
          </div>
        </div>
      </section>

      <section className="aboutus-feedback">
        <h2>User Testimonials</h2>
        <blockquote>
          “Next Investment has made my investing journey smooth and stress-free. The interface is clean and the insights are accurate.”
          <br /> — Sneha Patil
        </blockquote>
        <blockquote>
          “As a beginner, I was nervous about investing, but this platform gave me confidence and clarity.”
          <br /> — Akshay Joshi
        </blockquote>
      </section>

      <section className="aboutus-cta">
        <h2>Ready to Start Your Investment Journey?</h2>
        <button onClick={() => window.location.href = "/register"}>Join Now</button>
      </section>

      <footer className="aboutus-footer">
        <p>&copy; {new Date().getFullYear()} Next Investment. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
