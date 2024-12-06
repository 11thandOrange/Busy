import React from "react";
import ActiveButton from "../ActiveButton";
import TooltipHOC from "../TooltipHOC";
import IMAGES from "../../../utils/Images";
import "./style.css";
import { useNavigate } from "@remix-run/react";
import ImageRenderer from "../ImageRenderer";
const SingleWidget = ({ widget, handleAddToFavorite = () => {} }) => {
  const navigate = useNavigate();
  return (
    <div className="card" key={widget.id}>
      <ImageRenderer src={widget.image} alt="Product Review" />
      <div className="card-btn">
        {/* <ActiveButton
          afterActivateString="Activate Widget"
          deactivateString="Deactivate Widget"
          temp={false}
        /> */}
      </div>
      <div className="content-wrapper">
        <h3>{widget.name}</h3>
        <h4>{widget.description_title}</h4>
        <p>{widget.description_content}</p>
        <div className="buttons">
          <button
            className="customize-btn"
            onClick={() => {
              
              
              navigate(`/apps/${widget.slug}`);
            }}
          >
            Customize
          </button>
          <TooltipHOC
            content={
              widget.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <ImageRenderer
              src={
                widget.isFavorite ? IMAGES.FilledHeartIcon : IMAGES.HeartIcon
              }
              onClick={() => handleAddToFavorite(widget.id)}
            />
          </TooltipHOC>
        </div>
      </div>
    </div>
  );
};

export default SingleWidget;
