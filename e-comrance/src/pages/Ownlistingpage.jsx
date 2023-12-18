import { FaHeart } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { useState } from "react";
import {
  deleteUserListing,
  updateListing,
  updateUsersListing,
} from "../services/Services";
import { initializeUserListing } from "../../reducer/ownlistingReducer";

const Ownlistings = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [lastId, setLastId] = useState();
  const [edit, setEdit] = useState(false);
  const userListings = useSelector((state) => state.userListings);
  console.log(userListings);

  const handleEdit = (id) => {
    console.log(id);
    console.log(lastId);
    if (lastId !== id) {
      setEdit(true);
      const editListing = userListings.filter((listing) => listing.id === id);
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
  };

  const handleDelete = async (id) => {
    console.log("Delete");
    console.log(id);
    const response = await deleteUserListing(id);
    console.log("response", response);
    dispatch(initializeUserListing(response));
  };

  return (
    <div>
      <Navbar />
      User Profile <FaHeart />
      <div id="listingstyle">
        {userListings.map((listing) => (
          <div key={listing.id} id="listing">
            <div>
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
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
              <div style={{ margin: 5 }}>Name: {listing.name}</div>
              <div style={{ margin: 5 }}>Country: {listing.country}</div>
              <div style={{ margin: 5 }}>
                Price: {listing.price} {listing.currency}
              </div>
              <div style={{ margin: 5 }}>
                Description: {listing.description}
              </div>
            </div>
            <div id="itemstyle">
              <Button type="primary" onClick={() => handleEdit(listing.id)}>
                Edit
              </Button>
              <Button type="primary" onClick={() => handleDelete(listing.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {edit && (
        <div>
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ margin: 10, width: 300 }}
            />
          </div>
          <div>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ margin: 10, width: 300 }}
            />
          </div>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ margin: 10, width: 300 }}
          />
          <div>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ margin: 10, width: 300 }}
            />
          </div>
          <div>
            <Button
              type="primary"
              onClick={() => {
                setEdit(false);
                setLastId("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} style={{ margin: 10 }} type="primary">
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ownlistings;
