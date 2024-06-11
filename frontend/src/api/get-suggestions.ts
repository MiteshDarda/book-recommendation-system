import axios from 'axios';

const getSuggestions = async (token: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.get(`${url}/books/suggestions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export default getSuggestions;
