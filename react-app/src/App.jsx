import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './LandingPage.css';
import langingImage from './assets/landingPhoto.jpeg';

const LandingPage = () => {
  const [step, setStep] = useState(1); // Step tracker
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [budget, setBudget] = useState('');

  const handleNextStep = () => {
    if (step === 1 && destination) {
      setStep(2);
    } else if (step === 2 && dateRange) {
      setStep(3);
    } else if (step === 3 && budget) {
      // Handle itinerary generation here
      console.log('Generating itinerary...');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'destination') setDestination(value);
    if (name === 'dateRange') setDateRange(value);
    if (name === 'budget') setBudget(value);
  };

  return (
    <div className="landing-page">
      {/* Image Container */}
      <div className="image-container">
        <img
          src={langingImage}
          alt="Landing"
        />
      </div>
      
      {/* Content */}
      <div className="content">
        <h1 key={step}>
          {step === 1 ? "What's your destination?" : step === 2 ? "When will you be there?" : "What's your budget?"}
        </h1>
        <Form className="form-inline">
          <div className="form-group-container">
            <Form.Control
              type="text"
              placeholder={step === 1 ? "Enter your destination" : step === 2 ? "Enter date range" : "Enter your budget"}
              value={step === 1 ? destination : step === 2 ? dateRange : budget}
              onChange={handleInputChange}
              name={step === 1 ? 'destination' : step === 2 ? 'dateRange' : 'budget'}
              className="input-box"
            />
            <Button 
              variant="primary" 
              className="generate-button" 
              onClick={handleNextStep}
            >
              {step === 3 ? "Generate Itinerary" : "Next"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LandingPage;