import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/LoadSpinner.jsx";
import { getUsers } from "../services/Services.js";
import Navbar from "../components/navbar.jsx";
import "../styles/AuthorStyles.css";
import { useNavigate } from "react-router-dom";
import {
  initializeAllusers,
  setAllUsers,
} from "../../reducer/allUsersReducer.js";

const AuthorPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [spinTip, setSpinTip] = useState("");
  const dispatch = useDispatch();
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

  const handleReDirect = (id) => {
    console.log(id);
    navigate(`/users/${id}`);
  };

  console.log(authors.length);
  if (authors.length === 0) {
    return (
      <div>
        <Navbar />
        <h1>Authors</h1>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <h1>Authors</h1>
        <div className="authors">
          {authors.map((author) => (
            <div
              className="user-display"
              onClick={() => handleReDirect(author.id)}
            >
              <img
                className="avatar"
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt={`${author.firstname}'s Avatar`}
              />

              <div className="user-info">
                <h2 className="username">
                  {author.firstname} {author.lastname}
                </h2>
                <p className="bio">
                  I have {author.listings.length} listings for you
                </p>
              </div>
            </div>
          ))}
        </div>
        <Spinner loading={loading} tip={spinTip} />
      </div>
    );
  }
};

export default AuthorPage;
