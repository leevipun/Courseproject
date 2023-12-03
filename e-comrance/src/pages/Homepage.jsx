import { FaHome } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../services/Services";
import { Button, Select, Input } from "antd";
import { appendcart } from "../../reducer/cartReducer";
import { addNotification } from "../../reducer/notificationReducer";
import { LuSettings2 } from "react-icons/lu";
import "../styles/Homepage.css";
import { initializeListing } from "../../reducer/listingReducer";
import categoriesWithOptions from "../../Data/categoryData";
import CountriesData from "../../Data/countryData";
import {
  setCategory,
  setCountry,
  setMaxPrice,
  setMinPrice,
} from "./../../reducer/filterReducer";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const user = useSelector((state) => {
    console.log("User", state.user);
    return state.user;
  });
  const filter = useSelector((state) => {
    return state.filter;
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
      const remainingListings = user.filter((name) => {
        name !== response.name;
      });
      dispatch(initializeListing(remainingListings));
    }
  };

  useEffect(() => {
    if (!window.sessionStorage.getItem("loggedNoteappUser")) {
      navigate("/login");
    }
  }, []);

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

  if (!listing || listing.length === 0) {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        Welcome back {user && user[0] && user[0].name} <FaHome />
        <div>
          <h1>No listings</h1>
        </div>
        <div>
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
              <Button>Clear filter</Button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div id="itemstyle">
          <div id="welcome">Welcome back {user[0].name}</div>
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
              <Button type="primary">Clear filter</Button>
            </div>
          </div>
        )}
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
