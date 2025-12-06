//Contact.js

import React, { useState } from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", age: "", type: "", message: "", captcha: "", status: "Pending"
  });

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
      alert("Your request has been submitted successfully.");
      setFormData({
        firstName: "", lastName: "", email: "", phone: "", age: "", type: "", message: "", captcha: ""
      });
    } else {
      alert("Something went wrong: " + result.message);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred. Please try again later.");
  }
};
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Reports</h2>
  


        <div className="form-row">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>

        <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />

        <div className="form-row">
          <select name="age" value={formData.age} onChange={handleChange} required>
            <option value="">Select Age</option>
            <option>18-25</option>
            <option>26-35</option>
            <option>36+</option>
          </select>
          <div className="mobile-input">
            <span className="flag">🇮🇳 +91</span>
            <input type="text" name="phone" placeholder="Mobile No." value={formData.phone} onChange={handleChange} required />
            {/* <span className="whatsapp-icon">🟢</span> */}
          </div>
        </div>
        

        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Nature of enquiry</option>
          <option>General</option>
          <option>Support</option>
          
        </select>


     <>
  <h3 style={{color:"red"}}>Important</h3>
  <h4 style={{color:"red"}}>Please Do Not Share Your Transaction Details</h4>
</>
        <textarea
          name="message"
          placeholder="Your message here"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
        ></textarea>

        {/* <div className="captcha-row">
          <label>
            <input type="checkbox" required /> I am an existing bond investor
          </label>
        </div> */}

        {/* <div className="captcha-box">
          <img src="https://dummyimage.com/120x40/ccc/000&text=XTUE" alt="captcha" />
          <button type="button" className="refresh-btn">
            <MdRefresh size={20} />
          </button>
        </div> */}

        {/* <input
          type="text"
          name="captcha"
          placeholder="Enter Captcha"
          value={formData.captcha}
          onChange={handleChange}
          required
        /> */}

        <button type="submit" className="submit-btn">
          Send Request <FaArrowRight />
        </button>
      </form>

      <div className="contact-info">
        <h2>📞 Contact Info</h2>

        <div className="info-box">
          <p><FaPhoneAlt /> 080-6919 9888</p>
          <p><FaEnvelope /> nextinvestment2025@gmail.com</p>
        </div>


<div className="info-box">
  <h4>🌐 Social Media</h4>
  <div className="social-icons">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
    <a href="https://instagram.com/im.vijay_raut2905" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
  </div>
</div>

        <div className="info-box">
          <h4>🏢 Address</h4>
          <p>
            605, 6th Floor, Windsor,<br />
            CST Road, Kalina,<br />
            Santacruz (East), Mumbai - 400 098
          </p>
        </div>
        <div>
          <h2>Your Reports</h2>
         <Link to="/UserReport">Reports</Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
