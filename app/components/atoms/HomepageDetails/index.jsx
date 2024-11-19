import React from "react";
import "./homepageDetails.css"; // Assuming you will style using this file
import PopoverContent from "../../templates/PopoverContent";
import {
  ANNOUNCEMENT_BAR_TYPES,
  announcementPopoverData,
} from "../../../constants/announcementCustomizationConfig";
import {
  CheckIcon
} from '@shopify/polaris-icons';
import { Icon } from "@shopify/polaris";
const HomepageDetails = ({ selectedType, setSelectedType }) => {


  const TickIcon = () => {
    return   <Icon
    source={CheckIcon}
    tone="success"
  />
  }
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
          <TickIcon></TickIcon>
            {/* Green checkmark icon */}
            <div>
              <span className="point-description">
                Show how much users have left to spend for Free Shipping
              </span>
            </div>
          </div>
          <div className="point right">
          <TickIcon></TickIcon>
            <div>
              <span className="point-description">
                Create urgency with the Countdown Timer Bar
              </span>
            </div>
          </div>
          <div className="point left">
          <TickIcon></TickIcon>
            <div>
              <span className="point-description">
                Capture emails by giving a discount with the Email Capture Bar
              </span>
            </div>
          </div>
          <div className="point right">
          <TickIcon></TickIcon>
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
          onSelect={(selectedType) => {
            setSelectedType(selectedType)
          }}
        ></PopoverContent>
      </div>
    </>
  );
};

export default HomepageDetails;
