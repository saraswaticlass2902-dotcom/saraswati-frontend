//Home.js

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Footer.css";
import h1 from "./h1.jpg";
import h2 from "./h2.jpg";
import h3 from "./h3.jpg";
import h4 from "./h4.jpg";
function Home() {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1 className="highlight" >Welcome to   MyRentalHub</h1>
        <p  style={{color:"black"} } >Your trusted platform </p>
        <Link to="/registration" className="get-started-button">Get Started</Link>
      </header>
 
<div className="icons-section">
  <img src={h1} alt="Investment Karo" className="icon-img" />
  <img src={h2} alt="Investment Karo" className="icon-img" />
  <img src={h3} alt="Investment Karo" className="icon-img" />
  <img src={h4} alt="Investment Karo" className="icon-img" />
</div>

       
  
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Trusted Listings</h3>
            <p>All houses are verified, so you get safe and reliable options.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Customer Support</h3>
            <p>Our support team is always available to help you with any questions or issues.</p>
          </div>
          <div className="feature-card">
            <h3>Quick & Easy Search</h3>
            <p>Filter homes by location, rent, or apartment type to find your ideal home faster.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable & Transparent</h3>
            <p>Rent and property details are clear, with no hidden charges.</p>
          </div>
        </div>
      </section>

   
      <section className="about-section">
        <h2>MyRentalHub</h2>
        <p>
           MyRentalHub is a user-friendly platform designed to make finding rental homes 
           and apartments fast, safe, and hassle-free. Our mission is to connect users directly
            with verified landlords, offering transparent pricing, high-quality property images, 
            and detailed property information.
        </p>
        <p>
          We focus on providing a seamless search experience, so you can filter homes by location,
           rent, or apartment type and find your ideal home in minutes. With 24/7 support and a responsive
            design for all devices, MyRentalHub ensures that finding your next home is easy, reliable,
             and stress-free.
        </p>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>⭐⭐⭐⭐⭐
            “Finding my new apartment was so easy! The listings are verified and the photos are very clear.”</p>
            <strong>- Rajesh S.</strong>
          </div>
          <div className="testimonial-card">
            <p>⭐⭐⭐⭐⭐
               “I love how simple the search is. I found my dream 2BHK within a day!”</p>
            <strong>- Sneha M.</strong>
          </div>
          <div className="testimonial-card">
            <p>⭐⭐⭐⭐
               “The 24/7 support is amazing. Any questions I had were answered instantly.”</p>
            <strong>- Vikram K.</strong>
          </div>
        </div>
      </section>

  

      <footer className="home-footer">
        <p style={{color:"white"}} >&copy; {new Date().getFullYear()}  MyRentalHub. All rights reserved.</p>
        <div className="footer-links">
          <h2 style={{color:"white"}}> MyRentalHub</h2>
        <p style={{color:"white"}}  className="footer-tagline">
          Secure your future with safe Life.
        </p>

          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/service" className="footer-link">Services</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>
        <div className="footer-contact">
          <p style={{color:"white"}} >&copy; 2025 Smart Rent. All rights reserved.</p>
          <p style={{color:"white"}}>Email: support@myrentalhub.com | Phone: +91-9876543210</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
