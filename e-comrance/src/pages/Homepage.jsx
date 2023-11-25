import { FaHome } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Services, { addToCart } from "../services/Services";
import { initializeListing } from "../../reducer/listingReducer";
import { Button } from "antd";
import { appendcart } from "../../reducer/cartReducer";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const handleAddToCart = async (id) => {
    const response = await addToCart(id);
    console.log(response);
    dispatch(appendcart(response));
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
            <div key={listing.id}>
              <div>
                {listing.name} Country: {listing.country}
                <Button
                  type="primary"
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
