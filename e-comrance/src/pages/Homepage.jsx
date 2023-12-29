import Navbar from "./../components/navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { addNotification } from "../../reducer/notificationReducer";
import { LuSettings2 } from "react-icons/lu";
import "../styles/HomeStyles.css";
import { initializeListing } from "../../reducer/listingReducer";
import Spinner from "../components/LoadSpinner.jsx";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Footer from "../components/Footer.jsx";
import ListingCard from "../components/ListingCard.jsx";
import FilterCard from "../components/FilterCard.jsx";

const Homepage = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const spinTip = "Loading listings...";

  const user = useSelector((state) => {
    return state.user;
  });

  document.title = "Nordic Exchange";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(initializeListing());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        dispatch(addNotification(error));
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleFiltershow = () => {
    setShowFilter((prev) => !prev);
  };

  const listing = useSelector((state) => {
    const filteredListings = state.listing.filter((item) => {
      return (
        item.status !== "In cart" &&
        item.status !== "Sold" &&
        (state.filter.minPrice === "" || item.price >= state.filter.minPrice) &&
        (state.filter.maxPrice === "" || item.price <= state.filter.maxPrice) &&
        (state.filter.country === "None" ||
          item.country === state.filter.country) &&
        (state.filter.category === "None" ||
          item.category === state.filter.category) &&
        item.name.toLowerCase().includes(state.filter.filter.toLowerCase())
      );
    });

    return filteredListings;
  });

  if (listing.length === 0) {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div id="itemstyle">
          <p id="welcome"></p>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            id="Filtericon"
            onClick={handleFiltershow}
          >
            <LuSettings2 />
          </Button>
        </div>
        <div>
          <FilterCard showFilter={showFilter} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <h1>No listings</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div id="homepage">
        <div>
          <Navbar />
        </div>
        <div id="itemstyle">
          <div id="welcome"></div>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            id="Filtericon"
            onClick={handleFiltershow}
          >
            <LuSettings2 />
          </Button>
        </div>
        <FilterCard showFilter={showFilter} />
        <ListingCard listings={listing} user={user} />
        <div>
          <SpeedInsights />
          <Spinner loading={loading} spinTip={spinTip} />
        </div>
        <Footer />
      </div>
    );
  }
};

export default Homepage;
