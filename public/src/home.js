import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch listings from the backend API
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/listings'); // Modify as per your API
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to the Airbnb Clone</h1>
      <div className="listings">
        {listings.map((listing) => (
          <div key={listing._id} className="listing">
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p>Price: ${listing.price} per night</p>
            <Link to={`/listing/${listing._id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
