import {
  FaShoppingBasket,
  FaHeart,
  FaQuestionCircle,
  FaHome,
  FaAddressCard,
  FaPlus,
  FaUser,
  FaList,
  FaUserFriends,
} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {FaMagnifyingGlass, FaPeopleGroup} from 'react-icons/fa6';
import React, {useEffect, useState} from 'react';
import '../App.css';
import {Dropdown, Space, Input} from 'antd';
import {CiLogin} from 'react-icons/ci';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {filterChange} from '../../reducer/filterReducer';
import {clearUser, initializeUser} from '../../reducer/userReducer';
import {clearCart, initializecart} from '../../reducer/cartReducer';
import {clearFavorite, initializefavorite} from '../../reducer/favoriteReducer';
import {clearListing} from '../../reducer/listingReducer';
import {getUserData} from '../services/userServices';
import {addNotification} from '../../reducer/notificationReducer';
import {RiAdminLine} from 'react-icons/ri';
import {setToken} from '../services/adminServices';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggerUser = JSON.parse(
          window.sessionStorage.getItem('loggedNoteappUser')
        );
        console.log('on user', loggerUser);
        if (loggerUser) {
          setToken(loggerUser);
          console.log('on user edelleen');
          const response = await getUserData();
          console.log('Response Nav', response);
          setIsLogged(true);
          if (response.style === 'admin') {
            dispatch(initializeUser());
            dispatch(initializefavorite());
            setIsAdmin(true);
          } else {
            dispatch(initializeUser());
            dispatch(initializecart());
            dispatch(initializefavorite());
            console.log('User', user);
            checkStatus(response.style);
          }
        }
      } catch (error) {
        if (error.status === 401) {
          window.sessionStorage.clear();
          navigate('/login');
          dispatch(addNotification('Please login, your session has expired'));
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const content = event.target.value;
    dispatch(filterChange(content));
  };

  const handleClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const cart = useSelector((state) => {
    return state.cart;
  });

  const favorite = useSelector((state) => {
    return state.favorite;
  });

  const numberOfItemsInCart = cart.length;

  const numberOfItemsInFavorite = favorite.length;

  const handleLogout = () => {
    window.sessionStorage.clear();
    console.log('Hah sessionStorage meni siinä');
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearFavorite());
    dispatch(clearListing());
    console.log('User cleared');
    navigate('/login');
  };

  const checkStatus = (status) => {
    const loggerUser = window.sessionStorage.getItem('loggedNoteappUser');
    if (loggerUser) {
      setIsLogged(true);
      console.log('on user edelleen stats');
    }
    if (status) {
      console.log('on user edelleen stats');
      setIsLogged(true);
      if (status === 'admin') {
        setShowAdd(false);
        setShowCart(false);
        setIsAdmin(true);
      } else if (status === 'seller') {
        setShowAdd(true);
      } else if (status !== 'seller') {
        setShowCart(true);
        setShowFavorites(true);
      }
    }
  };

  const handleUserInfo = () => {
    navigate('/user');
  };

  const handleOwnlisting = () => {
    navigate('/ownlisting');
  };

  const handleFriends = () => {
    navigate('/friends');
  };

  const handleChats = () => {
    navigate('/chats');
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  const items = [
    {
      label: 'User info',
      key: '1',
      icon: <UserOutlined />,
      onClick: handleUserInfo,
    },
    ...(isAdmin
      ? []
      : [
          {
            label: 'Own listings',
            key: '2',
            icon: <FaList />,
            onClick: handleOwnlisting,
          },
          {
            label: 'Friends',
            key: '3',
            icon: <FaUserFriends />,
            onClick: handleFriends,
          },
          {
            label: 'Chats',
            key: '4',
            icon: <FaPeopleGroup />,
            onClick: handleChats,
          },
        ]),
    ...(isAdmin
      ? [
          {
            label: 'Admin',
            key: '5',
            icon: <RiAdminLine />,
            onClick: handleAdmin,
          },
        ]
      : []),
    {
      label: 'Log out',
      key: '6',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
    >
      <nav>
        <ul id='navbar'>
          <li id='navitem'>
            <Link to='/'>Nordic Exchange</Link>
          </li>
          <li id='navitem'>
            <Link to='/'>
              Home <FaHome />
            </Link>
          </li>
          <li id='navitem'>
            <Link to='/authors'>
              Authors <FaUser />
            </Link>
          </li>
          <li id='navitem'>
            <Link to='/about'>
              About-us <FaQuestionCircle />
            </Link>
          </li>
          <li id='navitem'>
            <Link to='/contacts'>
              Contacts <FaAddressCard />
            </Link>
          </li>
          {showInput && (
            <Input
              placeholder='input search text'
              onChange={handleChange}
              style={{width: 250}}
              id='NavsearchInput'
              enterButton
            />
          )}
          <li id='search' onClick={() => handleClick()}>
            <FaMagnifyingGlass />
          </li>
          {showAdd && (
            <li id='navitem'>
              <Link to='/add'>
                <FaPlus />
              </Link>
            </li>
          )}
          {showCart && (
            <li id='navitem'>
              <Link to='/cart'>
                <FaShoppingBasket /> {numberOfItemsInCart}
              </Link>
            </li>
          )}
          {showFavorites && (
            <li id='navitem'>
              <Link to='/favorites'>
                <FaHeart /> {numberOfItemsInFavorite}
              </Link>
            </li>
          )}

          {isLogged && (
            <li id='navitem'>
              <Dropdown menu={{items}} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <FaUser id='user' />
                  </Space>
                </a>
              </Dropdown>
            </li>
          )}
          {!isLogged && (
            <li id='navitem'>
              <Link to='/login'>
                Login <CiLogin />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
