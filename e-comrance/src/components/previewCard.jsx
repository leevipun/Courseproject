import React from "react";

const PreviewCard = ({
  selectedCountry,
  selectedFile,
  price,
  name,
  description,
}) => {
  return (
    <div id="divContainer">
      <div id="Prev">
        <div>
          <img
            src={selectedFile || "https://via.placeholder.com/500"}
            alt="previewPic"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
          <div>
            <div style={{ margin: 5 }}>Name: {name}</div>
            <div style={{ margin: 5 }}>Country: {selectedCountry}</div>
            <div style={{ margin: 5 }}>Price: {price} EUR</div>
            <div style={{ margin: 5 }}>Description: {description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
