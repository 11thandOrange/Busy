import React, { useCallback } from "react";
import "./style.css"; 
const StepsRenderer = ({ tabs = [], selected = 0, setSelected = () => {} }) => {
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [setSelected],
  );

  return (
    <div className="app-tabs">
      <div className="tabs-container">
        <div className="tabs-header">
          {tabs.map((tab, index) => (
            <button
              key={tab.id || index}
              className={`tab-button ${selected === index ? "active" : ""}`}
              onClick={() => handleTabChange(index)}
            >
              <div className="tab-content">
                  <div className="tab-circle">
                    {/* {selected === index ? index + 1 : "✔"} */}
                    {index + 1}
                  </div>
                <div className="tab-details">
                  <div className="tab-title">{tab.title}</div>
                  <div className="tab-description">{tab.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepsRenderer;
