import React from "react";

const ImageRenderer = ({
  src,
  loading = "lazy",
  alt = "img",
  onClick = () => {},
  styleClass = "",
}) => {
  return (
    <img
      className={styleClass}
      src={src}
      loading={loading}
      alt={alt}
      onClick={onClick}
    />
  );
};

export default ImageRenderer;
