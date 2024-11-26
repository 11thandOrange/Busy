import React from 'react'
import "./style.css"

const ClassicTimer = ({ days, hours, minutes, seconds, settingsState }) => {
  return (
    <div>
        <span style={{ color: settingsState.display.digitsColor }}>
            {`${days} days ${hours}:${minutes}:${seconds}`}
        </span>
    </div>
  )
}

export default ClassicTimer