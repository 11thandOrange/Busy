import React from 'react'
import './style.css'
import IMAGES from '../../../utils/Images'
import ActiveButton from '../ActiveButton'

const WidgetRenderList = ({selectedApps, handleAddToFavorite}) => {
  console.log(selectedApps, "test")
  return (
    <div class="cards-container">
        {selectedApps.map(widget => {
            return (<div class="card" key={widget.id}>
              <img src={widget.image} alt="Product Review"/>
              <div className='card-btn'>
                <ActiveButton afterActivateString='Activate Widget' deactivateString='Deactivate Widget'/>
              </div>
              <div className="content-wrapper">
              <h3>{widget.name}</h3>
              <p>{widget.description}</p>
                  <div class="buttons">
                      <button class="customize-btn">Customize</button>
                      <img src={widget.isFavorite ? IMAGES.FilledHeartIcon : IMAGES.HeartIcon} onClick={() => handleAddToFavorite(widget.id)}/>
                </div>
              </div>
            </div>)
        })}
    </div>
  )
}

export default WidgetRenderList