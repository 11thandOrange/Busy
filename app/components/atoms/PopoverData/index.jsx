import React from "react";

const PopoverData = ({ header, description, callback, type }) => {
  const handleClick = () => {
    callback(type);
  };

  return (
    <div onClick={handleClick}>
      <div style={{ fontWeight: "bold" }}>{header}</div>
      <div>{description}</div>
    </div>
  );
};

export default PopoverData;
