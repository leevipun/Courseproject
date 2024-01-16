import axios from 'axios';
import {token} from './adminServices.js';

const baseURL = 'https://courseproject-backend-6lyy.onrender.com';

export const getAllListings = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/listings`);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const Adding = async (newObject) => {
  const config = {
    headers: {Authorization: token},
  };

  try {
    const response = await axios.post(
      `${baseURL}/api/listings`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const getListing = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/api/listings/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const updateUsersListing = async (
  name,
  country,
  price,
  description,
  id
) => {
  try {
    const newObject = {
      name: name,
      country: country,
      price: price,
      description: description,
      id: id,
    };
    console.log('Yritetään päivittää');
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.put(
      `${baseURL}/api/listings`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const deleteUserListing = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.delete(
      `${baseURL}/api/listings/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const updateListing = async (newObject) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.put(
      `${baseURL}/api/listings`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};
