import React from "react";
import "../../templates/Plan/style.css";
import { Button } from "@shopify/polaris";

const PlanCard = ({ plan }) => {
  return (
    <div className="planboxes">
      <div className="plan-card" style={{ border: `10px solid ${plan.color}` }}>
        <div className="plan-content">
          <div className="upper-wrapper">
            <h2>{plan.title}</h2>
            <div>
              <p className="description">{plan.description}</p>
              <p className="price">
                ${plan.price} <span className="price-per-month">/Month</span>
              </p>
            </div>
            <Button url={plan.url} className="cta-button">{plan.buttonText}</Button>
          </div>  
          <div className="card-footer">
            <div className="feature-content">
              <p className="title">Feature</p>
              <div className="list-wrap">
                <label># of Apps Enabled</label>
                <span className="value">{plan.featureValue}</span>
              </div>
            </div>
          </div>
    </div>
  </div>
</div>
  );
};

export default PlanCard;