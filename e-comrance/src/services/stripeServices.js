import axios from 'axios';

const baseURL = 'http://localhost:3003';

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
