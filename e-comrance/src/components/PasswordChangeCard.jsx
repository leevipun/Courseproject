import React from 'react';
import {Form, Input, Button} from 'antd';
import {useDispatch} from 'react-redux';
import {addNotification} from '../../reducer/notificationReducer.js';
import {changePassword} from '../services/userServices.js';

const PasswordChange = ({setLoading, setSpinTip}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handlePasswordSave = async (values) => {
    try {
      console.log(values.password);
      setSpinTip('Changing password...');
      setLoading(true);
      const response = await changePassword(values.password);
      setLoading(false);
      dispatch(addNotification(response));
    } catch (error) {
      console.error('Error occurred while changing passwordzz:', error.error);
      dispatch(addNotification(error.error));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPassword = async (values) => {
    try {
      console.log(values.password);
      const token = window.location.search.split('=')[1];
      console.log('token', token);
      const response = await changePassword(values.password, token);
      window.location.href = '/login';
      dispatch(addNotification(response));
    } catch (error) {
      console.log('error', error);
      console.error('Error occurred while changing password:', error.error);
      dispatch(addNotification(error.error));
    }
  };

  return (
    <Form
      form={form}
      id='form'
      onFinish={
        window.location.pathname.split('/')[1] === 'reset-password'
          ? handleNewPassword
          : handlePasswordSave
      }
      style={{padding: '30px'}}
    >
      <Form.Item
        name='password'
        label='Password'
        rules={[{required: true, message: 'Please enter your password'}]}
      >
        <Input.Password autoComplete='new-password' style={{width: 300}} />
      </Form.Item>

      <Form.Item
        name='password2'
        label='Repeat Password'
        dependencies={['password']}
        hasFeedback
        rules={[
          {required: true, message: 'Please repeat your password'},
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords do not match');
            },
          }),
        ]}
      >
        <Input.Password autoComplete='new-password' style={{width: 300}} />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Save Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordChange;
