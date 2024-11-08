import React from "react";
import "./style.css"; // Updated CSS will go here
import planData from "../../../data/planPricingData.json"; // Adjust the path as needed
import PlanCard from "../../atoms/PlanCard";


const Plan = () => {
  return (
    <div className="plan-container">
      <button
        className="back-button"
        onClick={() => console.log("Go back called")}
      >
        ← Back
      </button>
      <h1 className="plan-heading">Choose Your Plan</h1>
      <div className="plan-section">
        {planData.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plan;
