import React from 'react';
import Navbar from '../components/navbar.jsx';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNotification} from '../../reducer/notificationReducer.js';
import AuthorCard from '../components/AuthorCard.jsx';
import {initializeFollowers} from '../../reducer/followersReducer.js';
import Spinner from '../components/LoadSpinner.jsx';
import FriendRequestCard from '../components/FriendReqCard.jsx';
import {Radio} from 'antd';
import {useSelector} from 'react-redux';
import {getAllRequests} from '../services/friendsServices.js';

const Friendspage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [acceptedFriend, setAcceptedFriend] = useState([]);
  const [pendingFriend, setPendingFriend] = useState([]);
  const [declinedFriend, setDeclinedFriend] = useState([]);
  const [Accepted, setAccepted] = useState(true);
  const [Pending, setPending] = useState(false);
  const [Declined, setDeclined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState('');
  const canDelete = true;
  const canStartConv = true;
  const followers = useSelector((state) => state.followers);
  const user = useSelector((state) => state.user);
  console.log(user);

  const filterRequests = (FriendReq) => {
    const accepted = FriendReq.filter((user) => user.status === 'Accepted');
    const pending = FriendReq.filter((user) => user.status === 'Pending');
    const declined = FriendReq.filter((user) => user.status === 'Declined');
    console.log(accepted, 'accepted');
    console.log(pending, 'pending');
    console.log(declined, 'declined');
    setAcceptedFriend(accepted);
    setPendingFriend(pending);
    setDeclinedFriend(declined);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setSpinTip('Loading user data...');
      setLoading(true);
      try {
        dispatch(initializeFollowers());
        const response3 = await getAllRequests();
        console.log(followers);
        console.log(response3, 'response3');
        filterRequests(response3);
      } catch (error) {
        if (error.status === 401) {
          navigate('/login');
          dispatch(
            addNotification(
              'Please login first your session has expired so we can add your listing to your account and you could get the money from it',
              'error'
            )
          );
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const onChange = (e) => {
    if (e.target.value === 'a') {
      setPending(true);
      setAccepted(false);
      setDeclined(false);
    }
    if (e.target.value === 'b') {
      setPending(false);
      setAccepted(true);
      setDeclined(false);
    }
    if (e.target.value === 'c') {
      setPending(false);
      setAccepted(false);
      setDeclined(true);
    }
  };

  return (
    <div className='App'>
      <Navbar />
      <h1>Friendspage</h1>
      <div>
        <Spinner loading={loading} tip={spinTip} />
      </div>
      <div>
        <h2>Friends</h2>
        <AuthorCard
          users={followers}
          canDelete={canDelete}
          canStartConv={canStartConv}
        />
        <h3>Friend Request</h3>
        <Radio.Group onChange={onChange} defaultValue='b' buttonStyle='solid'>
          <Radio.Button value='a'>Pending {pendingFriend.length}</Radio.Button>
          <Radio.Button value='b'>
            Accepted {acceptedFriend.length}
          </Radio.Button>
          <Radio.Button value='c'>
            Declined {declinedFriend.length}
          </Radio.Button>
        </Radio.Group>
        {Pending && (
          <FriendRequestCard
            friends={pendingFriend}
            pending={Pending}
            user={user}
          />
        )}
        {Accepted && <FriendRequestCard friends={acceptedFriend} user={user} />}
        {Declined && (
          <FriendRequestCard
            friends={declinedFriend}
            filterRequests={filterRequests}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default Friendspage;
