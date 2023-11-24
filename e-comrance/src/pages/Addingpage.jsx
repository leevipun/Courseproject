import { useState } from "react";
import Navbar from "./../components/navbar";
import "../styles/AddingPage.css";
import { UploadOutlined } from "@ant-design/icons";
import { Space, Select, Input, Button, Upload } from "antd";
const { TextArea } = Input;
import currencyOptions from "../../Data/currencyData.js";
import CountriesData from "./../../Data/countryData";

const AddingPage = () => {
  const countryData = CountriesData;
  const [selectedCountry, setSelectedCountry] = useState("Select country");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("");

  const [selectedFile, setSelectedFile] = useState([]);
  const [description, setDescription] = useState("");

  const onChange = (e) => {
    console.log("Change:", e.target.value);
    setDescription(e.target.value);
  };

  const handlePreview = () => {
    setShowPreview((prevValue) => !prevValue);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <div>
        <Navbar />
        <h1 id="ah1">Add a new item</h1>
        <Button type="primary" id="prevButton" onClick={handlePreview}>
          Preview
        </Button>
      </div>
      <div id="divContainer" className="flex-container">
        {showPreview && (
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
        )}
      </div>
      <div id="editingOptionsContainer">
        <div id="ainputdiv">
          <Input
            style={{ width: 350, margin: 10 }}
            id="addinginput"
            type="text"
            placeholder="Name of listing"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div id="ainputdiv" style={{ margin: 10 }}>
          <Select
            style={{ width: 200 }}
            showSearch
            defaultValue="Finaland"
            value={selectedCountry}
            filterOption={filterOption}
            onChange={(value) => setSelectedCountry(value)}
            options={countryData}
          ></Select>
        </div>
        <div id="ainputdiv" style={{ margin: 10 }}>
          <Space.Compact>
            <Select
              defaultValue="EUR"
              options={currencyOptions}
              onChange={(value) => setCurrencyCode(value)}
            />
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
          <Upload>
            <Button style={{ margin: 10 }} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default AddingPage;
