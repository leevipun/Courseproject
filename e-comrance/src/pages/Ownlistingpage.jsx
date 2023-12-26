import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { useState } from "react";
import {
  deleteUserListing,
  updateListing,
  updateUsersListing,
  getUsersListings,
  getUserData,
} from "../services/Services";
import { initializeUserListing } from "../../reducer/ownlistingReducer";
import { useEffect } from "react";
import Spinner from "../components/LoadSpinner";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../reducer/notificationReducer";

const Ownlistings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [lastId, setLastId] = useState();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");
  const [user, setUser] = useState([]);
  const userListings = useSelector((state) => state.userListings);
  console.log(userListings);

  console.log("User", user);

  document.title = "Own Listings";

  useEffect(() => {
    const fetchData = async () => {
      setSpinTip("Loading user listings...");
      try {
        setLoading(true);
        const user = JSON.parse(sessionStorage.getItem("loggedNoteappUser"));
        const response = await getUserData(user);
        setUser(response);
        const userListings = await getUsersListings();
        console.log("User listings", userListings);
        dispatch(initializeUserListing(userListings));
        setLoading(false);
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          dispatch(
            addNotification(
              "Please login first so we can keep your favorites stored",
              "error"
            )
          );
        }
        setLoading(false);
        console.error(error);
      }
    };
    if (user.lenght > 0) {
      fetchData();
    }
  }, []);

  console.log(user);

  console.log("Userlength", user.length);

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

  if (user.length === 0) {
    return (
      <div>
        <Navbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <div>
            <p>Please login first</p>
            <Button type="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button
              style={{ margin: 5 }}
              type="primary"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </div>
        <Spinner loading={loading} tip={spinTip} />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        User Profile
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
              <Button
                onClick={handleSave}
                style={{ margin: 10 }}
                type="primary"
              >
                Save
              </Button>
            </div>
            <Spinner loading={loading} tip={spinTip} />
          </div>
        )}
      </div>
    );
  }
};

export default Ownlistings;
