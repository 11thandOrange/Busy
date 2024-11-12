import React from 'react'

const PopoverData = ({header, description,callback, id}) => {
  const handleClick = () => {
    callback(id); 
  };
  
  return (
    <div onClick={handleClick} ><div style={{fontWeight: 'bold'}}>{header}</div><div>{description}</div></div>
  )
}

export default PopoverData