import React from 'react'
import './style.css'
import SingleWidget from '../SingleWidget'

const WidgetRenderList = ({selectedApps, handleAddToFavorite}) => {
  return (
    <div className="cards-container">
        {selectedApps.map(widget => {
            return <SingleWidget widget={widget} handleAddToFavorite={handleAddToFavorite}/>
        })}
    </div>
  )
}

export default WidgetRenderList