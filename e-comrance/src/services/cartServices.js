import axios from 'axios';
import {token} from './adminServices';

const baseURL = 'https://courseproject-backend-6lyy.onrender.com';

export const addToCart = async (id) => {
  const config = {
    headers: {Authorization: token},
  };
  try {
    console.log(id);
    const response = await axios.post(`${baseURL}/api/cart`, {id}, config);
    console.log('Response ', response.data);
    return response.data;
  } catch (error) {
    console.log('Error', error);
    throw error.response.data.error;
  }
};

export const getAllCartItems = async () => {
  try {
    let config = {
      headers: {Authorization: token},
    };
    while (!token) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    config = {
      headers: {Authorization: token},
    };
    const response = await axios.get(`${baseURL}/api/cart`, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const deleteCartItem = async (id) => {
  const config = {
    headers: {Authorization: token},
  };
  try {
    const response = await axios.delete(`${baseURL}/api/cart/${id}`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw {error: error.response.data.error};
  }
};
