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

  return (
    <div>
      <div>
        <Navbar />
        User Profile <FaShoppingBasket />
      </div>

      {cartItems.map((item) => (
        <div key={item.id}>
          {item.name} Country: {item.country}
        </div>
      ))}
    </div>
  );
};

export default Cartpage;
