import React from 'react'
import Plan from '../components/templates/Plan'

const Plans = () => {
  const subscription = useLoaderData();
  const [planData, setPlanData] = useState([...planPricingData.plans]);
  useEffect(() => {
    if(subscription.appSubscriptions.status=='ACTIVE')
    { 
      const updatePlan = planData.map((plan)=>{
        if(plan.title === subscription.appSubscriptions.name)
        {
          console.log('new')
          return { ...plan, buttonText: 'Cancel Subscription', url:'/app/cancel' }
        }
        return plan
      })
      setPlanData([updatePlan])
    }
 
    
  }, [subscription, planData]);

  return (
      <Plan/>
  )
}

export default Plans