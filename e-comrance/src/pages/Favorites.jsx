import Navbar from "./../components/navbar.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllFavoriteItems } from "../services/Services";
import { initializefavorite } from "../../reducer/favoriteReducer.js";
import { useDispatch } from "react-redux";
import Spinner from "../components/LoadSpinner.jsx";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../reducer/notificationReducer.js";
import { Button } from "antd";
import { FaHeart } from "react-icons/fa";
import { addToFavorites, deleteFavorite } from "../services/Services.js";
import { appendfavorite } from "../../reducer/favoriteReducer.js";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Favoritepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");
  const user = useSelector((state) => state.user);
  const userFavoriteId = useSelector((state) => {
    const favorites = state.favorite;
    const mappedFavorites = favorites.map((favorite) => {
      return favorite.id;
    });
    return mappedFavorites;
  });

  const handleAddToFavorites = async (id) => {
    if (user.length === 0) {
      dispatch(addNotification("Please login first your session has expired"));
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
        dispatch(addNotification(`was added to your favorites`));
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setSpinTip("Loading favorite items");
      try {
        setLoading(true);
        const response = await getAllFavoriteItems();
        dispatch(initializefavorite(response));
        setLoading(false);
      } catch (error) {
        console.log("error", error.status);
        if (error.status === 401) {
          navigate("/login");
          dispatch(
            addNotification(
              "Please login first your session has expired so we can keep your favorites stored",
              "error"
            )
          );
        }
        setLoading(false);
        console.error("Error fetching favorite items:", error);
      }
    };
    fetchData();
  }, []);

  document.title = "Favorites";

  const favorites = useSelector((state) => {
    return state.favorite;
  });

  if (!favorites || favorites.length === 0) {
    return (
      <div className="App">
        <Navbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <h1>No favorites</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <Navbar />
      <div id="listingstyle">
        {favorites.map((favorite) => (
          <div key={favorite.id} id="listing">
            <img
              src={
                favorite.pics ||
                "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
              }
              alt={favorite.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
            <div>
              <div style={{ margin: 5 }}>Name: {favorite.name}</div>
              <div style={{ margin: 5 }}>Country: {favorite.country}</div>
              <div style={{ margin: 5 }}>
                Price:{favorite.price} {favorite.currency}
              </div>
              <div style={{ margin: 5 }}>
                Last price: {favorite.lastPrice} {favorite.currency}
              </div>
              <div style={{ margin: 5 }}>
                Description: {favorite.description}
              </div>
            </div>
            <Button
              type="ghost"
              style={{
                margin: 10,
                color:
                  user && user.favorites && user.favorite.includes(favorite.id)
                    ? "red"
                    : "black",
              }}
              onClick={() => handleAddToFavorites(favorite.id)}
            >
              <FaHeart
                style={{
                  color: userFavoriteId.includes(favorite.id) ? "red" : "black",
                }}
              />
            </Button>
          </div>
        ))}
      </div>
      <SpeedInsights />
      <Spinner loading={loading} tip={spinTip} />
    </div>
  );
};

export default Favoritepage;
