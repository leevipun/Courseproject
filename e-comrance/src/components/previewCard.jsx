import React from "react";

const PreviewCard = ({ props }) => {
  return (
    <div id="divContainer">
      <div id="Prev">
        <div>
          <img
            src={props.selectedFile || "https://via.placeholder.com/500"}
            alt="previewPic"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
          <div>
            <div style={{ margin: 5 }}>Name: {props.name}</div>
            <div style={{ margin: 5 }}>Country: {props.selectedCountry}</div>
            <div style={{ margin: 5 }}>Category: {props.category}</div>
            <div style={{ margin: 5 }}>Price: {props.price} EUR</div>
            <div style={{ margin: 5 }}>Description: {props.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
