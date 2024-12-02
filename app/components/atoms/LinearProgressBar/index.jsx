import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const LinearProgressBar = ({ progress, color }) => {
  console.log("progress value", progress);

  const normalizedProgress = Math.max(0, Math.min(progress, 100));

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{
          width: `${normalizedProgress}%`, // Convert progress to percentage
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};

LinearProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // Progress percentage (0-100)
  color: PropTypes.string, // Color of the progress bar
};

LinearProgressBar.defaultProps = {
  color: "#007BFF", // Default color (blue)
};

export default LinearProgressBar;
