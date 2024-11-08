import React from 'react'
import './style.css'
import IMAGES from '../../../utils/Images'

const WidgetRenderList = ({selectedApps}) => {
  console.log(selectedApps, "test")
  return (
    <div class="cards-container">
        {selectedApps.map(widget => {
            return (<div class="card">
                <img src="https://via.placeholder.com/80" alt="Product Review"/>
                <button>Activate</button>
                <h3>Product Reviews</h3>
                <p>Increase trust by showcasing reviews on product pages using eye-catching grid or list layouts.</p>
                <div class="buttons">
                    <button class="customize-btn">Customize</button>
                    <img src={IMAGES.HeartIcon}/>
                </div>
            </div>)
        })}
    </div>
  )
}

export default WidgetRenderList