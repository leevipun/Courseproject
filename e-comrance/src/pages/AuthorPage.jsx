import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/LoadSpinner.jsx";
import { getUsers } from "../services/Services.js";
import Navbar from "../components/navbar.jsx";
import "../styles/AuthorStyles.css";
import {
  initializeAllusers,
  setAllUsers,
} from "../../reducer/allUsersReducer.js";
import AuthorCard from "../components/AuthorCard.jsx";

const AuthorPage = () => {
  const [loading, setLoading] = useState(true);
  const [spinTip, setSpinTip] = useState("");
  const dispatch = useDispatch();

  document.title = "Authors";
  const user = useSelector((state) => state.user);

  const isAdmin = user.style === "admin";

  const authors = useSelector((state) => {
    console.log(state.allUsers.length);
    if (!state.author) {
      console.log("alle kaksi");
      return [];
    }
    const filteredAuthors = state.allUsers.filter((author) => {
      if (state.filter.filter === "") {
        return true; // Include all authors if the filter is empty
      } else {
        console.log(state.filter.filter);
        return (
          author.firstname
            .toLowerCase()
            .includes(state.filter.filter.toLowerCase()) ||
          author.lastname
            .toLowerCase()
            .includes(state.filter.filter.toLowerCase())
        );
      }
    });

    console.log(filteredAuthors);
    return filteredAuthors;
  });

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      setSpinTip("Loading authors...");
      setLoading(true);
      try {
        console.log("Fetching authors");
        dispatch(initializeAllusers());
        const response = await getUsers();
        dispatch(setAllUsers(response));
      } catch (error) {
        console.error("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(authors.length);
  if (authors.length === 0) {
    return (
      <div className="App">
        <Navbar />
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fcfbfc",
          }}
        >
          Authors
        </h1>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fcfbfc",
          }}
        >
          No authors found
        </h2>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fcfbfc",
          }}
        >
          Authors
        </h1>
        <AuthorCard
          users={authors}
          isAdmin={isAdmin}
          ownUserId={user.id}
        />
        <Spinner loading={loading} tip={spinTip} />
      </div>
    );
  }
};

export default AuthorPage;
