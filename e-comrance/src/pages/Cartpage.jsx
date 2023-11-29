import { FaShoppingBasket } from "react-icons/fa";
import { Button } from "antd";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCartItem } from "../services/Services";
import { initializecart } from "../../reducer/cartReducer";
import "../styles/Cartpage.css";

const Cartpage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    return state.cart;
  });

  const [totalPrice, setTotalPrice] = useState(0); // Initialize state for total price

  const handleItemDelete = async (id) => {
    try {
      console.log(id);
      const response = await deleteCartItem(id);
      dispatch(initializecart(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  return (
    <div>
      <div>
        <Navbar />
        User Profile <FaShoppingBasket />
      </div>
      <div id="listingstyle">
        {cartItems.map((listing) => (
          <div key={listing.id} id="listing">
            <div>
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" // assuming you have an 'imageUrl' property
                alt={listing.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={{ margin: 5 }}>Name: {listing.name}</div>
            <div style={{ margin: 5 }}>Country: {listing.country}</div>
            <div style={{ margin: 5 }}>
              Price: {listing.price} {listing.currency}
            </div>
            <div style={{ margin: 5 }}>Description: {listing.description}</div>
            <Button
              style={{ margin: 5 }}
              type="primary"
              onClick={() => handleItemDelete(listing.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <div>
        <h2>Total price: {totalPrice} €</h2>
      </div>
    </div>
  );
};

export default Cartpage;
