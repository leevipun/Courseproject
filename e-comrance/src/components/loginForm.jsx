import {Button, Input} from 'antd';
import React from 'react';
import {sendForgotPasswordEmail} from '../services/emailServices.js';
import {useDispatch} from 'react-redux';
import {addNotification} from '../../reducer/notificationReducer.js';

const LoginForm = ({
  handleLogin,
  handleRegister,
  setEmail,
  setPassword,
  email,
  password,
}) => {
  const dispatch = useDispatch();
  const handleForgotPassword = async () => {
    try {
      if (email === '') {
        dispatch(addNotification('Please enter your email in the Email field'));
        return;
      }
      const response = await sendForgotPasswordEmail(email);
      dispatch(addNotification(response.message));
    } catch (error) {
      console.error(error);
      dispatch(addNotification(error.error));
    }
  };

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <div>
        <form id='form' onSubmit={handleLogin} style={{marginTop: 100}}>
          <h1 style={{color: '#fcfbfc'}}>Login</h1>
          <Input
            id='input'
            type='text'
            placeholder='Email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id='input'
            type='password'
            placeholder='Password'
            value={password}
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id='login'>
            <Button type='primary' id='button' htmlType='submit'>
              Log in
            </Button>
            <p
              style={{color: '#fcfbfc', cursor: 'pointer'}}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </p>
          </div>
          <div>
            <Button type='primary' id='button' onClick={() => handleRegister()}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
