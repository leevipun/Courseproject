import React from 'react';
import '../styles/FriendRequestCard.css';
import {
  acceptFriendRequest,
  deleteFriendRequest,
} from '../services/friendsServices';
import {initializeFollowers} from '../../reducer/followersReducer.js';

const FriendRequestCard = ({user, friends, pending}) => {
  const handleAccept = async (id) => {
    console.log(id);
    try {
      await acceptFriendRequest(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (id) => {
    console.log('id', id);
    try {
      await deleteFriendRequest(id);
      initializeFollowers();
    } catch (error) {
      console.log(error);
    }
  };
  if (friends.length === 0) {
    return <div>No friend requests</div>;
  }

  console.log(friends);

  return (
    <div>
      {friends.map((friend) => (
        <div className='friend-request-card'>
          <img
            src='https://www.w3schools.com/howto/img_avatar.png'
            alt={`Profile of ${friend.senderName}`}
            className='profile-image'
          />
          <div className='user-info'>
            <h3>{`${friend.receiverName}`}</h3>
          </div>
          {pending && (
            <div className='actions'>
              {friend.sender === user.id ? (
                <></>
              ) : (
                <>
                  <button onClick={() => handleAccept(friend.id)}>
                    Accept
                  </button>
                  <button onClick={() => handleDecline(friend.id)}>
                    Decline
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendRequestCard;
