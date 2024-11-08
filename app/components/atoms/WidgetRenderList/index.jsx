import React from 'react'
import './style.css'
import IMAGES from '../../../utils/Images'
import ActiveButton from '../ActiveButton'

const WidgetRenderList = ({selectedApps}) => {
  console.log(selectedApps, "test")
  return (
    <div class="cards-container">
        {selectedApps.map(widget => {
            return (<div class="card">
                <img src={widget.image} alt="Product Review"/>
                <ActiveButton afterActivateString='Activate Widget' deactivateString='Deactivate Widget'/>
                <h3>{widget.name}</h3>
                <p>{widget.description}</p>
                <div class="buttons">
                    <button class="customize-btn">Customize</button>
                    <img src={widget.isFavorite ? IMAGES.FilledHeartIcon : IMAGES.HeartIcon}/>
                </div>
            </div>)
        })}
    </div>
  )
}

export default WidgetRenderList