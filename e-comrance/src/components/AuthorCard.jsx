import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthorStyles.css";

const AuthorCard = ({ users }) => {
  const navigate = useNavigate();

  const handleReDirect = (id) => {
    console.log(id);
    navigate(`/users/${id}`);
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
        </div>
      ))}
    </div>
  );
};

export default AuthorCard;
