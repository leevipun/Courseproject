import ListingCard from "../components/ListingCard.jsx";
import Navbar from "../components/navbar.jsx";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeListing } from "../../reducer/listingReducer.js";
import { Radio } from "antd";
import AuthorCard from "../components/AuthorCard.jsx";
import { initializeAllusers } from "../../reducer/allUsersReducer.js";
import Spinner from "../components/LoadSpinner.jsx";

const Adminpage = () => {
  const [showListing, setShowListing] = useState(true);
  const [showAuthors, setShowAuthors] = useState(false);
  const [showCarts, setShowCarts] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAdmin = true;
  const canDelete = true;
  const listings = useSelector((state) => {
    return state.listing;
  });
  const user = useSelector((state) => {
    return state.user;
  });
  const ownUserId = user.id;
  const authors = useSelector((state) => {
    return state.allUsers;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeListing());
    dispatch(initializeAllusers());
    console.log("Admin page user", user);
    console.log("Admin page listings", listings);
    console.log("Admin page authors", authors);
  }, []);
  console.log("Admin page");
  if (!listings) {
    return <div>Loading...</div>;
  }

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    if (e.target.value === "a") {
      setLoading(true);
      dispatch(initializeListing());

      setTimeout(() => {
        setShowListing(true);
        setShowAuthors(false);
        setShowCarts(false);
        setShowChats(false);
        console.log("Listings", listings);
        setLoading(false);
      }, 1000);
    } else if (e.target.value === "b") {
      setLoading(true);
      dispatch(initializeAllusers());
      setTimeout(() => {
        setShowListing(false);
        setShowAuthors(true);
        setShowCarts(false);
        setShowChats(false);
        console.log("Authors", authors);
        setLoading(false);
      }, 1000);
    } else if (e.target.value === "c") {
      console.log("Carts");
      setShowListing(false);
      setShowAuthors(false);
      setShowCarts(true);
      setShowChats(false);
    } else if (e.target.value === "d") {
      console.log("Chats");
      setShowListing(false);
      setShowAuthors(false);
      setShowCarts(false);
      setShowChats(true);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <h1>Admin Page</h1>
      <div>
        <Radio.Group onChange={onChange} defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">Listings</Radio.Button>
          <Radio.Button value="b">Users</Radio.Button>
          <Radio.Button value="c">Carts</Radio.Button>
          <Radio.Button value="d">Chats</Radio.Button>
        </Radio.Group>
      </div>
      {showListing && (
        <div>
          <h1>Listings</h1>
          <ListingCard listings={listings} user={user} isAdmin={isAdmin} />
        </div>
      )}
      {showAuthors && (
        <div>
          <h1>Authors</h1>
          <AuthorCard
            users={authors}
            canDeleteUser={canDelete}
            canCheckCart={canDelete}
            ownUserId={ownUserId}
          />
        </div>
      )}
      {showCarts && <div>Carts</div>}
      {showChats && <div>Chats</div>}
      <Spinner loading={loading} />
    </div>
  );
};

export default Adminpage;
