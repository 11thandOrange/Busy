import React, { useEffect, useState } from 'react'
import Plan from '../components/templates/Plan'
import planPricingData from '../data/planPricingData.json'
import { authenticate } from '../shopify.server';
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

const Plans = () => {
  const subscription = useLoaderData();
  const [planData, setPlanData] = useState([...planPricingData.plans]);
  useEffect(() => {
    const updatePlan = planData.map((plan)=>{
      if(plan.title==subscription.appSubscriptions.name)
      {
        return { ...plan, buttonText: 'Cancel Subscription', url:'/app/cancel' }
      }
    })
    setPlanData([updatePlan])
    
  }, []);

  return (
      <Plan planData={planData}/>
  )
}

export default Plans