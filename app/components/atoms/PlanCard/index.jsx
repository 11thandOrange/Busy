import React from "react";
import "../../templates/Plan/style.css";
import { Link } from  "@remix-run/react";
import { Button } from "@shopify/polaris";

const PlanCard = ({ plan }) => {
  return (
    <div>
      <div className="plan-card" style={{ border: `10px solid ${plan.color}` }}>
        <div className="plan-content">
          <h2>{plan.title}</h2>
          <div>
            <p className="price">
              {plan.price} <span className="price-per-month">/month</span>
            </p>
            <p className="description">{plan.description}</p>
          </div>
        
      <Button url={plan.url}>{plan.buttonText}</Button>
    </div>
  </div>
</div>
  );
};

export default PlanCard;