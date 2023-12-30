import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthorStyles.css";
import { deleteFriend, startMessages } from "../services/Services.js";
import { initializeFollowers } from "../../reducer/followersReducer";
import { useDispatch } from "react-redux";
import { addNotification } from "../../reducer/notificationReducer.js";
import { setMessages } from "../../reducer/messageReducer.js";

const AuthorCard = ({ users, canDelete, canStartConv }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReDirect = (id) => {
    console.log(id);
    navigate(`/users/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFriend(id);
      initializeFollowers();
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
        dispatch(addNotification("error", "Please login to continue"));
      }
      console.log(error);
    }
  };

  const handleStartConv = async (id) => {
    try {
      const response = await startMessages(id);
      navigate(`/chats/${response.id}`);
      dispatch(setMessages(response.messages));
    } catch (error) {
      dispatch(addNotification(error.error));
    }
  };

  return (
    <div className="authors">
      {users.map((author) => (
        <div className="user-display" onClick={() => handleReDirect(author.id)}>
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
          {canDelete && (
            <div className="actions">
              <button onClick={() => handleDelete(author.id)}>Delete</button>
            </div>
          )}
          {canStartConv && (
            <div className="actions">
              <button onClick={() => handleStartConv(author.id)}>
                Message
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AuthorCard;
