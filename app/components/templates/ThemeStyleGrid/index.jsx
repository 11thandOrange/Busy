import React, { useState } from "react";
import './style.css'; // Import the CSS file
import { Text } from "@shopify/polaris";

function ThemeStyleGrid() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const gridData = [
    { id: 1, name: "Child 1", image: "https://placehold.co/200" },
    { id: 2, name: "Child 2", image: "https://placehold.co/200" },
    { id: 3, name: "Child 3", image: "https://placehold.co/200" },
    { id: 4, name: "Child 4", image: "https://placehold.co/200" },
    { id: 5, name: "Child 5", image: "https://placehold.co/200" },
    { id: 6, name: "Child 6", image: "https://placehold.co/200" },
    { id: 7, name: "Child 7", image: "https://placehold.co/200" },
    { id: 8, name: "Child 8", image: "https://placehold.co/200" },
    { id: 9, name: "Child 9", image: "https://placehold.co/200" },
    { id: 10, name: "Child 10", image: "https://placehold.co/200" },
    { id: 11, name: "Child 11", image: "https://placehold.co/200" },
    { id: 12, name: "Child 12", image: "https://placehold.co/200" },
  ];

  const handleItemClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index); // Toggle selection
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
          className={`grid-item ${selectedIndex === index ? "selected" : ""}`}
          onClick={() => handleItemClick(index)}
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
