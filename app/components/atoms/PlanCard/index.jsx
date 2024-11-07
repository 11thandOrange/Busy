import React from "react";
import "../../templates/Plan/plan.css"; // If you are using the same CSS, you may keep this as is

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

          <button className="cta-button">{plan.buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
