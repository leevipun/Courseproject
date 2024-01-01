import { Input, Button, Form, Tag, Select } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/ChatPageStyles.css";
import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import {
  updateUsersListing,
  deleteUserListing,
  updateListing,
} from "../services/Services.js";
import { initializeUserListing } from "../../reducer/ownlistingReducer.js";
import CountriesData from "../../Data/countryData.js";

const customizeRequiredMark = (label, { required }) => (
  <>
    {required ? (
      <Tag color="error">Required</Tag>
    ) : (
      <Tag color="warning">optional</Tag>
    )}
    {label}
  </>
);

const OwnListingCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userListings = useSelector((state) => state.userListings);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [lastId, setLastId] = useState();
  const [edit, setEdit] = useState(false);

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const handleSave = async () => {
    const response = await updateUsersListing(
      name,
      country,
      price,
      description,
      lastId
    );
    console.log("Save");
    console.log(lastId);
    console.log("Vastaus", response);
    dispatch(initializeUserListing());
    setEdit(false);
    setLastId("");
  };

  const handleDelete = async (id) => {
    console.log("Delete");
    console.log(id);
    const response = await deleteUserListing(id);
    console.log("response", response);
    dispatch(initializeUserListing(response));
  };

  const handleEdit = (id) => {
    if (lastId !== id) {
      setEdit(true);
      const editListing = userListings.filter((listing) => listing.id === id);
      console.log(editListing);
      setName(editListing[0].name);
      setCountry(editListing[0].country);
      setPrice(editListing[0].price);
      setDescription(editListing[0].description);
      console.log(editListing);
      const newObject = {
        id: id,
        name: name,
        country: country,
        price: price,
        description: description,
      };
      updateListing(newObject);
      setLastId(id);
    } else if (lastId === id) {
      setEdit(false);
      setLastId("");
    }
  };

  if (userListings.length < 1) {
    return (
      <div className="App">
        <Navbar />
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>You have no listings</h1>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => navigate("/add")}>Add listing</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <div id="listingstyle">
          {userListings.map((listing) => (
            <div key={listing.id} id="listing">
              <div>
                <img
                  src={
                    listing.pics ||
                    "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                  }
                  alt={listing.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              </div>
              <div>
                {edit ? (
                  lastId === listing.id ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Form
                        id="Ownlistingform"
                        style={{ padding: 30 }}
                        form={form}
                        layout="vertical"
                        initialValues={{
                          requiredMarkValue: requiredMark,
                        }}
                        onValuesChange={onRequiredTypeChange}
                        requiredMark={
                          requiredMark === "customize"
                            ? customizeRequiredMark
                            : requiredMark
                        }
                      >
                        <Form.Item label="Name" required>
                          <Input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item label="Country" required>
                          <Select
                            options={CountriesData}
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e)}
                          />
                        </Form.Item>
                        <Form.Item label="Price" required>
                          <Input
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item label="Description" required>
                          <Input
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" onClick={() => handleSave()}>
                            Save
                          </Button>
                          <Button
                            style={{ marginLeft: 5 }}
                            type="primary"
                            onClick={() => setEdit(false)}
                          >
                            Cancel
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  ) : (
                    <>
                      <div style={{ margin: 5 }}>Name: {listing.name}</div>
                      <div style={{ margin: 5 }}>
                        Country: {listing.country}
                      </div>
                      <div style={{ margin: 5 }}>
                        Price: {listing.price} {listing.currency}
                      </div>
                      <div style={{ margin: 5 }}>
                        Description: {listing.description}
                      </div>
                      <div id="itemstyle">
                        <Button
                          type="primary"
                          onClick={() => handleEdit(listing.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => handleDelete(listing.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )
                ) : (
                  <>
                    <div style={{ margin: 5 }}>Name: {listing.name}</div>
                    <div style={{ margin: 5 }}>Country: {listing.country}</div>
                    <div style={{ margin: 5 }}>
                      Price: {listing.price} {listing.currency}
                    </div>
                    <div style={{ margin: 5 }}>
                      Description: {listing.description}
                    </div>
                    <div id="itemstyle">
                      <Button
                        type="primary"
                        onClick={() => handleEdit(listing.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => handleDelete(listing.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default OwnListingCard;
