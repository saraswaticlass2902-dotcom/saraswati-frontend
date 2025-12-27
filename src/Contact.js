// Contact.js

import React, { useState } from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    classLevel: "",
    enquiryType: "",
    message: "",
    status: "Pending",
  });

  /* ===== HANDLE CHANGE ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===== HANDLE SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Your enquiry has been submitted successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          classLevel: "",
          enquiryType: "",
          message: "",
          status: "Pending",
        });
      } else {
        alert("Something went wrong: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      {/* ===== CONTACT FORM ===== */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Admission / Enquiry Form</h2>

        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="Student / Parent First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="form-row">
          <select
            name="classLevel"
            value={formData.classLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option>5th</option>
            <option>6th</option>
            <option>7th</option>
            <option>8th</option>
            <option>9th</option>
            <option>10th</option>
            <option>11th</option>
            <option>12th</option>
          </select>

          <div className="mobile-input">
            <span className="flag">🇮🇳 +91</span>
            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <select
          name="enquiryType"
          value={formData.enquiryType}
          onChange={handleChange}
          required
        >
          <option value="">Nature of Enquiry</option>
          <option>Admission</option>
          <option>Fees Details</option>
          <option>Batch Timings</option>
          <option>General Enquiry</option>
        </select>

        <h4 style={{ color: "red", marginTop: "10px" }}>
          Please do not share any sensitive personal information
        </h4>

        <textarea
          name="message"
          placeholder="Write your message or enquiry here"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
        ></textarea>

        <button type="submit" className="submit-btn">
          Submit Enquiry <FaArrowRight />
        </button>
      </form>

      {/* ===== CONTACT INFO ===== */}
      <div className="contact-info">
        <h2>📞 Contact Saraswati Classes</h2>

        <div className="info-box">
          <p>
            <FaPhoneAlt /> +91 98765 43210
          </p>
          <p>
            <FaEnvelope /> saraswaticlasses@gmail.com
          </p>
        </div>

        <div className="info-box">
          <h4>🌐 Follow Us</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="info-box">
          <h4>🏫 Address</h4>
          <p>
            Saraswati Classes,<br />
            Main Road,<br />
            Your City – 4XXXXX
          </p>
        </div>

        <div>
          <h3>📄 Your Enquiries</h3>
          <Link to="/UserReport">View Your Reports</Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
