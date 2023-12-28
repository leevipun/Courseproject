import Navbar from "../components/navbar.jsx";
import React, { useState } from "react";
import { sendContactEmail } from "../services/Services.js";
import { useDispatch } from "react-redux";
import { addNotification } from "../../reducer/notificationReducer.js";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Contactpage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
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

  const sendContact = (e) => {
    e.preventDefault();
    console.log("send contact");
    sendContactEmail(email, name, message);
    setEmail("");
    setName("");
    setMessage("");
    dispatch(addNotification("Message sent", "success"));
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
          <form style={formStyle} onSubmit={sendContact}>
            <input
              type="text"
              placeholder="Your Name"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Your Message"
              style={inputStyle}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type="submit" style={buttonStyle}>
              Submit
            </button>
          </form>
        </div>
      </section>
      <SpeedInsights />
    </div>
  );
};

export default Contactpage;
