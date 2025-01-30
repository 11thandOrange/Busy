import React, { useState } from "react";
import "./style.css";

const IncDecCounter = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="counter-container">
      <button
        className="counter-button"
        onClick={decrement}
        disabled={count === 1}
      >
        -
      </button>
      <span className="counter-display">{count}</span>
      <button className="counter-button" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default IncDecCounter;
