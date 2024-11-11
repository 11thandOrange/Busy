import React, { useEffect } from 'react'
import Plan from '../components/templates/Plan'
import planData from '../data/planPricingData.json'



const Plans = () => {
  const subscription = useLoaderData();
  const [planData, setPlanData] = useState([...planData.plans]);

  useEffect(() => {
    setPlanData([])
  }, [subscription]);

  return (
      <Plan planData={planData}/>
  )
}

export default Plans