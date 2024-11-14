import React from "react";
import "../../templates/Plan/style.css";
import { Link } from "@remix-run/react";


const PlanCard = ({ plan }) => {

  return (
    <div className="planboxes">
      <div className="plan-card" style={{ backgroundColor: `${plan.color}` }}>
        <div className="plan-content">
          <div className="upper-wrapper">
            <h2>{plan.title}</h2>
            <div>
              <p className="price">
                <sup>$</sup>{plan.price} <span className="price-per-month">/Month</span>
              </p>
              <p className="description">{plan.description}</p>
            </div>
            <Link to={plan.url}>
              {plan.buttonText}
            </Link>

          </div>  
          <div className="card-footer">
            <div className="feature-content">
              <p className="title">Features</p>
              <div className="list-wrap">
                <label># of Apps Enabled</label>
                <span className="value">{plan.features.appsEnabled}</span>
              </div>
              <div className="features">
                {plan.features.otherFeatures.map(item => <p>{item}</p>)}
              </div>
            </div>
          </div>
    </div>
  </div>
</div>
  );
};

export default PlanCard;
