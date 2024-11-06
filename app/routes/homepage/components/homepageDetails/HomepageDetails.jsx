import React from 'react';
import './homepageDetails.css'; // Assuming you will style using this file
import PopoverContent from '../../../../components/templates/PopoverContent';




const HomepageDetails = () => {

  const popoverData =   [
    { header: 'Header 1', description: 'Content 1' },
    { header: 'Header 2', description: 'Content 2' },
    { header: 'Header 3', description: 'Content 3' },
    { header: 'Header 4', description: 'Content 4' },
    { header: 'Header 5', description: 'Content 5' }
  ];
  return (
    <>
    <div className="homepage-details">
      {/* Line Description */}
      <h2 className="description">Capture leads, communicate free shipping thresholds or make store-wide announcements with the help of header bars.</h2>

      {/* Grid of Points */}
      <div className="points-grid">
        <div className="point left">
          <span className="icon green-icon">✔️</span> {/* Green checkmark icon */}
          <div>
            
            <span className="point-description">Show how much users have left to spend for Free Shipping</span>
          </div>
        </div>
        <div className="point right">
          <span className="icon green-icon">✔️</span>
          <div>
            
            <span className="point-description">Create urgency with the Countdown Timer Bar</span>
          </div>
        </div>
        <div className="point left">
          <span className="icon green-icon">✔️</span>
          <div>
           
            <span className="point-description">Capture emails by giving a discount with the Email Capture Bar</span>
          </div>
        </div>
        <div className="point right">
          <span className="icon green-icon">✔️</span>
          <div>
            <span className="point-description">Choose from 10+ themes and easily customize the design</span>
          </div>
        </div>
      </div>
    </div>
    <div>
        <PopoverContent options={popoverData}></PopoverContent>
    </div>
    </>
    
  );
};

export default HomepageDetails;
