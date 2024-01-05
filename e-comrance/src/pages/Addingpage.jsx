import { useState } from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/AddingStyles.css";
import Spinner from "../components/LoadSpinner.jsx";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useSelector } from "react-redux";
import PreviewCard from "../components/previewCard.jsx";
import AddingPageForm from "../components/addingPageForm.jsx";

const AddingPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("Select country");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const currencyCode = "EUR";

  const [selectedFile, setSelectedFile] = useState("");
  const [description, setDescription] = useState("");

  const AddinpageProps = {
    name,
    category,
    price,
    description,
    selectedCountry,
    selectedFile,
    user,
    currencyCode,
    setName,
    setCategory,
    setPrice,
    setDescription,
    setSelectedFile,
    setSelectedCountry,
  };

  const prevProps = {
    name,
    category,
    price,
    description,
    selectedCountry,
    selectedFile,
  };

  document.title = "Add listing";

  if (user.length === 0) {
    <div>No.</div>;
  }

  return (
    <div className="App">
      <div>
        <Navbar />
        <h1 id="ah1">Add a new item</h1>
      </div>
      <div style={{ display: "flex" }}>
        <PreviewCard props={prevProps} />
        <AddingPageForm setLoading={setLoading} props={AddinpageProps} />
        <Spinner loading={loading} spinTip="Adding listing" />
      </div>
      <SpeedInsights />
    </div>
  );
};

export default AddingPage;
