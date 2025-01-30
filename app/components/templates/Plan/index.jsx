import React, {useState} from "react";
import "./style.css";
import PlanCard from "../../atoms/PlanCard";
import GoBack from "../../atoms/GoBack";

const Plan = ({planData}) => {
  return (
    <div className="plan-container">
      <GoBack/>
      <h1 className="plan-heading">Choose Your Plan</h1>
      <div className="plan-section">
        {planData.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plan;
