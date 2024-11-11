import React from "react";
import "./style.css";
import planPricingData from "../../../data/planPricingData.json";
import PlanCard from "../../atoms/PlanCard";
import GoBack from "../../atoms/GoBack";

const Plan = () => {
  const [planData, setPlanData] = useState([...planPricingData.plans]);
  return (
    <div className="plan-container">
      <GoBack/>
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