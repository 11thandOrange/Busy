import React from "react";
import { useNavigate } from "@remix-run/react";
import "./style.css";

const GoBack = ({ heading = "Back", backLink = -1 }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(backLink); // Go back one step in history
  };
  return (
    <button className="back-button" onClick={goBack}>
      <span>←</span> {heading}
    </button>
  );
};

export default GoBack;
