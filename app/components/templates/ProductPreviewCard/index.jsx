import React, { useState } from 'react';
import './Style.css'; // Import CSS for styling

// Banner configuration constant
const bannerConfig = {
  text: 'Limited Offer!',
  bgColor: '#f5a623',
  bgImage: '', // You can add a URL to a background image here
  position: 'bottom', // Can be 'top-fixed', 'top-relative', or 'bottom'
};

const ProductPreviewCard = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value)); // Prevent going below 0
    setQuantity(value);
  };

  return (
    <div className="product-preview-card">
      {/* Banner */}
      <div 
        className={`ribbon-banner ${bannerConfig.position}`} 
        style={{ backgroundColor: bannerConfig.bgColor, backgroundImage: `url(${bannerConfig.bgImage})` }}
      >
        {bannerConfig.text}
      </div>

      {/* Dummy URL bar */}
      <div className="url-bar">example.com/product-page</div>

      {/* Product Image */}
      <div className="product-image-container">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Product" 
          className="product-image" 
        />
      </div>

      {/* Product Title, Price, and Quantity */}
      <div className="product-info">
        <h2 className="product-title">Product title</h2>
        <p className="product-price">
          <span className="old-price">300 INR</span>
          <span className="current-price">200 INR</span>
        </p>
        {/* Quantity Selector */}
        <div className="quantity-container">
          <input 
            type="number" 
            value={quantity} 
            onChange={handleQuantityChange} 
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
          Here you’ll go into more depth about your product. Outline its key features, what sets it apart from other products in the market, its size and weight if applicable, and any other important details customers need to know.
        </p>
        <ul>
          <li>
            <strong>Material:</strong> What is the product made of?
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductPreviewCard;
