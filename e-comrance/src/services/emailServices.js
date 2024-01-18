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

export const sendPasswordHasBeenChanged = async (email) => {
  try {
    console.log('Password has been changed', email);
    const response = await axios.post(`${baseURL}/api/email/password`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const sendForgotPasswordEmail = async (email) => {
  try {
    console.log('Forgot password email', email);
    const response = await axios.post(`${baseURL}/api/email/reset`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};

export const validateResetPasswordToken = async (email, token) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/email/reset-password/?email=${email}?token=${token}`
    );
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
