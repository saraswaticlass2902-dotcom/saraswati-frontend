


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ACourse.css";

// const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

// function ACourse() {
//   /* ================= STATES ================= */
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [duration, setDuration] = useState("");
//   const [instructor, setInstructor] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState(null);

//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH COURSES ================= */
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE}/api/courses/list`);
//         setCourses(res.data || []);
//         setFilteredCourses(res.data || []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   /* ================= SEARCH ================= */
//   useEffect(() => {
//     const filtered = courses.filter(
//       (c) =>
//         (c.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (c.category || "").toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredCourses(filtered);
//     setSelectedCourse(null);
//   }, [searchQuery, courses]);

//   /* ================= FILE VALIDATION ================= */
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Only image files allowed");
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       alert("Image must be under 2MB");
//       e.target.value = "";
//       return;
//     }

//     setThumbnail(file);
//   };

//   /* ================= ADD COURSE ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!thumbnail) {
//       setMessage("❌ Thumbnail required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("duration", duration);
//     formData.append("instructor", instructor);
//     formData.append("description", description);
//     formData.append("thumbnail", thumbnail); // 🔴 must match backend

//     try {
//       const res = await axios.post(
//         `${API_BASE}/api/courses/add`,
//         formData,
//         { withCredentials: true }
//       );

//       setMessage("✅ Course added successfully");
//       setCourses((prev) => [res.data, ...prev]);
//       setFilteredCourses((prev) => [res.data, ...prev]);

//       // Reset form
//       setTitle("");
//       setPrice("");
//       setCategory("");
//       setDuration("");
//       setInstructor("");
//       setDescription("");
//       setThumbnail(null);
//       document.getElementById("thumbnailInput").value = "";
//     } catch (err) {
//       console.error("ADD COURSE ERROR:", err);
//       setMessage(
//         err.response?.data?.error ||
//           err.response?.data?.message ||
//           "❌ Error while adding course"
//       );
//     }
//   };

//   /* ================= JSX ================= */
//   return (
//     <div className="acourse-container">
//       {/* ===== ADD COURSE ===== */}
//       <div className="add-course">
//         <h2>Add Course</h2>
//         {message && <p className="message">{message}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Course Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <input
//             type="number"
//             placeholder="Price (₹)"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Duration"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Instructor"
//             value={instructor}
//             onChange={(e) => setInstructor(e.target.value)}
//             required
//           />

//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <input
//             type="file"
//             id="thumbnailInput"
//             accept="image/*"
//             onChange={handleFileChange}
//             required
//           />

//           <button type="submit">Add Course</button>
//         </form>

//         {thumbnail && (
//           <div className="preview">
//             <p>Preview:</p>
//             <img
//               src={URL.createObjectURL(thumbnail)}
//               alt="preview"
//               className="preview-img"
//             />
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* ===== COURSE LIST ===== */}
//       <div className="course-list">
//         <h2>Course List</h2>

//         <input
//           type="text"
//           placeholder="Search by title or category"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-input"
//         />

//         {loading ? (
//           <p>Loading courses...</p>
//         ) : !selectedCourse ? (
//           <div className="cards-container">
//             {filteredCourses.length === 0 && <p>No courses found</p>}

//             {filteredCourses.map((course) => (
//               <div key={course._id} className="course-card">
//                 <h4>{course.title}</h4>
//                 <p>₹{course.price}</p>
//                 <p>{course.category}</p>
//                 <p>{course.duration}</p>
//                 <p>{course.instructor}</p>

//                 {/* ✅ CLOUDINARY IMAGE */}
//                 {course.thumbnail && (
//                   <img
//                     src={`${course.thumbnail}?v=${course.updatedAt}`}
//                     alt={course.title}
//                   />
//                 )}

//                 <button onClick={() => setSelectedCourse(course)}>
//                   View
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="course-detail">
//             <button onClick={() => setSelectedCourse(null)}>⬅ Back</button>

//             <h3>{selectedCourse.title}</h3>
//             <p>₹{selectedCourse.price}</p>
//             <p>{selectedCourse.category}</p>
//             <p>{selectedCourse.duration}</p>
//             <p>{selectedCourse.instructor}</p>
//             <p>{selectedCourse.description}</p>

//             {selectedCourse.thumbnail && (
//               <img
//                 src={`${selectedCourse.thumbnail}?v=${selectedCourse.updatedAt}`}
//                 alt={selectedCourse.title}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ACourse;

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
  const [editCourseId, setEditCourseId] = useState(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH COURSES ================= */
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

  useEffect(() => {
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
  }, [searchQuery, courses]);

  /* ================= FILE VALIDATION ================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    setThumbnail(file);
  };

  /* ================= ADD / UPDATE COURSE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("duration", duration);
    formData.append("instructor", instructor);
    formData.append("description", description);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      if (editCourseId) {
        // 🔄 UPDATE
        await axios.put(
          `${API_BASE}/api/courses/${editCourseId}`,
          formData,
          { withCredentials: true }
        );
        setMessage("✅ Course updated");
      } else {
        // ➕ ADD
        await axios.post(
          `${API_BASE}/api/courses/add`,
          formData,
          { withCredentials: true }
        );
        setMessage("✅ Course added");
      }

      resetForm();
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage("❌ Operation failed");
    }
  };

  /* ================= EDIT COURSE ================= */
  const handleEdit = (course) => {
    setEditCourseId(course._id);
    setTitle(course.title);
    setPrice(course.price);
    setCategory(course.category);
    setDuration(course.duration);
    setInstructor(course.instructor);
    setDescription(course.description);
    setThumbnail(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE COURSE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await axios.delete(`${API_BASE}/api/courses/${id}`, {
        withCredentials: true,
      });
      setMessage("🗑️ Course deleted");
      fetchCourses();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setEditCourseId(null);
    setTitle("");
    setPrice("");
    setCategory("");
    setDuration("");
    setInstructor("");
    setDescription("");
    setThumbnail(null);
    document.getElementById("thumbnailInput").value = "";
  };

  /* ================= JSX ================= */
  return (
    <div className="acourse-container">
      {/* ===== ADD / EDIT COURSE ===== */}
      <div className="add-course">
        <h2>{editCourseId ? "Update Course" : "Add Course"}</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
          <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" required />
          <input value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="Instructor" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <input type="file" id="thumbnailInput" onChange={handleFileChange} />

          <button type="submit">
            {editCourseId ? "Update Course" : "Add Course"}
          </button>

          {editCourseId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <hr />

      {/* ===== COURSE LIST ===== */}
      <div className="course-list">
        <h2>Course List</h2>

        <input
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="cards-container">
            {filteredCourses.map((course) => (
              <div key={course._id} className="course-card">
                <h4>{course.title}</h4>
                <p>₹{course.price}</p>

                {course.thumbnail && (
                  <img src={course.thumbnail} alt={course.title} />
                )}

                <div className="btn-group">
                  <button onClick={() => handleEdit(course)}>Edit</button>
                  <button onClick={() => handleDelete(course._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ACourse;
