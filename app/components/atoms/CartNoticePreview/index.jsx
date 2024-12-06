import React from "react";
import "./style.css";
import ProductPreviewCard from "../../templates/ProductPreviewCard";
import ImageRenderer from "../ImageRenderer";
import IMAGES from "../../../utils/Images";
import { COLOR_THEME } from "../../../constants/announcementCustomizationConfig";
const CartNoticePreview = ({ cartNoticeCustomization }) => {
  return (
    
  
    <div className="product-preview-card-container">
    <div
      className="product-preview-card"
      style={{
        backgroundColor: COLOR_THEME.LIGHT,
      }}
    >
      {/* Dummy URL bar */}
      <div className="url-bar">example.com/product-page</div>
      <div className="emoji-previewout">
     <div
      className="emoji-previewbx"
      style={{
        backgroundColor: cartNoticeCustomization.backgroundColor,
        color: cartNoticeCustomization.textColor,
        marginTop:
          cartNoticeCustomization.marginTop +
          cartNoticeCustomization.marginTopUnit,
        marginBottom:
          cartNoticeCustomization.marginBottom +
          cartNoticeCustomization.marginBottomUnit,
      }}
    >
      {cartNoticeCustomization.addAnEmoji && (
        <div className="cart-emoji">{cartNoticeCustomization.emojiToAdd}</div>
      )}
      <div className="text-container">
        <p className="primary-text">{cartNoticeCustomization.primaryText}</p>
        <p className="secondary-text">
          {cartNoticeCustomization.secondaryText}
        </p>
      </div>
    </div>
    </div>
      {/* Title Text */}
      {/* <div className="title-text"> {settingsState.generalSettings.message } </div> */}
      {/* Product Image */}
      <div className="product-image-container">
        <ImageRenderer
          src={IMAGES.shoeDiscount}
          alt={"Product"}
          styleClass="product-image"
        />
      </div>

      {/* Product Title, Price, and Quantity */}
      <div className="product-info">
        <h2 className="product-title">Product title</h2>
        <p className="product-price">
          <span className="old-price">300 $USD</span>
          <span className="current-price">200 $USD</span>
        </p>
        {/* Quantity Selector */}
        <div className="quantity-container">
          <input
            type="number"
            value={2}
            onChange={()=>{}}
            className="quantity-input"
            min="0"
          />
        </div>
      </div>
    
      {/* Add to Cart Button */}
      <div className="add-to-cart-container">
        <button className="add-to-cart-button">Add to cart</button>
      </div>

     

      {/* Product Description */}
      <div className="product-description">
        <h3>Product description</h3>
        <p>
          Here you’ll go into more depth about your product. Outline its key
          features, what sets it apart from other products in the market, its
          size and weight if applicable, and any other important details
          customers need to know.
        </p>
        <ul>
          <li>
            <strong>Material:</strong> What is the product made of?
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default CartNoticePreview;
