import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import '../styles/loginStyles.css';
import {useDispatch} from 'react-redux';
import {setUser} from '../../reducer/userReducer';
import {addNotification} from '../../reducer/notificationReducer';
import LoginForm from '../components/loginForm.jsx';
import React from 'react';
import {initializecart} from '../../reducer/cartReducer.js';
import {initializefavorite} from '../../reducer/favoriteReducer.js';
import {SpeedInsights} from '@vercel/speed-insights/react';
import Spinner from '../components/LoadSpinner.jsx';
import {Login} from '../services/userServices.js';
import {setToken} from '../services/adminServices.js';

const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [spinTip, setSpinTip] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setSpinTip('Logging in');
    try {
      setLoading(true);
      const user = await Login(email, password);
      dispatch(setUser(user));
      window.sessionStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user.token)
      );
      setToken(user.token);
      dispatch(initializecart());
      dispatch(initializefavorite());
      navigate('/');
      setLoading(false);
      dispatch(addNotification('Welcome back'));
    } catch (error) {
      setLoading(false);
      dispatch(addNotification(error.error));
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className='App'>
      <LoginForm
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        setEmail={setEmail}
        setPassword={setPassword}
        email={email}
        password={password}
      />
      <Spinner loading={loading} tip={spinTip} />
      <SpeedInsights />
    </div>
  );
};

export default Loginpage;
