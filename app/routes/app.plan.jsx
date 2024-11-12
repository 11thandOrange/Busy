import React, {  useState, useEffect } from 'react'
import Plan from '../components/templates/Plan'
import planPricingData from '../data/planPricingData.json'
import { useLoaderData } from '@remix-run/react'
import { authenticate } from '../shopify.server'
import { cors } from 'remix-utils/cors';



export const loader = async ({ request }) => {
  try {
    const { billing } = await authenticate.admin(request);  // Authenticate and get the billing object.
    
    const billingInfo = await billing.check();  // Get billing details.
    
    if (billingInfo && billingInfo.appSubscriptions && billingInfo.appSubscriptions.length > 0) {
      const planName = billingInfo.appSubscriptions[0].name;
      return cors(request, {plan:planName})
    } 
    else 
    {
      return cors(request, {plan:''})
    }
  } 
  catch (error) {
    return cors(request, {plan:''});
  }
  
  
};

const Plans = () => {
  const subscription = useLoaderData();
  const [planData, setPlanData] = useState([...planPricingData.plans]);
  useEffect(()=>{
    if (subscription && subscription?.plan) {
      setPlanData(prevPlanData => {
        console.log(prevPlanData)
        const updatedPlans = prevPlanData.map(plan => {
          if (plan.title === subscription.plan) {
            return { ...plan, buttonText: 'Cancel Subscription', url:'/app/cancel' };
          }
          return plan;
        });
  
        return updatedPlans;
      });
    }
  },[])

  return (
      <Plan planData={planData}/>
  )
}

export default Plans