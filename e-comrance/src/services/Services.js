import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const baseURL = "http://localhost:3003/";

export const Login = async (email, password) => {
  console.log(email, password);
  try {
    const response = await axios.post(`${baseURL}/api/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
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
