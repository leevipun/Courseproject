import axios from "axios";

export const Login = async (username, password) => {
  console.log(username, password);
  try {
    const response = await axios.post(`http://localhost:3003/api/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registery = async (username, name, password) => {
  console.log(username, name, password);
  try {
    const response = await axios.post(`http://localhost:3003/api/users`, {
      username,
      name,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
