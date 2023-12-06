import { useState } from "react";
import Navbar from "./../components/navbar";
import "../styles/AddingPage.css";
import { Select, Input, Button } from "antd";
const { TextArea } = Input;
import CountriesData from "./../../Data/countryData";
import { Adding } from "../services/Services.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appendlisting } from "../../reducer/listingReducer.js";
import { v4 as uuidv4 } from "uuid";
import { addNotification } from "../../reducer/notificationReducer.js";
import categoriesWithOptions from "../../Data/categoryData.js";

const AddingPage = () => {
  const countryData = CountriesData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("Select country");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const currencyCode = "EUR";

  const [selectedFile, setSelectedFile] = useState([]);
  const [description, setDescription] = useState("");

  const id = uuidv4();

  const handleAdding = async () => {
    try {
      const response = await Adding(
        name,
        selectedCountry,
        price,
        currencyCode,
        category,
        description,
        selectedFile,
        id
      );

      if (response.error) {
        console.error("Adding failed", response.error);
        dispatch(addNotification(response.error));
      } else {
        navigate("/");
        dispatch(appendlisting(response));
        console.log(response);
        dispatch(addNotification(response.name, "was listed"));
        console.log("Navigoidaan");
      }
    } catch (error) {
      console.error("Adding failed", error.message);
      dispatch(addNotification(error.message));
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFile(Array.from(files));
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <div>
        <Navbar />
        <h1 id="ah1">Add a new item</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div id="divContainer">
          <div id="Prev">
            <div>
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                alt="previewPic"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
              <div>
                <div style={{ margin: 5 }}>Name: {name}</div>
                <div style={{ margin: 5 }}>Country: {selectedCountry}</div>
                <div style={{ margin: 5 }}>
                  Price: {price} {currencyCode}
                </div>
                <div style={{ margin: 5 }}>Description: {description}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="InputDiv">
          <div id="ainputdiv">
            <Input
              type="text"
              placeholder="Name of listing"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div id="ainputdiv">
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
          <div id="ainputdiv">
            <Input
              addonBefore="EUR"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div id="ainputdiv">
            <Select
              style={{ width: 200 }}
              value={category}
              options={categoriesWithOptions}
              onChange={(value) => setCategory(value)}
            ></Select>
          </div>
          <div id="ainputdiv">
            <TextArea
              style={{ width: 300 }}
              showCount
              maxLength={300}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div id="ainputdiv">
            <Input type="file" multiple onChange={handleFileChange} />
          </div>
          <div id="ainputdiv">
            <Button type="primary" onClick={handleAdding}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingPage;
