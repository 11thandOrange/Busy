import React, { useEffect, useState } from "react";
import "./style.css"; // Import the CSS file
import { Text } from "@shopify/polaris";
import { ThemeStyleGridType } from "../../../constants/announcementCustomizationConfig";

function ThemeStyleGrid({ onThemeSelected = () => {}, selectedTheme }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  useEffect(() => {
    setSelectedIndex(selectedTheme);
  }, [selectedTheme]);
  const gridData = [
    {
      id: 1,
      name: "Solid Colors",
      image: "https://placehold.co/200",
      type: ThemeStyleGridType.COLOR,
    },
    {
      id: 2,
      name: "Theme1",
      image:
        "https://plus.unsplash.com/premium_photo-1687203673190-d39c3719123a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVsbG98ZW58MHx8MHx8fDA%3D",
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 3,
      name: "Theme2",
      image: "https://placehold.co/200x200",
      type: ThemeStyleGridType.IMAGE,
    },
  ];

  const handleItemClick = (index, type, image) => {
    setSelectedIndex(index === selectedIndex ? null : index); // Toggle selection
    onThemeSelected(index, type, image);
  };

  return (
    <div>
      <div className="theme-style-header">
        <Text variant="bodyMd" fontWeight="bold" as="span">
          Theme Style
        </Text>
      </div>
      <div className="grid-container">
        {gridData.map((item, index) => (
          <div
            key={item.id}
            className={`grid-item ${selectedIndex === item.id ? "selected" : ""}`}
            onClick={() => handleItemClick(item.id, item.type, item.image)}
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
