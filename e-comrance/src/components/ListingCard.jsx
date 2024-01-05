import React, { useState } from "react";
import { Button } from "antd";
import { FaHeart } from "react-icons/fa";
import { addToCart, deleteUserListing } from "../services/Services.js";
import { initializecart } from "../../reducer/cartReducer.js";
import { addNotification } from "../../reducer/notificationReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { initializeListing } from "../../reducer/listingReducer.js";
import { addToFavorites, deleteFavorite } from "../services/Services.js";
import {
  initializefavorite,
  appendfavorite,
} from "../../reducer/favoriteReducer.js";
import Spinner from "./LoadSpinner.jsx";

const ListingCard = ({ listings, user, isAdmin }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");

  const handleAddToCart = async (id) => {
    try {
      setLoading(true);
      setSpinTip("Adding to cart...");
      if (user.length === 0) {
        dispatch(
          addNotification("Please login first your session has expired")
        );
        return;
      }
      const response = await addToCart(id);
      if (response === "Already in cart") {
        dispatch(addNotification(response));
      } else if (response === "Some one has already taken that") {
        dispatch(addNotification(response));
      } else {
        dispatch(addNotification(`added to your cart`));
        dispatch(initializecart());
        dispatch(initializeListing());
      }
    } catch (error) {
      dispatch(addNotification(error));
    } finally {
      setLoading(false);
    }
  };

  const userFavoriteId = useSelector((state) => {
    const favorites = state.favorite;
    const mappedFavorites = favorites.map((favorite) => {
      return favorite.id;
    });
    return mappedFavorites;
  });

  const handleAddToFavorites = async (id) => {
    if (user.length === 0) {
      dispatch(
        addNotification(
          "Please login first your session has expired your session has expired"
        )
      );
      return;
    }
    if (userFavoriteId.includes(id)) {
      const response = await deleteFavorite(id);
      dispatch(initializefavorite(response));
    } else {
      const response = await addToFavorites(id);
      dispatch(appendfavorite(response));
      dispatch(addNotification(`added to your favorites`));
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      deleteUserListing(id);

      dispatch(initializeListing());
      dispatch(addNotification(`listing was deleted succesfully`));
    } catch (error) {
      dispatch(addNotification(error));
    }
  };

  return (
    <div
      id="listingstyle"
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
    >
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
            <div style={{ margin: 5 }}>Category: {listing.category}</div>

            <div style={{ margin: 5 }}>Country: {listing.country}</div>
            <div style={{ margin: 5 }}>
              Price: {listing.price} {listing.currency}
            </div>
            <div style={{ margin: 5 }}>Description: {listing.description}</div>
            {isAdmin ? (
              <div style={{ margin: 5 }}>Status: {listing.status}</div>
            ) : null}
            <div id="itemstyle">
              {isAdmin ? (
                <Button
                  type="primary"
                  style={{ margin: 10 }}
                  onClick={() => handleDeleteListing(listing.id)}
                >
                  Delete
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    style={{ margin: 10 }}
                    onClick={() => handleAddToCart(listing.id)}
                  >
                    Add to cart
                  </Button>
                  <Button
                    type="ghost"
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
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      <Spinner loading={loading} tip={spinTip} />
    </div>
  );
};

export default ListingCard;
