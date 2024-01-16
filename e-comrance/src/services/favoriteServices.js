import axios from 'axios';
import {token} from './adminServices.js';

const baseURL = 'http://localhost:3003';

export const getAllFavoriteItems = async () => {
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
    const response = await axios.get(`${baseURL}/api/favorite`, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const addToFavorites = async (id) => {
  const config = {
    headers: {Authorization: token},
  };
  try {
    console.log(id);
    const response = await axios.post(`${baseURL}/api/favorite`, {id}, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const deleteFavorite = async (id) => {
  const config = {
    headers: {Authorization: token},
  };
  try {
    const response = await axios.delete(
      `${baseURL}/api/favorite/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};
