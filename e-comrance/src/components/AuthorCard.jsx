import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthorStyles.css";
import {
  adminUserDelete,
  deleteFriend,
  startMessages,
} from "../services/Services.js";
import { initializeFollowers } from "../../reducer/followersReducer.js";
import { useDispatch } from "react-redux";
import { addNotification } from "../../reducer/notificationReducer.js";
import { setMessages } from "../../reducer/messageReducer.js";
import { setAllUsers } from "../../reducer/allUsersReducer.js";

const AuthorCard = ({ users, canDelete, canStartConv, ownUserId, isAdmin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("Author card users", users);

  const handleReDirect = (id) => {
    console.log(id);
    navigate(`/users/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteFriend(id);
      console.log(response);
      dispatch(setAllUsers(response));
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

  const deleteUser = async (id) => {
    try {
      await adminUserDelete(id);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
        dispatch(addNotification("error", "Please login to continue"));
      }
      console.log(error);
    }
  };

  const handleReDirectToCart = (id) => {
    navigate(`/users/admin/${id}`);
  };

  return (
    <div className="authors">
      {users.map((author) => (
        <div
          className="user-display"
          onClick={() => !isAdmin && handleReDirect(author.id)}
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
            {ownUserId === author.id ? (
              <p className="bio">You</p>
            ) : (
              <p className="bio">
                I have {author.listings.length} listings for you
              </p>
            )}
          </div>
          {canDelete && (
            <div className="actions">
              <button onClick={() => handleDelete(author.id)}>Delete</button>
            </div>
          )}
          {isAdmin && ownUserId !== author.id && (
            <div>
              <div className="actions">
                <button onClick={() => deleteUser(author.id)}>
                  Delete User
                </button>
                <button
                  style={{ marginTop: 5, marginBottom: 5 }}
                  onClick={() => handleReDirectToCart(author.id, "cart")}
                >
                  Check Cart
                </button>
                <button onClick={() => handleReDirect(author.id, "user")}>
                  Check User
                </button>
              </div>
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
