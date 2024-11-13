import React from "react";
import "./homepageDetails.css"; // Assuming you will style using this file
import PopoverContent from "../../templates/PopoverContent";
import { ANNOUNCEMENT_BAR_TYPES, announcementPopoverData } from "../../../constants/announcementCustomizationConfig";



const HomepageDetails = () => {
  return (
    <>
      <div className="homepage-details">
        {/* Line Description */}
        <h2 className="description">
          Capture leads, communicate free shipping thresholds or make store-wide
          announcements with the help of header bars.
        </h2>

        {/* Grid of Points */}
        <div className="points-grid">
          <div className="point left">
            <span className="icon green-icon">✔️</span>{" "}
            {/* Green checkmark icon */}
            <div>
              <span className="point-description">
                Show how much users have left to spend for Free Shipping
              </span>
            </div>
          </div>
          <div className="point right">
            <span className="icon green-icon">✔️</span>
            <div>
              <span className="point-description">
                Create urgency with the Countdown Timer Bar
              </span>
            </div>
          </div>
          <div className="point left">
            <span className="icon green-icon">✔️</span>
            <div>
              <span className="point-description">
                Capture emails by giving a discount with the Email Capture Bar
              </span>
            </div>
          </div>
          <div className="point right">
            <span className="icon green-icon">✔️</span>
            <div>
              <span className="point-description">
                Choose from 10+ themes and easily customize the design
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <PopoverContent
          options={announcementPopoverData}
          heading="Create Announcement Bar"
          onSelect={()=>{
            
          }}
        ></PopoverContent>
      </div>
    </>
  );
};

export default HomepageDetails;
