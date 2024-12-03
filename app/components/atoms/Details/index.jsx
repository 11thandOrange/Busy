import { Icon } from "@shopify/polaris";
import React from "react";
import { CheckIcon } from "@shopify/polaris-icons";
import "./style.css";

const TickIcon = () => {
  return (
    <div className="tick-icon">
      <Icon source={CheckIcon} tone="success" />
    </div>
  );
};

const Details = ({ description, points }) => {
  return (
    <div className="homepage-details">
      <h2 className="description">{description}</h2>
      <div className="points-grid">
        {points.map((point, index) => (
          <div
            key={index}
            className={`point ${index % 2 === 0 ? "left" : "right"}`}
          >
            <TickIcon />
            <div>
              <span className="point-description">{point}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
