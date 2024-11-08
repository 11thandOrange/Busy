import React, { useState } from "react";
import './style.css'; // Import the CSS file
import { Text } from "@shopify/polaris";

function ThemeStyleGrid({onThemeSelected=()=>{}}) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const gridData = [
    { id: 1, name: "Child 1", image: "https://placehold.co/200" },
    { id: 2, name: "Child 2", image: "https://placehold.co/200" },
    { id: 3, name: "Child 3", image: "https://placehold.co/200" },
   
  ];

  const handleItemClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index); // Toggle selection
    onThemeSelected(index)
  };

  return (
    <div>
            <div className='theme-style-header'>
                <Text variant="bodyMd" fontWeight="bold" as="span">Theme Style</Text>
            </div>
    <div className="grid-container">
      {gridData.map((item, index) => (
        <div
          key={item.id}
          className={`grid-item ${selectedIndex === item.id ? "selected" : ""}`}
          onClick={() => handleItemClick(item.id)}
        >
          <p>{item.name}</p>
          <img src={item.image} alt={item.name} />
        </div>
      ))}
    </div>
    </div>
  );
}

export default ThemeStyleGrid;
