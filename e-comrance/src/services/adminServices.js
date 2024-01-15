const baseURL = "https://courseproject-backend-6lyy.onrender.com"

const token = window.sessionStorage.getItem("loggedNoteappUser")

export const getAdminCartItems = async (id) => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.get(`${baseURL}/api/cart/admin/${id}`, config);
      return response.data;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  };
  
  export const adminDeleteCartItem = async (id) => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.delete(
        `${baseURL}/api/cart/admin/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  };