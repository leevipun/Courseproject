import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const baseURL = "http://localhost:3003";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

export const Login = async (email, password) => {
  console.log(email, password);
  try {
    const response = await axios.post(`${baseURL}/api/login`, {
      email: email,
      password: password,
    });

    const token = response.data.token; // Assuming your token is in the response.data

    // Set the token in localStorage
    setToken(token);

    console.log(response.data);
    console.log("palautetaan");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

export const registery = async (email, name, password, style) => {
  console.log(email, name, password, style);

  const id = uuidv4();

  try {
    const response = await axios.post(`${baseURL}/api/users`, {
      email: email,
      name: name,
      password: password,
      style: style,
      id: id,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const Adding = async (
  name,
  country,
  price,
  currency,
  description,
  pics
) => {
  const newObject = {
    name,
    country,
    price,
    currency,
    description,
    pics,
  };

  const config = {
    headers: { Authorization: token },
  };

  console.log("Token before request:", token);

  try {
    const response = await axios.post(
      `${baseURL}/api/listings`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

const getAllListings = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/listings`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addToCart = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    console.log(id);
    const response = await axios.post(`${baseURL}/api/cart`, { id }, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getAllCartItems = async () => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.get(`${baseURL}/api/cart`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getImages = async () => {
  try {
    const response = await axios.get(`${baseURL}/images`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default { setToken, getAllListings, getAllCartItems, getImages };
