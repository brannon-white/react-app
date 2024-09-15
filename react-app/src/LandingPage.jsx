import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import langingImage from './assets/landingPhoto.jpeg';
import CustomizedSlider from './AirbnbSlider';

const LandingPage = () => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budget, setBudget] = useState([300, 700]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
  };

  const handleGenerateItinerary = async () => {
    console.log('Generating itinerary...'); // Debugging line
    
    try {
      // Convert startDate and endDate to string format (ISO format)
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';
  
      // If the budget is an array, select a single value or use a default value
      const budgetValue = budget[0] || 0; // Adjust based on how you want to handle the budget array
  
      // Prepare the data to send to the API
      const requestData = {
        destination,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        budget: budgetValue
      };
      
      // Call your API (replace 'http://localhost:5209/generate-itinerary' with your actual API URL)
      const response = await fetch('http://localhost:5209/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }
      
      // Assuming the API response contains the generated itinerary
      const itineraryData = await response.json();
      
      // Navigate to the ItineraryPage with the response data
      navigate('/itinerary', { state: { itinerary: itineraryData } });
      
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setError('Failed to generate itinerary. Please try again.');
    }
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
              <div className="budget-slider-container">
                <CustomizedSlider
                  value={budget}
                  onChange={(_, newValue) => setBudget(newValue)}
                />
              </div>
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