import Navbar from "../components/navbar.jsx";
import React from "react";

const Contactpage = () => {
  const sectionStyle = {
    backgroundColor: "#f8f8f8",
    padding: "50px 0",
    display: "flex",
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  };

  const headingStyle = {
    color: "#333",
  };

  const paragraphStyle = {
    marginBottom: "20px",
    lineHeight: "1.6",
    color: "#777",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    background: "#28a745", // or your brand color
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <Navbar />
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={headingStyle}>Contact Us</h2>
          <p style={paragraphStyle}>
            Have questions or suggestions? Reach out to us! We'd love to hear
            from you.
          </p>
          <form style={formStyle}>
            <input type="text" placeholder="Your Name" style={inputStyle} />
            <input type="email" placeholder="Your Email" style={inputStyle} />
            <textarea placeholder="Your Message" style={inputStyle}></textarea>
            <button type="submit" style={buttonStyle}>
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contactpage;
