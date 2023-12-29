import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAuthor,
  getListing,
  sendFriendRequest,
  startToFollow,
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

const AuthorInspect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState("");
  const [buttonText, setButtonText] = useState("Send friend request");
  const [disabled, setDisabled] = useState(false);
  const author = useSelector((state) => state.author);
  const listings = useSelector((state) => state.authorListings);
  const user = useSelector((state) => state.user);
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
      } catch (error) {
        dispatch(addNotification(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleFollow = async (id) => {
    setSpinTip("Following...");
    try {
      setLoading(true);
      console.log(id);
      const response = await startToFollow(id);
      console.log(response);
      console.log(response.status);
      if (response.status === "Pending") {
        setButtonText("Pending");
        setDisabled(true);
      }
      dispatch(addNotification("Followed"));
    } catch (error) {
      dispatch(addNotification(error.error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner loading={loading} tip={spinTip} />;

  return (
    <div className="App">
      <Navbar />
      <h1
        style={{ display: "flex", justifyContent: "center" }}
      >{`${author.firstname} ${author.lastname}`}</h1>
      <Button onClick={() => handleBack()}>Back</Button>
      <Button
        type="primary"
        onClick={() => handleSendFriendReq(author.id)}
        disabled={disabled}
      >
        {buttonText}
      </Button>
      <Button onClick={() => handleFollow(author.id)}>Start to follow</Button>
      <div>
        <p>{`Name: ${author.firstname} ${author.lastname}`}</p>
        <p>{author.email}</p>
      </div>
      <div>
        <h3>Listings</h3>
        <ListingCard listings={listings} user={user} />
      </div>
      <Spinner loading={loading} tip={spinTip} />
    </div>
  );
};

export default AuthorInspect;
