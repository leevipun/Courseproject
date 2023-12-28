import Navbar from "./../components/navbar.jsx";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Aboutpage = () => {
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

  const introStyle = {
    fontSize: "1.2em",
    color: "#555",
  };

  const paragraphStyle = {
    marginBottom: "20px",
    lineHeight: "1.6",
    color: "#777",
  };

  const closingStyle = {
    fontWeight: "bold",
    color: "#28a745", // or your brand color
  };

  return (
    <div>
      <Navbar />
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={headingStyle}>About Nordic Exchange</h2>
          <p style={introStyle} className="intro">
            Welcome to Nordic Exchange, your gateway to a sustainable future! We
            are more than just a C2C marketplace; we are on a mission to
            revolutionize material usage and promote a greener, more sustainable
            world.
          </p>
          <p style={paragraphStyle}>
            At Nordic Exchange, we believe in the power of conscious
            consumerism. Our platform connects individuals and businesses in a
            unique C2C model, fostering a circular economy where materials are
            reused, recycled, and repurposed to reduce waste and environmental
            impact.
          </p>
          <p style={paragraphStyle}>
            What sets us apart is our unwavering commitment to sustainability.
            Every transaction on Nordic Exchange contributes to our vision of a
            world where resources are used responsibly, and waste is minimized.
            By choosing Nordic Exchange, you are not just buying or selling; you
            are participating in a movement towards a more sustainable future.
          </p>
          <p style={paragraphStyle}>
            Join us in building a community that values not only the products
            exchanged but also the impact those transactions have on the
            environment. Together, let's create a marketplace that goes beyond
            commerce – a marketplace that embodies responsibility, innovation,
            and a shared commitment to a better world.
          </p>
          <p style={closingStyle} className="closing">
            Nordic Exchange - Empowering Sustainable Material Usage, One
            Transaction at a Time.
          </p>
        </div>
      </section>
      <SpeedInsights />
    </div>
  );
};

export default Aboutpage;
