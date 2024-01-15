import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import {
  deleteCartItem,
  deleteUserListing,
  getUserData,
  sellerReceipt,
  sendReceipt,
} from "../services/emailServices";
import { clearCart } from "../../reducer/cartReducer";
import { appendUser, clearUser } from "../../reducer/userReducer";
import { useEffect } from "react";
import React, { useState } from "react";
import Services from "../services/emailServices.js";
import { initializecart } from "../../reducer/cartReducer.js";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Spinner from "../components/LoadSpinner.jsx";
import { setUser } from "../../reducer/userReducer.js";

const PaymentSucess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [spinTip, setSpinTip] = useState("");

  useEffect(() => {
    console.log("useEffect");
    setSpinTip("Loading receipt...");
    const fetchData = async () => {
      setLoading(true);
      const response = await getUserData();
      dispatch(setUser(response));
      const listings = await Services.getAllCartItems();
      dispatch(initializecart(listings));
      dispatch(clearUser());
      dispatch(appendUser(response));
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log(user);

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const handleBackToHome = async () => {
    setSpinTip("Sending receipt...");
    setLoading(true);
    const email = user[0].email;
    const sellerEmail = cartItems[0].author;
    console.log(email, sellerEmail);

    try {
      await sendReceipt(email, sellerEmail, cartItems);
      console.log("send receipt s");
      await sellerReceipt(email, sellerEmail, cartItems);
      console.log("send receipt b");

      for (const item of cartItems) {
        console.log("delete user listing");
        await deleteUserListing(item.id);
        console.log("delete cart item");
        await deleteCartItem(item.id);
      }

      navigate("/");
      dispatch(clearCart());
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(cartItems);

  return (
    <div>
      <h1>Payment Sucess</h1>
      <h2>Thank you for your purchase</h2>
      <h3>Order details</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} id="Cartlisting">
            <div>
              <img
                src={
                  cartItem.pics ||
                  "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                }
                alt={cartItem.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            </div>
            <div>
              <div style={{ margin: 5 }}>Name: {cartItem.name}</div>
              <div style={{ margin: 5 }}>Country: {cartItem.country}</div>
              <div style={{ margin: 5 }}>
                Price: {cartItem.price} {cartItem.currency}
              </div>
              <div style={{ margin: 5 }}>
                Description: {cartItem.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button type="primary" onClick={handleBackToHome}>
          Back to Home
        </Button>
        <SpeedInsights />
        <Spinner loading={loading} tip={spinTip} />
      </div>
    </div>
  );
};
export default PaymentSucess;
