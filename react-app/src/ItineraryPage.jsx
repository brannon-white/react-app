import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './ItineraryPage.css'; // Create this new CSS file

const ItineraryPage = () => {
  const location = useLocation();
  const { itinerary } = location.state || {};

  return (
    <div className="itinerary-page">
      <h1>Your Itinerary</h1>
      {itinerary ? (
        <pre>{JSON.stringify(itinerary, null, 2)}</pre>
      ) : (
        <p>No itinerary data available.</p>
      )}
    </div>
  );
};

export default ItineraryPage;