import { useState } from "react";
import Navbar from "./../components/navbar";
import CountriesData from "../../Data/countryData.js";
import "../styles/AddingPage.css";

const AddingPage = () => {
  const countryData = CountriesData;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    const input = event.target.value;
    if (input.length <= 1000) {
      setDescription(input);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const remainingCharacters = 1000 - description.length;

  return (
    <div>
      <div>
        <Navbar />
        <h1 id="ah1">Add a new item</h1>
      </div>
      <div id="divContainer" className="flex-container">
        <div id="previewContainer">
          <p>Preview</p>
          <div>
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
            <h3>Country: {selectedCountry}</h3>
            <p>{`Price: ${price}`}</p>
            <p>Description: {description}</p>
          </div>
        </div>
        <div id="editingOptionsContainer">
          <div>
            <input id="addinginput" type="text" placeholder="Name of listing" />
          </div>
          <div id="ainputdiv">
            <select
              id="addinginput"
              name="cities"
              value={selectedCountry}
              onChange={handleSelectChange}
            >
              <option value="">Select a country</option>
              {countryData.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name} - {country.code}
                </option>
              ))}
            </select>
          </div>
          <div id="ainputdiv">
            <input
              id="addinginput"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div id="ainputdiv">
            <input
              id="addinginput"
              type="text"
              placeholder="Description"
              maxLength={1000}
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div id="ainputdiv">
            <p>{remainingCharacters} characters remaining</p>
          </div>
          <div id="ainputdiv">
            <input id="addinginput" type="file" onChange={handleFileChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingPage;
