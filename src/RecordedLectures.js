// RecordedLectures.js
import React, { useEffect, useState } from "react";

export default function RecordedLectures() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/lectures/recordings")
      .then(res => res.json())
      .then(data => setLectures(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="recorded-lectures-container">
      <h2>🎬 Recorded Lectures</h2>
      {lectures.length === 0 ? (
        <p>No recordings available.</p>
      ) : (
        <div className="lecture-grid">
          {lectures.map((url, idx) => (
            <div key={idx} className="lecture-card">
              <video src={`http://localhost:5000${url}`} controls className="recorded-video" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
