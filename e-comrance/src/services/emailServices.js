import axios from 'axios';

const baseURL = 'https://courseproject-backend-6lyy.onrender.com';

export const sendReceipt = async (email, sellerEmail, items) => {
  try {
    console.log('Buyer receipt', email, sellerEmail, items);
    const response = await axios.post(`${baseURL}/api/email/buyer`, {
      email,
      sellerEmail,
      items,
    });
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const sellerReceipt = async (email, sellerEmail, items) => {
  try {
    console.log('Seller receipt', email, sellerEmail, items);
    const response = await axios.post(`${baseURL}/api/email/seller`, {
      email,
      sellerEmail,
      items,
    });
    console.log('sent');
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const sendContactEmail = async (email, name, message) => {
  try {
    console.log('Contact email', email, name, message);
    const response = await axios.post(`${baseURL}/api/email/contact`, {
      email,
      name,
      message,
    });
    console.log('sent');
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};
