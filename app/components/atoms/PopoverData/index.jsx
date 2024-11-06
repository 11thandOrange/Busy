import React from 'react'

const PopoverData = ({header, description}) => {
  return (
    <div><div style={{fontWeight: 'bold'}}>{header}</div><div>{description}</div></div>
  )
}

export default PopoverData