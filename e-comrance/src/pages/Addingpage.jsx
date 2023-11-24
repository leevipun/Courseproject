import { useState } from "react";
import Navbar from "./../components/navbar";
import "../styles/AddingPage.css";
import { UploadOutlined } from "@ant-design/icons";
import { Space, Select, Input, Button, Upload, message } from "antd";
const { TextArea } = Input;
import currencyOptions from "../../Data/currencyData.js";
import CountriesData from "./../../Data/countryData";
import { Adding } from "../services/Services.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appendlisting } from "../../reducer/listingReducer.js";
import { v4 as uuidv4 } from "uuid";

const props = {
  beforeUpload: (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

const AddingPage = () => {
  const countryData = CountriesData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("Select country");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("EUR");

  const [selectedFile, setSelectedFile] = useState([]);
  const [description, setDescription] = useState("");

  const id = uuidv4();

  const onAdding = async () => {
    console.log(selectedCountry, price, currencyCode);
    try {
      console.log("Mentiin tänne");
      navigate("/");
      const response = await Adding(
        name,
        selectedCountry,
        price,
        currencyCode,
        description,
        selectedFile,
        id
      );
      dispatch(appendlisting(response));
      console.log("Navigoidaan");
    } catch (error) {
      console.error("Adding failed", error.message);
    }
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
            <h2>Pictures: </h2>
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
        <form onSubmit={onAdding}>
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div id="ainputdiv">
            <Upload {...props}>
              <Button style={{ margin: 10 }} icon={<UploadOutlined />}>
                Upload png only
              </Button>
            </Upload>
          </div>
          <div id="ainputdiv">
            <Button type="primary" style={{ margin: 10 }} htmlType="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddingPage;
