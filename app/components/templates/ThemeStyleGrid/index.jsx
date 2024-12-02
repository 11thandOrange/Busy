import React, { useEffect, useState } from "react";
import "./style.css"; // Import the CSS file
import { Text } from "@shopify/polaris";
import { ThemeStyleGridType } from "../../../constants/announcementCustomizationConfig";
import ImageRenderer from "../../atoms/ImageRenderer";
import IMAGES from "../../../utils/Images";

function ThemeStyleGrid({ onThemeSelected = () => {}, selectedTheme = 1 }) {
  const [selectedIndex, setSelectedIndex] = useState(selectedTheme);
  useEffect(() => {
    setSelectedIndex(selectedTheme);
  }, [selectedTheme]);

  const gridData = [
    {
      id: 1,
      name: "Solid Color",
      image:
        "https://www.solidbackgrounds.com/images/7680x4320/7680x4320-pastel-red-solid-color-background.jpg",
      type: ThemeStyleGridType.COLOR,
    },
    {
      id: 2,
      name: "Abstract",
      image: IMAGES.Abstract,
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 3,
      name: "Christmas",
      image: IMAGES.Christmas,
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 4,
      name: "Circles",
      image: IMAGES.Circles,
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 5,
      name: "Holidays",
      image: IMAGES.Holidays,
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 6,
      name: "Squares",
      image: IMAGES.Squares,
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 7,
      name: "Sunshine",
      image: IMAGES.Sunshine,
      type: ThemeStyleGridType.IMAGE,
    },
    {
      id: 8,
      name: "Watercolor",
      image: IMAGES.Watercolor,
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

            <ImageRenderer src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeStyleGrid;
