import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ACourse.css";

const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

function ACourse() {
  /* ================= STATES ================= */
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH COURSES ================= */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/courses/list`);
        setCourses(res.data || []);
        setFilteredCourses(res.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const filtered = courses.filter(
      (c) =>
        (c.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.category || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
    setSelectedCourse(null);
  }, [searchQuery, courses]);

  /* ================= FILE VALIDATION ================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      e.target.value = "";
      return;
    }

    setThumbnail(file);
  };

  /* ================= ADD COURSE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!thumbnail) {
      setMessage("❌ Thumbnail required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", Number(price));
    formData.append("category", category);
    formData.append("duration", duration);
    formData.append("instructor", instructor);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await axios.post(
        `${API_BASE}/api/courses/add`,
        formData,
        { withCredentials: true }
      );

      setMessage("✅ Course added successfully");
      setCourses((prev) => [...prev, res.data]);
      setFilteredCourses((prev) => [...prev, res.data]);

      // Reset form
      setTitle("");
      setPrice("");
      setCategory("");
      setDuration("");
      setInstructor("");
      setDescription("");
      setThumbnail(null);
      document.getElementById("thumbnailInput").value = "";
    } catch (err) {
      console.error("ADD COURSE ERROR:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "❌ Error while adding course"
      );
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="acourse-container">
      {/* ===== ADD COURSE ===== */}
      <div className="add-course">
        <h2>Add Course</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            id="thumbnailInput"
            onChange={handleFileChange}
            required
          />

          <button type="submit">Add Course</button>
        </form>

        {thumbnail && (
          <div className="preview">
            <p>Preview:</p>
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="preview"
              className="preview-img"
            />
          </div>
        )}
      </div>

      <hr />

      {/* ===== COURSE LIST ===== */}
      <div className="course-list">
        <h2>Course List</h2>

        <input
          type="text"
          placeholder="Search by title or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {loading ? (
          <p>Loading courses...</p>
        ) : !selectedCourse ? (
          <div className="cards-container">
            {filteredCourses.length === 0 && <p>No courses found</p>}

            {filteredCourses.map((course) => (
              <div key={course._id} className="course-card">
                <h4>{course.title}</h4>
                <p>₹{course.price}</p>
                <p>{course.category}</p>
                <p>{course.duration}</p>
                <p>{course.instructor}</p>

                {course.thumbnail && (
                  <img
                    src={`${API_BASE}${course.thumbnail}`}
                    alt={course.title}
                  />
                )}

                <button onClick={() => setSelectedCourse(course)}>
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="course-detail">
            <button onClick={() => setSelectedCourse(null)}>
              ⬅ Back
            </button>

            <h3>{selectedCourse.title}</h3>
            <p>₹{selectedCourse.price}</p>
            <p>{selectedCourse.category}</p>
            <p>{selectedCourse.duration}</p>
            <p>{selectedCourse.instructor}</p>
            <p>{selectedCourse.description}</p>

            {selectedCourse.thumbnail && (
              <img
                src={`${API_BASE}${selectedCourse.thumbnail}`}
                alt={selectedCourse.title}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ACourse;
