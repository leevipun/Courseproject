import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {addNotification} from '../../reducer/notificationReducer.js';
import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import {clearAuthor, setAuthor} from '../../reducer/authorReducer.js';
import {useSelector} from 'react-redux';
import React, {useState} from 'react';
import Spinner from '../components/LoadSpinner.jsx';
import {setauthorListings} from '../../reducer/authorListingsReducer.js';
import Navbar from '../components/navbar.jsx';
import ListingCard from '../components/ListingCard.jsx';
import '../styles/AuthorInspect.css';
import {setMessages} from '../../reducer/messageReducer.js';
import {initializeUser} from '../../reducer/userReducer.js';
import AdditionalInfo from '../components/registery/additionalInfo.jsx';
import AddressInfo from '../components/registery/addressInfo.jsx';
import PersonalInfo from '../components/registery/personalInfo.jsx';
import UserNavbar from '../components/userNavbar.jsx';
import {adminUpdateUserInfo, getAuthor} from '../services/userServices.js';
import {getListing} from '../services/listingServices.js';
import {
  getAllRequests,
  sendFriendRequest,
} from '../services/friendsServices.js';
import {startMessages} from '../services/chatServices.js';

const AuthorInspect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [style, setStyle] = useState('');
  const [iban, setIban] = useState('');
  const [personalInfo, setPersonalInfo] = useState(true);
  const [addressInfo, setAddressInfo] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(false);

  const user = useSelector((state) => {
    return state.user;
  });
  const isLoggedIn = user.length !== 0;

  console.log('user', user);

  const [buttonText, setButtonText] = useState('Send friend request');
  const [disabled, setDisabled] = useState(false);
  const author = useSelector((state) => state.author);
  const listings = useSelector((state) => state.authorListings);

  const id = window.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      setSpinTip('Loading author...');
      try {
        setLoading(true);
        dispatch(clearAuthor());

        const response = await getAuthor(id);

        setFirstName(response.firstname);
        setLastName(response.lastname);
        const splitted = response.Dob.split('/');
        setDob(`${splitted[2]}-${splitted[1]}-${splitted[0]}`);
        setCountry(response.country);
        setEmail(response.email);
        setPhone(response.phone);
        setAddress(response.address);
        setCity(response.city);
        setCountry(response.country);
        setPostalCode(response.postalCode);
        setStyle(response.style);
        setIban(response.iban);

        dispatch(initializeUser());
        dispatch(setAuthor(response));

        fetchListingsAndDispatch(response);
        checkFriendStatus();
        checkIfAdmin();
      } catch (error) {
        if (error.status === 401) {
          navigate('/login');
          dispatch(addNotification('Please login to continue'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const personalProps = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
  };

  const addressProps = {
    address,
    setAddress,
    city,
    setCity,
    country,
    setCountry,
    postalCode,
    setPostalCode,
  };

  const additionalProps = {
    phone,
    setPhone,
    iban,
    setIban,
    Dob,
    setDob,
    style,
    setStyle,
  };

  const checkFriendStatus = () => {
    let friends = user.friends;
    if (friends.includes(author.id)) {
      console.log('friends');
      setButtonText('Friends');
      setDisabled(true);
    } else {
      console.log('not friends');
      setButtonText('Send friend request :D ');
    }
  };

  const checkIfAdmin = () => {
    if (user.style === 'admin') {
      setIsAdmin(true);
      console.log('admin');
    } else {
      setIsAdmin(false);
      console.log('not admin');
    }
  };

  console.log('listings', listings);
  const handleBack = () => {
    navigate('/authors');
  };

  const fetchListingsAndDispatch = async (response) => {
    const listingIds = response.listings;
    const listingPromises = listingIds.map(async (id) => {
      return await getListing(id);
    });
    const listings = await Promise.all(listingPromises);
    dispatch(setauthorListings(listings));
  };

  const checkIfPending = async () => {
    try {
      const friendReqs = await getAllRequests();
      console.log(friendReqs);

      const isPending = friendReqs.some(
        (req) => req.receiver === author.id || req.sender === author.id
      );

      if (isPending) {
        setButtonText('Pending');
        setDisabled(true);
      }
    } catch (error) {
      console.error('Error fetching friend requests', error);
    }
  };

  checkIfPending();

  const handleSendFriendReq = async (id) => {
    setSpinTip('Sending friend request...');
    try {
      setLoading(true);
      console.log(id);
      const response = await sendFriendRequest(id);
      console.log(response);
      console.log(response.status);
      if (response.status === 'Pending') {
        setButtonText('Pending');
        setDisabled(true);
      }
      dispatch(addNotification('Friend request sent'));
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
        dispatch(addNotification('Please login to continue'));
      }
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

  const handleShowPersonalInfo = () => {
    setPersonalInfo(true);
    setAddressInfo(false);
    setAdditionalInfo(false);
  };

  const handleShowAddressInfo = () => {
    setPersonalInfo(false);
    setAddressInfo(true);
    setAdditionalInfo(false);
  };

  const handleShowAdditionalInfo = () => {
    setPersonalInfo(false);
    setAddressInfo(false);
    setAdditionalInfo(true);
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleUpdate = async () => {
    try {
      const id = window.location.pathname.split('/')[2];
      setSpinTip('Updating user info...');
      const newObject = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        style: style,
        country: country,
        city: city,
        address: address,
        postalCode: postalCode,
        phone: phone,
        Dob: Dob,
        iban: iban,
      };
      const response = await adminUpdateUserInfo(newObject, id);
      dispatch(addNotification(response));
      console.log(response);
    } catch (error) {
      console.error(error.error);
      dispatch(addNotification(error.error));
    }
  };

  const HandleCancel = () => {
    setEdit(false);
  };

  if (loading) return <Spinner loading={loading} tip={spinTip} />;

  return (
    <div className='App'>
      <Navbar />

      <div className='user-profile'>
        <Button className='back-button' onClick={() => handleBack()}>
          Back
        </Button>
        <h1>{`${author.firstname} ${author.lastname}`}</h1>
        {isLoggedIn ? (
          <>
            <Button
              type='primary'
              onClick={() => handleSendFriendReq(author.id)}
              disabled={disabled}
            >
              {buttonText}
            </Button>
            {user.friends.includes(author.id) && (
              <Button
                type='primary'
                onClick={() => handleStartMessage(author.id)}
              >
                Send message
              </Button>
            )}
          </>
        ) : null}

        {isAdmin ? (
          <>
            <Button onClick={handleEdit} type='primary'>
              Edit
            </Button>
            {edit ? (
              <>
                <UserNavbar
                  handleShowAdditionalInfo={handleShowAdditionalInfo}
                  handleShowAddressInfo={handleShowAddressInfo}
                  handleShowPersonalInfo={handleShowPersonalInfo}
                />

                {additionalInfo && <AdditionalInfo props={additionalProps} />}
                {addressInfo && <AddressInfo props={addressProps} />}
                {personalInfo && <PersonalInfo props={personalProps} />}
                <Button
                  type='primary'
                  onClick={handleUpdate}
                  style={{margin: 10}}
                >
                  Save changes
                </Button>
                <Button
                  type='primary'
                  onClick={HandleCancel}
                  style={{margin: 10}}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <div className='user-details'>
                <p>{`Name: ${author.firstname} ${author.lastname}`}</p>
                <p>Email: {author.email}</p>
                <p>Phone: {author.phone}</p>

                <div className='address-details'>
                  <h3>Address</h3>
                  <p>{author.address}</p>
                  <p>{author.city}</p>
                  <p>{author.country}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className='user-details'>
            <p>{`Name: ${author.firstname} ${author.lastname}`}</p>
            <p>Email: {author.email}</p>
            <p>Phone: {author.phone}</p>

            <div className='address-details'>
              <h3>Address</h3>
              <p>{author.address}</p>
              <p>{author.city}</p>
              <p>{author.country}</p>
            </div>
          </div>
        )}
        <Spinner loading={loading} tip={spinTip} />
      </div>
      <div style={{marginTop: 10}} className='listing-container'>
        <h3>Listings</h3>
        <p>{`Number of listings: ${listings.length}`}</p>
        <ListingCard listings={listings} user={user} />
      </div>
    </div>
  );
};

export default AuthorInspect;
