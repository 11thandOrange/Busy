import React from "react";
import "./style.css"; // Optional for additional styling

const CircularProgressBar = ({
  progress,
  color,
  size = 80,
  innerStrokeWidth = 4,
  outerStrokeWidth =1,
  progressText = "",
}) => {
  const radius = (size - outerStrokeWidth*10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="circular-progress-bar"
    >
      {/* Background Circle */}
      <circle
        stroke="#000000"
        fill="transparent"
        strokeWidth={outerStrokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress Circle */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={innerStrokeWidth}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          transition: "stroke-dashoffset 0.35s",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
      />
      {/* Percentage Text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20px"
        fill={color}
      >
        {progressText}
        
      </text>
     
    </svg>
  );
};

export default CircularProgressBar;
