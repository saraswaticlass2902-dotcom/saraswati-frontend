import React, { useState, useEffect } from "react";
import "./UploadLecture.css";

export default function UploadLecture() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [lectures, setLectures] = useState([]);

  // Fetch all uploaded lectures from server
  const fetchLectures = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/lectures/recordings");
      if (!res.ok) throw new Error("Failed to fetch lectures");
      const data = await res.json();
      setLectures(data);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to load lectures");
    }
  };

  // Load lectures on component mount
  useEffect(() => {
    fetchLectures();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("❌ Please select a file first");
      return;
    }

    // Only allow MP4 videos
    if (file.type !== "video/mp4") {
      setStatus("❌ Only MP4 videos are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Uploading...");

    try {
      const res = await fetch("http://localhost:5000/api/lectures/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Lecture uploaded successfully!");
        setFile(null);
        fetchLectures(); // Refresh lecture list
      } else {
        setStatus("❌ Upload failed!");
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      setStatus("❌ Upload failed!");
    }
  };

  return (
    <div className="upload-lecture-container">
      <h2>📤 Upload Recorded Lecture</h2>

      <input type="file" accept="video/mp4" onChange={handleFileChange} />
      <br /><br />

      <button onClick={handleUpload}>Upload Lecture</button>
      <p>{status}</p>

      <hr />

      <h3>🎬 Uploaded Lectures</h3>
      {lectures.length === 0 ? (
        <p>No lectures uploaded yet.</p>
      ) : (
        lectures.map((lec, index) => (
          <div key={index} className="lecture-item">
            <p><strong>Lecture {index + 1}</strong></p>
            <video
              src={`http://localhost:5000${lec}`}
              controls
              width="100%"
              style={{ borderRadius: "5px", marginBottom: "15px" }}
            />
          </div>
        ))
      )}
    </div>
  );
}
