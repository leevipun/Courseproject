import Navbar from "./../components/navbar";
import { useSelector } from "react-redux";

const Favoritepage = () => {
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
    </div>
  );
};

export default Favoritepage;
