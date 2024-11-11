import React, {  useState } from 'react'
import Plan from '../components/templates/Plan'
import planPricingData from '../data/planPricingData.json'



const Plans = () => {
  const [planData, setPlanData] = useState([...planPricingData.plans]);
 

  return (
      <Plan planData={planData}/>
  )
}

export default Plans