import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthor, getListing } from "../services/Services.js";
import { addNotification } from "../../reducer/notificationReducer.js";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { clearAuthor, setAuthor } from "../../reducer/authorReducer.js";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import Spinner from "../components/LoadSpinner.jsx";
import { setauthorListings } from "../../reducer/authorListingsReducer.js";
import { addToCart } from "../services/Services.js";
import { appendcart } from "../../reducer/cartReducer.js";
import { FaHeart } from "react-icons/fa";
import { addToFavorites, deleteFavorite } from "../services/Services.js";
import {
  appendfavorite,
  initializefavorite,
} from "../../reducer/favoriteReducer.js";
import Navbar from "../components/navbar.jsx";
import { initializeListing } from "../../reducer/listingReducer.js";

const AuthorInspect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");
  const author = useSelector((state) => state.author);
  const listings = useSelector((state) => state.authorListings);
  const user = useSelector((state) => state.user);
  const id = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      setSpinTip("Loading author...");
      try {
        setLoading(true);
        dispatch(clearAuthor());
        const response = await getAuthor(id);
        dispatch(setAuthor(response));
        console.log("response", response);
        fetchListingsAndDispatch(response);
        console.log("response", response);
      } catch (error) {
        dispatch(addNotification(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const userFavoriteId = useSelector((state) => {
    const favorites = state.favorite;
    const mappedFavorites = favorites.map((favorite) => {
      return favorite.id;
    });
    return mappedFavorites;
  });

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
        dispatch(setauthorListings(remainingListings));
        dispatch(initializeListing(remainingListings));
      }
    } catch (error) {
      dispatch(addNotification(error));
    }
  };

  console.log("listings", listings);
  const handleBack = () => {
    navigate("/authors");
  };

  const fetchListingsAndDispatch = async (response) => {
    const listingIds = response.listings;
    const listingPromises = listingIds.map(async (id) => {
      return await getListing(id);
    });
    const listings = await Promise.all(listingPromises);
    dispatch(setauthorListings(listings));
  };

  if (loading) return <Spinner loading={loading} tip={spinTip} />;

  return (
    <div>
      <Navbar />
      <h1
        style={{ display: "flex", justifyContent: "center" }}
      >{`${author.firstname} ${author.lastname}`}</h1>
      <Button onClick={() => handleBack()}>Back</Button>

      <div>
        <p>{`Name: ${author.firstname} ${author.lastname}`}</p>
      </div>
      <div>
        <h3>Listings</h3>
        <div id="listingstyle">
          {listings.map((listing) => (
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
      </div>
      <Spinner loading={loading} tip={spinTip} />
    </div>
  );
};

export default AuthorInspect;
