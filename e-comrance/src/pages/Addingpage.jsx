import { useState } from "react";
import Navbar from "./../components/navbar";
import CountriesData from "../../Data/countryData.js";
import "../styles/AddingPage.css";
import { Space, Select, Input } from "antd";
const { TextArea } = Input;
import currencyOptions from "../../Data/currencyData.js";

const AddingPage = () => {
  const countryData = CountriesData;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const [selectedFile, setSelectedFile] = useState([]);
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFile((prevFiles) => [...prevFiles, ...files]);
    console.log(files);
  };

  const handleSelectChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const onChange = (e) => {
    console.log("Change:", e.target.value);
    setDescription(e.target.value);
  };

  return (
    <div>
      <div>
        <Navbar />
        <h1 id="ah1">Add a new item</h1>
      </div>
      <div id="divContainer" className="flex-container">
        <div id="previewContainer">
          <p>Preview</p>
          {selectedFile.map((file, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Uploaded Preview ${index}`}
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          ))}

          <h2>Name of a listing: {name}</h2>
          <h3>Country: {selectedCountry}</h3>
          <p>{`Price: ${price}`}</p>
          <p>Description: {description}</p>
        </div>
      </div>
      <div id="editingOptionsContainer">
        <div id="ainputdiv">
          <input
            id="addinginput"
            type="text"
            placeholder="Name of listing"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <div id="ainputdiv" style={{ margin: 10 }}>
          <Space.Compact>
            <Select defaultValue="EUR" options={currencyOptions} />
            <Input
              defaultValue="300"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Space.Compact>
        </div>
        <div id="ainputdiv">
          <TextArea
            showCount
            style={{ width: 350, margin: 10 }}
            maxLength={300}
            onChange={onChange}
            placeholder="Description"
          />
        </div>
        <div id="ainputdiv">
          <input
            id="addinginput"
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </div>
      </div>
    </div>
  );
};

export default AddingPage;
