import { useState, useEffect } from "react";
import Navbar from "./../components/navbar.jsx";
import "../styles/AddingStyles.css";
import { Select, Input, Button } from "antd";
const { TextArea } = Input;
import CountriesData from "./../../Data/countryData";
import { Adding, getUserData } from "../services/Services.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appendlisting } from "../../reducer/listingReducer.js";
import { v4 as uuidv4 } from "uuid";
import { addNotification } from "../../reducer/notificationReducer.js";
import categoriesWithOptions from "../../Data/categoryData.js";
import Spinner from "../components/LoadSpinner.jsx";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const AddingPage = () => {
  const countryData = CountriesData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("Select country");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("None");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const currencyCode = "EUR";

  const [selectedFile, setSelectedFile] = useState("");
  const [description, setDescription] = useState("");

  const id = uuidv4();

  document.title = "Add listing";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("loggedNoteappUser"));
        const response = await getUserData(user);
        setUser(response);
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          dispatch(
            addNotification(
              "Please login first so we can add your listing to your account and you could get the money from it",
              "error"
            )
          );
        }
      }
    };
    fetchUser();
  }, []);

  const handleAdding = async () => {
    try {
      setLoading(true);
      const newObject = {
        name: name,
        country: selectedCountry,
        price: price,
        currency: currencyCode,
        category: category,
        description: description,
        pics: selectedFile,
        id: id,
      };
      const response = await Adding(newObject);

      if (response.error) {
        setLoading(false);
        console.error("Adding failed", response.error);
        dispatch(addNotification(response.error));
      } else {
        setLoading(false);
        navigate("/");
        dispatch(appendlisting(response));
        console.log(response);
        dispatch(addNotification(response.name, "was listed"));
        console.log("Navigoidaan");
      }
    } catch (error) {
      setLoading(false);
      console.error("Adding failed", error.message);
      dispatch(addNotification(error.message));
    }
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const base64 = reader.result;
      console.log(base64);
      setSelectedFile(base64);
    };
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  if (user.length === 0) {
    <div>No.</div>;
  }

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
                src={selectedFile}
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
            <Input type="file" multiple onChange={convertToBase64} />
          </div>
          <div id="ainputdiv">
            <Button type="primary" onClick={handleAdding}>
              Submit
            </Button>
          </div>
        </div>
        <Spinner loading={loading} spinTip="Adding listing" />
      </div>
      <SpeedInsights />
    </div>
  );
};

export default AddingPage;
