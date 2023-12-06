import { FaShoppingBasket } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCartItem } from "../services/Services";
import { initializecart } from "../../reducer/cartReducer";
import "../styles/Cartpage.css";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Steps, Input, Button } from "antd";
import { CiCreditCard1 } from "react-icons/ci";

const Cartpage = () => {
  const [showFillInformation, setShowFillInformation] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const cartItems = useSelector((state) => {
    return state.cart;
  });

  const [totalPrice, setTotalPrice] = useState(0);

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

  const handleCheckout = () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    if (!user[0].name) {
      setShowCheckout(true);
      setShowFillInformation(true);
    } else {
      setShowCheckout(true);
      setShowConfirm(true);
    }
  };

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
      <div>
        <Button type="primary" onClick={handleCheckout}>
          Check out
        </Button>
      </div>
      {showCheckout && (
        <div>
          <Steps
            items={[
              {
                title: "Fill information",
                status: "process",
                icon: <LoadingOutlined />,
              },
              {
                title: "Confirm",
                status: "wait",
                icon: <SolutionOutlined />,
              },
              {
                title: "Pay",
                status: "wait",
                icon: <CiCreditCard1 />,
              },
              {
                title: "Done",
                status: "wait",
                icon: <SmileOutlined />,
              },
            ]}
          />
          {showFillInformation && (
            <div>
              <Input type="text" placeholder="Name" value={user[0].name} />
              <Input
                type="text"
                placeholder="Address"
                value={user[0].address}
              />
              <Input type="text" placeholder="Email" value={user[0].email} />
              <Button type="primary">Submit</Button>
            </div>
          )}
          {showConfirm && (
            <div>
              <div>
                <h2>Confirm your order</h2>
                <h3>Total price: {totalPrice} €</h3>
              </div>
              <Button type="primary">Pay</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cartpage;
