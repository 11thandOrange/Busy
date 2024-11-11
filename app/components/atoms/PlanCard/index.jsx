import React from "react";
import "../../templates/Plan/style.css";
import { Link } from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { authenticate, STARTER_MONTHLY_PLAN, PRO_MONTHLY_PLAN, ENTERPRISE_MONTHLY_PLAN } from '../../../shopify.server';


const PlanCard = ({ plan }) => {
  const subscription = useLoaderData();
  return (
    <div className="planboxes">
      {subscription}
      hi
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
            <Link url={plan.url + '?plan=' + encodeURIComponent(plan.title)}>
              {plan.buttonText}
            </Link>

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