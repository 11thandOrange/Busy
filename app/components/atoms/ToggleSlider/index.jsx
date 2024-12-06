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
      <span className="label">
        {isLoading ? "Loading..." : isActive ? "Active" : "Inactive"}
      </span>
      <div className="slider">
        {isLoading ? <div className="loader"></div> : null}
      </div>
    </div>
  );
}
