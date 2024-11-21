import React from 'react'
import ActiveButton from '../ActiveButton'
import TooltipHOC from '../TooltipHOC'
import IMAGES from '../../../utils/Images'
import './style.css'

const SingleWidget = ({widget, handleAddToFavorite = () => {}}) => {
  return (
    <div class="card" key={widget.id}>
        <img src={widget.image} alt="Product Review"/>
        <div className='card-btn'>
            <ActiveButton afterActivateString='Activate Widget' deactivateString='Deactivate Widget'/>
        </div>
        <div className="content-wrapper">
        <h3>{widget.name}</h3>
        <h4>{widget.description_title}</h4>
        <p>{widget.description_content}</p>
        <div class="buttons">
            <button class="customize-btn">Customize</button>
            <TooltipHOC content={widget.isFavorite ? 'Remove from favorites' : 'Add to favorites' }>
                <img src={widget.isFavorite ? IMAGES.FilledHeartIcon : IMAGES.HeartIcon} onClick={() => handleAddToFavorite(widget.id)}/>
            </TooltipHOC>
        </div>
        </div>
    </div>
  )
}

export default SingleWidget