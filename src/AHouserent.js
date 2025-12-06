

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AHouserent.css";

function AStock() {
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [apartmenttype, setApartmentType] = useState("");
  const [contact, setContact] = useState("");
  const [info, setInfo] = useState(""); // ✅ keep only info
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/houses/list");
        setHouses(res.data);
        setFilteredHouses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    const filtered = houses.filter(
      (house) =>
        house.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        house.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHouses(filtered);
  }, [searchQuery, houses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("rent", rent);
    formData.append("location", location);
    formData.append("type", apartmenttype);
    formData.append("contact", contact);
    formData.append("description", info); 
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/houses/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("✅ House Added Successfully!");
      setTitle("");
      setRent("");
      setLocation("");
      setApartmentType("");
      setContact("");
      setInfo("");
      setImage(null);
      document.getElementById("imageInput").value = "";

      setHouses((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("❌ Error:", err.response ? err.response.data : err.message);
      setMessage(
        "❌ " + (err.response?.data?.error || "Server Error while adding house")
      );
    }
  };

  const viewHouse = (house) => setSelectedHouse(house);

  return (
    <div className="astock-container">
      <div className="add-house">
        <h2>Add House</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              placeholder="House Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Rent Price"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apartment Type: ex 1BHK"
              value={apartmenttype}
              onChange={(e) => setApartmentType(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            ></textarea>
            <input
              type="file"
              id="imageInput"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button type="submit">Add House</button>
        </form>

        {image && (
          <div className="preview">
            <p>🖼 Preview:</p>
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="preview-img"
            />
          </div>
        )}
      </div>

      <hr />

      <div className="house-list">
        <h2>House List</h2>
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {!selectedHouse ? (
          <div className="cards-container">
            {filteredHouses.map((house) => (
              <div key={house._id} className="house-card">
                <h4>{house.title}</h4>
                <p>Price: ₹{house.rent}</p>
                <p>Location: {house.location}</p>
                <p>Apartment Type: {house.type}</p>
                <p>Contact: {house.contact}</p>
                <p>{house.info}</p> {/* ✅ show info */}
                {house.image && <img src={house.image} alt={house.title} />}
                <button onClick={() => viewHouse(house)}>View House</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="house-detail">
            <button className="Backtohome" onClick={() => setSelectedHouse(null)}>
              Back to List
            </button>
            <h3>{selectedHouse.title}</h3>
            <p>Price: ₹{selectedHouse.rent}</p>
            <p>Location: {selectedHouse.location}</p>
            <p>Apartment Type: {selectedHouse.type}</p>
            <p>Contact: {selectedHouse.contact}</p>
            <p>{selectedHouse.info}</p> {/* ✅ show info */}
            {selectedHouse.image && (
              <img src={selectedHouse.image} alt={selectedHouse.title} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AStock;
