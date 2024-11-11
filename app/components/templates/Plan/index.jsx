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
  console.log("testing plan page hello")
  useEffect(() => {
    console.log("testing plan page")
    const updatePlan = planData.map((plan)=>{
      if(plan.title==subscription.appSubscriptions.name)
      {
        return { ...plan, buttonText: 'Cancel Subscription', url:'/app/cancel' }
      }
    })
    setPlanData([updatePlan])
    
  }, [subscription]);
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