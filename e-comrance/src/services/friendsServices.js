const baseURL = "https://courseproject-backend-6lyy.onrender.com"

const token = window.sessionStorage.getItem("loggedNoteappUser")

export const sendFriendRequest = async (id) => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.post(
        `${baseURL}/api/friends/sendRequest`,
        { id },
        config
      );
      return response.data;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  };
  
  export const getAllFollowers = async () => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.get(`${baseURL}/api/friends`, config);
      return response.data;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  };
  
  export const getAllRequests = async () => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.get(`${baseURL}/api/friends/requests`, config);
      return response.data;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  };
  
  export const acceptFriendRequest = async (id) => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.put(
        `${baseURL}/api/friends/accept`,
        { id },
        config
      );
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  };
  
  export const deleteFriendRequest = async (id) => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.delete(
        `${baseURL}/api/friends/requests/${id}`,
        config
      );
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  };
  
  export const deleteFriend = async (id) => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.delete(`${baseURL}/api/friends/${id}`, config);
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  };