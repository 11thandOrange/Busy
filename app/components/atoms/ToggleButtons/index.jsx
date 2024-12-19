import React, { useState } from "react";
import "./style.css";

const ToggleButtons = ({ buttons = [], onToggle = () => {} }) => {
  const [selected, setSelected] = useState(null);

  const handleToggle = (index) => {
    setSelected(index);
    onToggle(buttons[index]); // Pass the selected button object to onToggle callback
  };

  return (
    <div className="toggle-buttons-container">
      {buttons.map((button, index) => (
        <button
          key={button.id} // Use the button's id as the key
          className={`toggle-button ${selected === index ? "active" : ""}`}
          onClick={() => handleToggle(index)}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtons;