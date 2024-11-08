import React from 'react'
import { useNavigate } from "@remix-run/react";
import './style.css'

const GoBack = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back one step in history
    };
  return (
    <button
        className="back-button"
        onClick={goBack}
      >
        ← Back
      </button>
  )
}

export default GoBack