import React from "react";

const ImageViewer = ({ url, close }) => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <img src={url} alt="image" />
    </div>
  );
};

export default ImageViewer;
