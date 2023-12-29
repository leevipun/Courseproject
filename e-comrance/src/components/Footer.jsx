import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#003366",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
    backgroundImage: "linear-gradient(90deg, #003366 0%, #336699 100%)",
    zIndex: 1000,
    height: "80px",
    marginTop: "auto", // Add this to push the footer to the bottom
  };

  const contentStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "20px",
  };

  return (
    <div
      className="App"
      style={{ minHeight: "33vh", display: "flex", flexDirection: "column" }}
    >
      <main style={{ flex: 1 }}>{/* Your main content goes here */}</main>

      <footer style={footerStyle}>
        <div style={contentStyle}>
          <p style={{ margin: 5 }}>Created by: Nordic Exchange</p>
          <p style={{ margin: 5 }}>
            &copy; 2023 Nordic Exchange. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
