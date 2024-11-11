import React, { useEffect, useState } from 'react'
import "./style.css";
import PlanCard from "../../atoms/PlanCard";
import GoBack from "../../atoms/GoBack";
import planPricingData from '../../../data/planPricingData.json'
import { authenticate } from '../../../shopify.server';
import { cors } from 'remix-utils/cors';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.check();
  const activeSubscription = billingCheck.appSubscriptions.find(sub => sub.status === 'ACTIVE');
  const hasActivePayment = billingCheck.hasActivePayment
    if (activeSubscription) {
      return cors(request, {
        hasActivePayment,
        appSubscriptions: activeSubscription || null,  
      });
    } else {
      return cors(request, {
        hasActivePayment,
        appSubscriptions: activeSubscription || null,
      });
    }
};

const Plan = () => {
  const subscription = useLoaderData();
  const [planData, setPlanData] = useState([...planPricingData.plans]);
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