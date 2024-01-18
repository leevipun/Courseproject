import axios from 'axios';

const baseURL = 'https://courseproject-backend-6lyy.onrender.com';

export let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAdminCartItems = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.get(`${baseURL}/api/cart/admin/${id}`, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const adminDeleteCartItem = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.delete(
      `${baseURL}/api/cart/admin/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};
