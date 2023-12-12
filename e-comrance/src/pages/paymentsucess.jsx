import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { deleteCartItem, deleteUserListing } from "../services/Services";
import { clearCart } from "../../reducer/cartReducer";

const PaymentSucess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const handleBackToHome = async () => {
    //const items = cartItems.map((item) => item.id);
    //await deleteCartItemAndUserListing(items);
    cartItems.forEach(async (item) => {
      await deleteUserListing(item.id);
      await deleteCartItem(item.id);
    });

    navigate("/");
    dispatch(clearCart());
  };
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
                src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
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
      </div>
    </div>
  );
};
export default PaymentSucess;
