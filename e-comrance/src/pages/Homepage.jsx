import { FaHeart } from "react-icons/fa";
import Navbar from "./../components/navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addToCart,
  addToFavorites,
  deleteFavorite,
} from "../services/Services";
import { Button, Select, Input } from "antd";
import { appendcart } from "../../reducer/cartReducer";
import { addNotification } from "../../reducer/notificationReducer";
import { LuSettings2 } from "react-icons/lu";
import "../styles/HomeStyles.css";
import { initializeListing } from "../../reducer/listingReducer";
import categoriesWithOptions from "../../Data/categoryData";
import CountriesData from "../../Data/countryData";
import Services from "../services/Services";
import {
  setCategory,
  setCountry,
  setMaxPrice,
  setMinPrice,
} from "./../../reducer/filterReducer";
import {
  appendfavorite,
  initializefavorite,
} from "../../reducer/favoriteReducer";
import Spinner from "../components/LoadSpinner.jsx";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Homepage = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const spinTip = "Loading listings...";

  const user = useSelector((state) => {
    return state.user;
  });
  const filter = useSelector((state) => {
    return state.filter;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const listings = await Services.getAllListings();
        console.log("Listings", listings);
        dispatch(initializeListing(listings));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        dispatch(addNotification(error));
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const userFavoriteId = useSelector((state) => {
    const favorites = state.favorite;
    const mappedFavorites = favorites.map((favorite) => {
      return favorite.id;
    });
    return mappedFavorites;
  });

  const handleAddToCart = async (id) => {
    try {
      if (user.length === 0) {
        dispatch(addNotification("Please login first"));
        return;
      }
      const response = await addToCart(id);
      console.log("Response", response);
      if (response === "Already in cart") {
        dispatch(addNotification(response));
        console.log("Hah");
      } else if (response === "Some one has already taken that") {
        dispatch(addNotification(response));
      } else {
        console.log(response);
        dispatch(appendcart(response));
        dispatch(addNotification(`${response.name} was added to your cart`));
        const remainingListings = user.filter((name) => {
          name !== response.name;
        });
        dispatch(initializeListing(remainingListings));
      }
    } catch (error) {
      dispatch(addNotification(error));
    }
  };

  const handleAddToFavorites = async (id) => {
    if (user.length === 0) {
      dispatch(addNotification("Please login first"));
      return;
    }
    if (userFavoriteId.includes(id)) {
      const response = await deleteFavorite(id);
      dispatch(initializefavorite(response));
    } else {
      const response = await addToFavorites(id);
      if (response === "You have already marked it as favorite") {
        dispatch(addNotification(response));
      } else {
        dispatch(appendfavorite(response));
        dispatch(
          addNotification(`${response.name} was added to your favorites`)
        );
      }
    }
  };

  const handleFiltershow = () => {
    setShowFilter((prev) => !prev);
  };

  const listing = useSelector((state) => {
    const filteredListings = state.listing.filter((item) => {
      return (
        item.status !== "In cart" &&
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

  const handleClearFilter = () => {
    console.log("Clear filter");
    dispatch(setCategory("None"));
    dispatch(setCountry("None"));
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
  };

  if (listing.length === 0) {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div id="itemstyle">
          <p id="welcome"></p>
          <Button type="primary" id="Filtericon" onClick={handleFiltershow}>
            <LuSettings2 />
          </Button>
        </div>
        <div>
          {showFilter && (
            <div style={{ margin: 30 }}>
              <div style={{ margin: 10 }}>
                <label htmlFor="category">Filter by category: </label>
                <Select
                  id="category"
                  options={categoriesWithOptions}
                  style={{ width: 200 }}
                  value={filter.category}
                  onChange={(value) => dispatch(setCategory(value))}
                ></Select>
              </div>
              <div style={{ margin: 10 }}>
                <label htmlFor="country">Filter by country: </label>
                <Select
                  id="country"
                  options={CountriesData}
                  style={{ width: 200 }}
                  value={filter.country}
                  onChange={(value) => dispatch(setCountry(value))}
                ></Select>
              </div>
              <div style={{ margin: 10 }}>
                <Input
                  placeholder="Min price"
                  onChange={(e) => dispatch(setMinPrice(e.target.value))}
                  value={filter.minPrice}
                />
              </div>
              <div style={{ margin: 10 }}>
                <Input
                  onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                  value={filter.maxPrice}
                  placeholder="Max price"
                />
              </div>
              <div style={{ margin: 10 }}>
                <Button onClick={() => handleClearFilter()}>
                  Clear filter
                </Button>
              </div>
            </div>
          )}
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
      <div>
        <div>
          <Navbar />
        </div>
        <div id="itemstyle">
          <div id="welcome"></div>
          <Button type="primary" id="Filtericon" onClick={handleFiltershow}>
            <LuSettings2 />
          </Button>
        </div>
        {showFilter && (
          <div style={{ margin: 30 }}>
            <div style={{ margin: 10 }}>
              <label htmlFor="category">Filter by category: </label>
              <Select
                id="category"
                options={categoriesWithOptions}
                style={{ width: 200 }}
                value={filter.category}
                onChange={(value) => dispatch(setCategory(value))}
              ></Select>
            </div>
            <div style={{ margin: 10 }}>
              <label htmlFor="country">Filter by country: </label>
              <Select
                id="country"
                options={CountriesData}
                style={{ width: 200 }}
                value={filter.country}
                onChange={(value) => dispatch(setCountry(value))}
              ></Select>
            </div>
            <div style={{ margin: 10, width: 300 }}>
              <label htmlFor="minPrice">Min price: </label>
              <Input
                id="minPrice"
                placeholder="Min price"
                value={filter.minPrice}
                onChange={(e) => dispatch(setMinPrice(e.target.value))}
              />
            </div>
            <div style={{ margin: 10, width: 300 }}>
              <label htmlFor="maxPrice">Max price: </label>
              <Input
                id="maxPrice"
                onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                value={filter.maxPrice}
                placeholder="Max price"
              />
            </div>
            <div style={{ margin: 10 }}>
              <Button type="primary" onClick={() => handleClearFilter()}>
                Clear filter
              </Button>
            </div>
          </div>
        )}
        <div id="listingstyle">
          {listing.map((listing) => (
            <div key={listing.id} id="listing">
              <div>
                <img
                  src={
                    listing.pics ||
                    "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                  }
                  alt="Listing Image"
                  style={{
                    maxWidth: 300,
                    maxHeight: 300,
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
                <div id="itemstyle">
                  <Button
                    type="primary"
                    style={{ margin: 10 }}
                    onClick={() => handleAddToCart(listing.id)}
                  >
                    Add to cart
                  </Button>
                  <Button
                    style={{
                      margin: 10,
                      color:
                        user &&
                        user.favorites &&
                        user.favorite.includes(listing.id)
                          ? "red"
                          : "black",
                    }}
                    onClick={() => handleAddToFavorites(listing.id)}
                  >
                    <FaHeart
                      style={{
                        color: userFavoriteId.includes(listing.id)
                          ? "red"
                          : "black",
                      }}
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <SpeedInsights />
          <Spinner loading={loading} spinTip={spinTip} />
        </div>
      </div>
    );
  }
};

export default Homepage;
