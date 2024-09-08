import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LandingPage.css';
import langingImage from './assets/landingPhoto.jpeg';

const LandingPage = () => {
  const [step, setStep] = useState(1); // Step tracker
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNextStep = () => {
    if (step === 1 && destination) {
      setStep(2);
    } else if (step === 2 && startDate && endDate) {
      setStep(3);
    } else if (step === 3 && budget) {
      handleGenerateItinerary();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'destination') setDestination(value);
    if (name === 'budget') setBudget(value);
  };

  /* const handleGenerateItinerary = async () => {
    try {
      const response = await fetch('http://your-server-url.com/api/itinerary', { // Replace with your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          budget,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Redirect to the ItineraryPage with data
      navigate('/itinerary', { state: { itinerary: data } });
    } catch (error) {
      setError('Error generating itinerary. Please try again.');
      console.error('Error generating itinerary:', error);
    }
  }; */
  const handleGenerateItinerary = () => {
    // Dummy data to simulate API response
    const dummyData = {
      destination,
      startDate,
      endDate,
      budget,
      itinerary: 'Your generated itinerary will appear here.'
    };
  
    // Navigate to the ItineraryPage with dummy data
    navigate('/itinerary', { state: { itinerary: dummyData } });
  };

  return (
    <div className="landing-page">
      {/* Image Container */}
      <div className="image-container">
        <img src={langingImage} alt="Landing" />
      </div>
      
      {/* Content */}
      <div className="content">
        <h1 key={step}>
          {step === 1 ? "What's your destination?" : step === 2 ? "When will you be there?" : "What's your budget?"}
        </h1>
        <Form className="form-inline">
          <div className="form-group-container">
            {step === 1 && (
              <Form.Control
                type="text"
                placeholder="Enter your destination"
                value={destination}
                onChange={handleInputChange}
                name="destination"
                className="input-box"
              />
            )}
            {step === 2 && (
              <div className="date-range-picker">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select start date"
                  className="date-picker-input"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select end date"
                  className="date-picker-input"
                />
              </div>
            )}
            {step === 3 && (
              <Form.Control
                type="text"
                placeholder="Enter your budget"
                value={budget}
                onChange={handleInputChange}
                name="budget"
                className="input-box"
              />
            )}
            <Button 
              variant="primary" 
              className="generate-button" 
              onClick={handleNextStep}
            >
              {step === 3 ? "Generate Itinerary" : "Next"}
            </Button>
          </div>
        </Form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LandingPage;