import { FaHome } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addToCart } from "../services/Services";
import { Button } from "antd";
import { appendcart } from "../../reducer/cartReducer";
import { addNotification } from "../../reducer/notificationReducer";
import Notification from "../components/notification";
import "../styles/Homepage.css";
import { initializeListing } from "../../reducer/listingReducer";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const listings = useSelector((state) => {
    return state.user;
  });

  const handleAddToCart = async (id) => {
    const response = await addToCart(id);
    if (response === "Already in cart") {
      dispatch(addNotification(response));
      console.log("Hah");
    } else if (response === "Some one has already taken that") {
      dispatch(addNotification(response));
    } else {
      console.log(response);
      dispatch(appendcart(response));
      dispatch(addNotification(`${response.name} was added to your cart`));
      const remainingListings = listings.filter((name) => {
        name !== response.name;
      });
      dispatch(initializeListing(remainingListings));
    }
  };

  const listing = useSelector((state) => {
    const filteredListings = state.listing.filter(
      (listing) => listing.status !== "In cart"
    );
    const filter =
      typeof state.filter === "string" ? state.filter.toLowerCase() : "";

    return filteredListings.filter(
      (listing) =>
        typeof listing.name === "string" &&
        listing.name.toLowerCase().includes(filter)
    );
  });

  useEffect(() => {
    if (!window.localStorage.getItem("loggedNoteappUser")) {
      navigate("/login");
    }
  }, []);

  if (!listing) {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <Notification />
        </div>
        Welcome back {user && user[0] && user[0].name} <FaHome />
        <div>
          <h1>No listings</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        Welcome back {user && user[0] && user[0].name} <FaHome />
        <div id="listingstyle">
          {listing.map((listing) => (
            <div key={listing.id} id="listing">
              <div>
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" // assuming you have an 'imageUrl' property
                  alt={listing.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
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
                <div>
                  <Button
                    type="primary"
                    style={{ margin: 10 }}
                    onClick={() => handleAddToCart(listing.id)}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Homepage;
