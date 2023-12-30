import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAuthor,
  getListing,
  getUserData,
  sendFriendRequest,
  startMessages,
} from "../services/Services.js";
import { addNotification } from "../../reducer/notificationReducer.js";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { clearAuthor, setAuthor } from "../../reducer/authorReducer.js";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import Spinner from "../components/LoadSpinner.jsx";
import { setauthorListings } from "../../reducer/authorListingsReducer.js";
import Navbar from "../components/navbar.jsx";
import ListingCard from "../components/ListingCard.jsx";
import "../styles/AuthorInspect.css";
import { setMessages } from "../../reducer/messageReducer.js";

const AuthorInspect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");
  let user = getUserData();
  const [buttonText, setButtonText] = useState("Send friend request");
  const [disabled, setDisabled] = useState(false);
  const author = useSelector((state) => state.author);
  const listings = useSelector((state) => state.authorListings);
  const id = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      setSpinTip("Loading author...");
      try {
        setLoading(true);
        dispatch(clearAuthor());
        const response = await getAuthor(id);
        dispatch(setAuthor(response));
        console.log("response", response);
        fetchListingsAndDispatch(response);
        console.log("response", response);
        checkFriendStatus();
      } catch (error) {
        dispatch(addNotification(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(user);

  const checkFriendStatus = () => {
    let friends = user.friends;
    console.log("friends", friends);
    if (friends) {
      setButtonText("Friends");
      setDisabled(true);
    } else {
      setButtonText("Send friend request :D ");
    }
  };

  console.log("listings", listings);
  const handleBack = () => {
    navigate("/authors");
  };

  const fetchListingsAndDispatch = async (response) => {
    const listingIds = response.listings;
    const listingPromises = listingIds.map(async (id) => {
      return await getListing(id);
    });
    const listings = await Promise.all(listingPromises);
    dispatch(setauthorListings(listings));
  };

  const handleSendFriendReq = async (id) => {
    setSpinTip("Sending friend request...");
    try {
      setLoading(true);
      console.log(id);
      const response = await sendFriendRequest(id);
      console.log(response);
      console.log(response.status);
      if (response.status === "Pending") {
        setButtonText("Pending");
        setDisabled(true);
      }
      dispatch(addNotification("Friend request sent"));
    } catch (error) {
      dispatch(addNotification(error.error));
    } finally {
      setLoading(false);
    }
  };

  const handleStartMessage = async (id) => {
    try {
      const response = await startMessages(id);
      navigate(`/chats/${response.id}`);
      dispatch(setMessages(response.messages));
    } catch (error) {
      dispatch(addNotification(error.error));
    }
  };

  if (loading) return <Spinner loading={loading} tip={spinTip} />;

  return (
    <div className="App">
      <Navbar />

      <div className="user-profile">
        <Button className="back-button" onClick={() => handleBack()}>
          Back
        </Button>
        <h1>{`${author.firstname} ${author.lastname}`}</h1>

        <Button
          type="primary"
          onClick={() => handleSendFriendReq(author.id)}
          disabled={disabled}
        >
          {buttonText}
        </Button>
        <Button type="primary" onClick={() => handleStartMessage(author.id)}>
          Send message
        </Button>

        <div className="user-details">
          <p>{`Name: ${author.firstname} ${author.lastname}`}</p>
          <p>Email: {author.email}</p>
          <p>Phone: {author.phone}</p>

          <div className="address-details">
            <h3>Address</h3>
            <p>{author.address}</p>
            <p>{author.city}</p>
            <p>{author.country}</p>
          </div>
        </div>

        <Spinner loading={loading} tip={spinTip} />
      </div>
      <div style={{ marginTop: 10 }} className="listing-container">
        <h3>Listings</h3>
        <p>{`Number of listings: ${listings.length}`}</p>
        <ListingCard listings={listings} user={user} />
      </div>
    </div>
  );
};

export default AuthorInspect;
