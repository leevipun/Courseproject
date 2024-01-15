import axios from 'axios';

const baseURL = 'https://courseproject-backend-6lyy.onrender.com';

export const createPaymentIntent = async (items, userId) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/checkout/create-payment-intent`,
      {items, userId}
    );
    return response.data;
  } catch (error) {
    throw {error: error.response.data.error};
  }
};
