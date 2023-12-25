import Navbar from "./../components/navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllFavoriteItems } from "../services/Services";
import { initializefavorite } from "../../reducer/favoriteReducer.js";
import { useDispatch } from "react-redux";
import Spinner from "../components/LoadSpinner.jsx";

const Favoritepage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setSpinTip("Loading favorite items");
      try {
        setLoading(true);
        const response = await getAllFavoriteItems();
        dispatch(initializefavorite(response));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching favorite items:", error);
      }
    };
    fetchData();
  });

  document.title = "Favorites";

  const favorites = useSelector((state) => {
    return state.favorite;
  });

  console.log(favorites);

  if (!favorites || favorites.length === 0) {
    return (
      <div>
        <Navbar />
        <div>
          <h1>No favorites</h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div>
        {favorites.map((favorite) => (
          <div key={favorite.id}>
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" // assuming you have an 'imageUrl' property
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
                Price: {favorite.price} {favorite.currency}
              </div>
              <div style={{ margin: 5 }}>
                Last price: {favorite.lastPrice} {favorite.currency}
              </div>
              <div style={{ margin: 5 }}>
                Description: {favorite.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Spinner loading={loading} tip={spinTip} />
    </div>
  );
};

export default Favoritepage;
