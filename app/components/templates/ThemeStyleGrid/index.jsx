import React, { useEffect, useState } from "react";
import "./style.css"; // Import the CSS file
import { Text } from "@shopify/polaris";
import { ThemeStyleGridType } from "../../../constants/announcementCustomizationConfig";

function ThemeStyleGrid({ onThemeSelected = () => {}, selectedTheme = 1 }) {
  const [selectedIndex, setSelectedIndex] = useState(selectedTheme);
  useEffect(() => {
    setSelectedIndex(selectedTheme);
  }, [selectedTheme]);

  const gridData = [
    {
      id: 1,
      name: "Solid Colors",
      image:
        "https://www.solidbackgrounds.com/images/7680x4320/7680x4320-pastel-red-solid-color-background.jpg",
      type: ThemeStyleGridType.COLOR,
    },
    {
      id: 2,
      name: "Shapes",
      image: "https://appsolve.io/asset/apps/vitals/img/smart_bar/shapes.png",
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 3,
      name: "Blue Shapes",
      image:
        "https://appsolve.io/asset/apps/vitals/img/smart_bar/blue-shapes.png",
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 4,
      name: "Abstract ",
      image: "https://appsolve.io/asset/apps/vitals/img/smart_bar/abstract.svg",
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 5,
      name: "Winter",
      image:
        "https://appsolve.io/asset/apps/vitals/img/smart_bar/winter-mobile.svg",
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 6,
      name: "Valentines Day",
      image:
        "https://appsolve.io/asset/apps/vitals/img/smart_bar/valentine-mobile.svg",
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 7,
      name: "Hot Discount",
      image:
        "https://appsolve.io/asset/apps/vitals/img/smart_bar/hot-discounts-mobile.svg",
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 8,
      name: "Halloween",
      image:
        "https://appsolve.io/asset/apps/vitals/img/smart_bar/halloween-mobile.svg",
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
