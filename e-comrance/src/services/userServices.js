import axios from 'axios';
import {token} from './adminServices.js';

const baseURL = 'https://courseproject-backend-6lyy.onrender.com';

export const Login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/api/login`, {
      email: email,
      password: password,
    });

    console.log(response.data);
    console.log('palautetaan');
    return response.data;
  } catch (error) {
    console.log('Error', error);
    throw {error: error.response.data.error};
  }
};

export const getAuthor = async (id) => {
  try {
    console.log(id);
    const response = await axios.get(`${baseURL}/api/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const registery = async (newObject) => {
  try {
    const response = await axios.post(`${baseURL}/api/users`, {
      newObject,
    });
    return response.data;
  } catch (error) {
    console.log('Error', error);
    throw {error: error.response.data.error};
  }
};

export const getUserData = async () => {
  try {
    console.log('ollaan täällä');
    let config = {
      headers: {Authorization: token},
    };
    console.log(config);
    while (!token) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    config = {
      headers: {Authorization: token},
    };
    console.log(config);
    const response = await axios.get(`${baseURL}/api/users/info`, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const updateUserInfo = async ( newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    console.log(newObject)
    const response = await axios.put(
      `${baseURL}/api/users/`,
      newObject,
      config
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('Error', error);
    console.log('Data', error.response.data.error);
    throw { error: error.response.data.error };
  }
};

export const adminUpdateUserInfo = async (newObject, id) => {
  const config = {
    headers: {Authorization: token},
  };
  console.log(token);
  console.log(newObject);
  try {
    const response = await axios.put(
      `${baseURL}/api/users/${id}`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    console.log('Error', error);
    console.log('Data', error.response.data.error);
    throw {error: error.response.data.error};
  }
};

export const getUsersListings = async () => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.get(`${baseURL}/api/users/listings`, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const userDelete = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    console.log(token);
    const response = await axios.delete(`${baseURL}/api/users/${id}`, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const adminUserDelete = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    console.log(token);
    const response = await axios.delete(
      `${baseURL}/api/users/admin/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const updateStripeId = async (newObject) => {
  try {
    const response = await axios.patch(
      `${baseURL}/api/users/stripe`,
      newObject
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/users`);
    console.log('response', response.data);

    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const changePassword = async (password) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.put(
      `${baseURL}/api/users/password`,
      {password},
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};
