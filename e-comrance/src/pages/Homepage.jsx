import { FaHome } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Services, { addToCart } from "../services/Services";
import { initializeListing } from "../../reducer/listingReducer";
import { Button } from "antd";
import { appendcart } from "../../reducer/cartReducer";
import { addNotification } from "../../reducer/notificationReducer";
import Notification from "../components/notification";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const listingStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  const handleAddToCart = async (id) => {
    const response = await addToCart(id);
    if (response === "Already in cart") {
      dispatch(addNotification("Item added to your cart"));
      console.log("Hah");
    } else {
      console.log(response);
      dispatch(appendcart(response));
      dispatch(addNotification(response.name, "was added to your cart"));
    }
  };

  const listing = useSelector((state) => {
    return state.listing;
  });

  useEffect(() => {
    if (!window.localStorage.getItem("loggedNoteappUser")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = await Services.getAllListings();
        dispatch(initializeListing(listings));
        console.log("Listings", listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
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
        <div>
          {listing.map((listing) => (
            <div key={listing.id} style={listingStyle}>
              <div>Name: {listing.name}</div>
              <div>Country: {listing.country}</div>
              <div>
                Price: {listing.price} {listing.currency}
              </div>
              <div>Description: {listing.description}</div>
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
          ))}
        </div>
      </div>
    );
  }
};

export default Homepage;
