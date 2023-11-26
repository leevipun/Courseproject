import { FaShoppingBasket } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Services from "../services/Services";
import { initializecart } from "../../reducer/cartReducer";

const Cartpage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = await Services.getAllCartItems();
        dispatch(initializecart(listings));
        console.log("Listings", listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  const listingStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  return (
    <div>
      <div>
        <Navbar />
        User Profile <FaShoppingBasket />
      </div>

      {cartItems.map((listing) => (
        <div key={listing.id} style={listingStyle}>
          <div style={{ margin: 5 }}>Name: {listing.name}</div>
          <div style={{ margin: 5 }}>Country: {listing.country}</div>
          <div style={{ margin: 5 }}>
            Price: {listing.price} {listing.currency}
          </div>
          <div style={{ margin: 5 }}>Description: {listing.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Cartpage;
