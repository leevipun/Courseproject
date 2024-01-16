import axios from 'axios';
import {token} from './adminServices.js';

const baseURL = 'http://localhost:3003';

export const startMessages = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    console.log(config);
    const reponse = await axios.post(`${baseURL}/api/chats`, {id}, config);
    return reponse.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const sendMessage = async (newObject, id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.post(
      `${baseURL}/api/chats/post/${id}`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const getAllMessages = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.get(`${baseURL}/api/chats/${id}`, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const getAllChats = async () => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.get(`${baseURL}/api/chats`, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const getAdminChats = () => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = axios.get(`${baseURL}/api/chats/admin`, config);
    return response;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const editMessage = async (newObject, id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.put(
      `${baseURL}/api/messages/${id}`,
      newObject,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const deleteMessage = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.delete(
      `${baseURL}/api/messages/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const deleteChat = async (id) => {
  try {
    const config = {
      headers: {Authorization: token},
    };
    const response = await axios.delete(`${baseURL}/api/chats/${id}`, config);
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};
