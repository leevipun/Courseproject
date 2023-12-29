import Navbar from "./../components/navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Services, { deleteCartItem, getUserData } from "../services/Services";
import { initializecart } from "../../reducer/cartReducer";
import "../styles/CartStyles.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/LoadSpinner.jsx";
import { addNotification } from "../../reducer/notificationReducer";
import React from "react";

const Cartpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");
  const [user, setUser] = useState([]);

  const cartItems = useSelector((state) => {
    return state.cart;
  });

  console.log("cart", cartItems);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSpinTip("Loading cart items");
        setLoading(true);
        const user = JSON.parse(sessionStorage.getItem("loggedNoteappUser"));
        const response = await getUserData(user);
        setUser(response);
        const listings = await Services.getAllCartItems();
        console.log("Listings", listings);
        const validListings = listings.filter(
          (item) => item !== undefined && item !== null && item !== ""
        );
        if (validListings.length === 0) {
          console.log("validate");
          dispatch(initializecart([]));
          setLoading(false);
          return;
        } else {
          console.log("else");
          dispatch(initializecart(validListings));
          console.log("Valid Listings", validListings);
          setLoading(false);
        }
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          dispatch(
            addNotification(
              "Please login first your session has expired so we can keep your cart up to date",
              "error"
            )
          );
        }
        setLoading(false);
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  const handleItemDelete = async (id) => {
    try {
      setSpinTip("Deleting item");
      setLoading(true);
      console.log(id);
      const response = await deleteCartItem(id);
      dispatch(initializecart(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleCheckout = () => {
    if (!user) {
      alert("Please login first your session has expired");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div id="listingstyle">
        {cartItems.map((listing) => (
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
                }}
              />
            </div>
            <div style={{ margin: 5 }}>Name: {listing.name}</div>
            <div style={{ margin: 5 }}>Country: {listing.country}</div>
            <div style={{ margin: 5 }}>
              Price: {listing.price} {listing.currency}
            </div>
            <div style={{ margin: 5 }}>Description: {listing.description}</div>
            <Button
              style={{ margin: 5 }}
              type="primary"
              onClick={() => handleItemDelete(listing.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <div>
        <h2 style={{ color: "#fcfbfc", marginLeft: 10 }}>
          Total price: {totalPrice} €
        </h2>
      </div>
      <div>
        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={handleCheckout}
        >
          Check out
        </Button>
      </div>
      <Spinner loading={loading} spinTip={spinTip} />
    </div>
  );
};

export default Cartpage;
