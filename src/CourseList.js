import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyForm from "./BuyForm";
import "./CourseList.css";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [search, setSearch] = useState("");
  const [buyCourse, setBuyCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE}/api/courses/list`
        );
        setCourses(data || []);
      } catch (err) {
        console.error("Course fetch error:", err);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      (course.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (course.category || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="course-list-container">
      <header className="course-header">
        <h1>📚 MyCourseHub</h1>
        <input
          type="text"
          placeholder="Search by Course or Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </header>

      {!selectedCourse ? (
        <div className="cards-container">
          {filteredCourses.length ? (
            filteredCourses.map((course) => (
              <div key={course._id} className="course-card">
                {course.thumbnail && (
                  <img
                    src={`${API_BASE}${course.thumbnail}`}
                    alt={course.title}
                  />
                )}

                <div className="course-info">
                  <h4>{course.title}</h4>
                  <p>₹{course.price}</p>
                  <p>{course.category}</p>
                  <p>{course.instructor}</p>

                  <p className="short-desc">
                    {course.description
                      ? course.description.slice(0, 70) + "..."
                      : "No description available"}
                  </p>

                  <div className="card-buttons">
                    <button onClick={() => setSelectedCourse(course)}>
                      View
                    </button>
                    <button onClick={() => setBuyCourse(course)}>
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>
      ) : (
        <div className="course-detail">
          <button
            className="back-btn"
            onClick={() => setSelectedCourse(null)}
          >
            ← Back
          </button>

          <div className="course-detail-card">
            {selectedCourse.thumbnail && (
              <img
                src={`${API_BASE}${selectedCourse.thumbnail}`}
                alt={selectedCourse.title}
              />
            )}

            <div className="course-detail-info">
              <h3>{selectedCourse.title}</h3>
              <p>₹{selectedCourse.price}</p>
              <p>{selectedCourse.category}</p>
              <p>{selectedCourse.instructor}</p>

              <p className="full-desc">
                {selectedCourse.description ||
                  "No description available"}
              </p>

              <button
                className="buy-btn"
                onClick={() => setBuyCourse(selectedCourse)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}

      {buyCourse && (
        <BuyForm
          course={buyCourse}
          onClose={() => setBuyCourse(null)}
        />
      )}
    </div>
  );
}

export default CourseList;
