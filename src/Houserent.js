

import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyForm from "./BuyForm"; // BuyForm popup component
import "./Houserent.css"; // Stylish CSS

function HouseList() {
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [search, setSearch] = useState("");
  const [buyHouse, setBuyHouse] = useState(null); // house selected for buy popup
  const [buyMessage, setBuyMessage] = useState("");

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/houses/list");
        setHouses(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHouses();
  }, []);

  const viewHouse = (house) => setSelectedHouse(house);
  const handleBuyClick = (house) => setBuyHouse(house); // open BuyForm popup

  const filteredHouses = houses.filter(
    (house) =>
      house.title.toLowerCase().includes(search.toLowerCase()) ||
      house.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="house-list-container">
      <header className="house-header">
        <h1> MyRentalHub</h1>
        <input
          type="text"
          placeholder="Search by House Title or Location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </header>

      {buyMessage && <p className="buy-message">{buyMessage}</p>}

      {!selectedHouse ? (
        <div className="cards-container">
          {filteredHouses.length > 0 ? (
            filteredHouses.map((house) => (
              <div key={house._id} className="house-card">
                {house.image && <img src={house.image} alt={house.title} />}
                <div className="house-info">
                  <h4>{house.title}</h4>
                  <p>Price: ₹{house.rent}</p>
                  <p>Location: {house.location}</p>
                  <p>Type: {house.type}</p>
                  <p>Contact: {house.contact}</p>
                  <p className="short-desc">
                    {house.info
                      ? house.info.slice(0, 60) + "..."
                      : "No description available"}
                  </p>
                  <div className="card-buttons">
                    <button onClick={() => viewHouse(house)}>View</button>
                    <button onClick={() => handleBuyClick(house)}>Buy</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No houses found</p>
          )}
        </div>
      ) : (
        <div className="house-detail">
          <button className="back-btn" onClick={() => setSelectedHouse(null)}>
            ← Back
          </button>
          <div className="house-detail-card">
            {selectedHouse.image && (
              <img src={selectedHouse.image} alt={selectedHouse.title} />
            )}
            <div className="house-detail-info">
              <h3>{selectedHouse.title}</h3>
              <p>Price: ₹{selectedHouse.rent}</p>
              <p>Location: {selectedHouse.location}</p>
              <p>Type: {selectedHouse.type}</p>
              <p>Contact: {selectedHouse.contact}</p>
              <p className="full-desc">
                {selectedHouse.info || "No description available"}
              </p>
              <button
                className="buy-btn"
                onClick={() => handleBuyClick(selectedHouse)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {buyHouse && (
        <BuyForm house={buyHouse} onClose={() => setBuyHouse(null)} />
      )}
    </div>
  );
}

export default HouseList;
