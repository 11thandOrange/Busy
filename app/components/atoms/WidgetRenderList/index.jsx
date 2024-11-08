import React from 'react'
import './style.css'
import IMAGES from '../../../utils/Images'

const WidgetRenderList = ({selectedApps}) => {
  console.log(selectedApps, "test")
  return (
    <div class="cards-container">
        {selectedApps.map(widget => {
            return (<div class="card">
                <img src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=" alt="Product Review"/>
              <button className='card-btn active'>Active</button>
              <div className="content-wrapper">
                  <h3>Product Reviews</h3>
                  <p>Increase trust by showcasing reviews on product pages using eye-catching grid or list layouts.</p>
                  <div class="buttons">
                      <button class="customize-btn">Customize</button>
                      <img src={IMAGES.HeartIcon}/>
                </div>
              </div>
            </div>)
        })}
    </div>
  )
}

export default WidgetRenderList