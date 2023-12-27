import axios from "axios";

const baseURL = "http://localhost:3003";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

export const Login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/api/login`, {
      email: email,
      password: password,
    });

    const token = response.data.token;

    setToken(token);

    console.log(response.data);
    console.log("palautetaan");
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw { error: error.response.data.error };
  }
};

export const registery = async (newObject) => {
  try {
    const response = await axios.post(`${baseURL}/api/users`, {
      newObject,
    });
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw { error: error.response.data.error };
  }
};

export const Adding = async (
  name,
  country,
  price,
  currency,
  category,
  description,
  pics
) => {
  const newObject = {
    name,
    country,
    price,
    currency,
    category,
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
    throw { error: error.response.data.error };
  }
};

const getAllListings = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/listings`);
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const addToCart = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    console.log(id);
    const response = await axios.post(`${baseURL}/api/cart`, { id }, config);
    console.log("Response ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error.response.data.error;
  }
};

const getAllCartItems = async () => {
  try {
    let config = {
      headers: { Authorization: token },
    };
    while (!token) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(`${baseURL}/api/cart`, config);
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

const getImages = async () => {
  try {
    const response = await axios.get(`${baseURL}/images`);
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const deleteCartItem = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseURL}/api/cart/${id}`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw { error: error.response.data.error };
  }
};

export const getUserData = async () => {
  try {
    let config = {
      headers: { Authorization: token },
    };
    while (!token) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    config = {
      headers: { Authorization: token },
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

export const getAllFavoriteItems = async () => {
  try {
    let config = {
      headers: { Authorization: token },
    };
    while (!token) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(`${baseURL}/api/favorite`, config);
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const addToFavorites = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    console.log(id);
    const response = await axios.post(
      `${baseURL}/api/favorite`,
      { id },
      config
    );
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const deleteFavorite = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(
      `${baseURL}/api/favorite/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const updateUserInfo = async (email, name, address, phone) => {
  const config = {
    headers: { Authorization: token },
  };
  const newObject = {
    email: email,
    name: name,
    address: address,
    phone: phone,
  };
  console.log(token);
  console.log(newObject);
  try {
    const response = await axios.put(
      `${baseURL}/api/users/`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    console.log("Error", error);
    console.log("Data", error.response.data.error);
    throw { error: error.response.data.error };
  }
};

export const changePassword = async (password) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(
      `${baseURL}/api/users/password`,
      { password },
      config
    );
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const userDelete = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseURL}/api/users`, config);
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const getUsersListings = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(`${baseURL}/api/users/listings`, config);
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
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
    console.log("Yritetään päivittää");
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(
      `${baseURL}/api/listings`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const deleteUserListing = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(
      `${baseURL}/api/listings/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const createPaymentIntent = async (items, userId) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/checkout/create-payment-intent`,
      { items, userId }
    );
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
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
    throw { error: error.response.data.error };
  }
};

export const updateListing = async (newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(
      `${baseURL}/api/listings`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const sendReceipt = async (email, sellerEmail, items) => {
  try {
    console.log("Buyer receipt", email, sellerEmail, items);
    const response = await axios.post(`${baseURL}/api/email/buyer`, {
      email,
      sellerEmail,
      items,
    });
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const sellerReceipt = async (email, sellerEmail, items) => {
  try {
    console.log("Seller receipt", email, sellerEmail, items);
    const response = await axios.post(`${baseURL}/api/email/seller`, {
      email,
      sellerEmail,
      items,
    });
    console.log("sent");
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export const sendContactEmail = async (email, name, message) => {
  try {
    console.log("Contact email", email, name, message);
    const response = await axios.post(`${baseURL}/api/email/contact`, {
      email,
      name,
      message,
    });
    console.log("sent");
    return response.data;
  } catch (error) {
    throw { error: error.response.data.error };
  }
};

export default { setToken, getAllListings, getAllCartItems, getImages };
