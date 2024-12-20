import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListingPage = () => {
  const [listing, setListing] = useState(null);
  const { id } = useParams(); // Get the listing ID from the URL

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="listing-page">
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      <p>Location: {listing.location}</p>
      <p>Price: ${listing.price} per night</p>
      <button>Book Now</button>
    </div>
  );
};

export default ListPage;
