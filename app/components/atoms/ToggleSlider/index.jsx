import React from "react";
import "./style.css";

export default function ToggleSlider({ isActive, onClick, isLoading }) {
  return (
    <div
      className={`toggle-slider ${isActive ? "active" : "inactive"} ${
        isLoading ? "loading" : ""
      }`}
      onClick={!isLoading ? onClick : undefined}
    >
      <span className="label">{isActive ? "Active" : "Inactive"}</span>
      <div className="slider"></div>
    </div>
  );
}
