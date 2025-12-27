import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutus-wrapper">
      {/* ===== HEADER ===== */}
      <header className="aboutus-header">
        <h1>About Saraswati Classes</h1>
        <p>
          Empowering students with quality education, discipline, and confidence.
        </p>
      </header>

      {/* ===== MISSION ===== */}
      <section className="aboutus-section">
        <h2>Our Mission</h2>
        <p>
          At Saraswati Classes, our mission is to provide clear concepts, strong
          fundamentals, and personal guidance to every student so they can
          achieve academic excellence and build a successful future.
        </p>
      </section>

      {/* ===== VISION ===== */}
      <section className="aboutus-section">
        <h2>Our Vision</h2>
        <p>
          To become a trusted educational institute known for quality teaching,
          disciplined learning environment, and consistent student success in
          school, college, and competitive examinations.
        </p>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="aboutus-grid-section">
        <h2>Why Choose Saraswati Classes</h2>
        <div className="aboutus-cards">
          <div className="aboutus-card">
            <h3>📚 Concept-Based Teaching</h3>
            <p>
              We focus on building strong fundamentals with simple explanations,
              real-life examples, and regular doubt-solving sessions.
            </p>
          </div>

          <div className="aboutus-card">
            <h3>👨‍🏫 Experienced Faculty</h3>
            <p>
              Our teachers have years of teaching experience and are dedicated
              to guiding students with personal attention.
            </p>
          </div>

          <div className="aboutus-card">
            <h3>📝 Regular Tests & Feedback</h3>
            <p>
              Weekly tests, performance analysis, and parent feedback help
              students track progress and improve continuously.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COURSES ===== */}
      <section className="aboutus-section">
        <h2>Courses We Offer</h2>
        <ul>
          <li>✔️ School Tuition (5th to 10th – All Boards)</li>
          <li>✔️ Science & Mathematics Special Batches</li>
          <li>✔️ Junior College (11th & 12th)</li>
          <li>✔️ Board Exam Preparation</li>
          <li>✔️ Competitive Exam Foundation</li>
        </ul>
      </section>

      {/* ===== TEACHER ===== */}
      <section className="aboutus-team">
        <h2>Our Faculty</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/team/teacher.jpg" alt="Main Teacher" />
            <h4>Prof. (Name)</h4>
            <p>Founder & Head Teacher</p>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY ===== */}
      <section className="aboutus-journey">
        <h2>Our Journey</h2>
        <ul>
          <li>
            <strong>2018:</strong> Saraswati Classes established with a vision of
            quality education.
          </li>
          <li>
            <strong>2020:</strong> Achieved 100% pass results in board exams.
          </li>
          <li>
            <strong>2023:</strong> Expanded batches with smart teaching methods.
          </li>
        </ul>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="aboutus-stats">
        <h2>Our Achievements</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Students Trained</p>
          </div>
          <div className="stat-item">
            <h3>95%+</h3>
            <p>Consistent Results</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Years of Experience</p>
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK ===== */}
      <section className="aboutus-feedback">
        <h2>What Our Students Say</h2>
        <blockquote>
          “Teachers explain concepts very clearly. My confidence in maths and
          science has improved a lot.”
          <br /> — Student (10th Std)
        </blockquote>
        <blockquote>
          “Regular tests and personal attention helped me score better in board
          exams.”
          <br /> — Parent Feedback
        </blockquote>
      </section>

      {/* ===== CTA ===== */}
      <section className="aboutus-cta">
        <h2>Join Saraswati Classes Today</h2>
        <button onClick={() => (window.location.href = "/contact")}>
          Enroll Now
        </button>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="aboutus-footer">
        <p>
          &copy; {new Date().getFullYear()} Saraswati Classes. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default AboutUs;
