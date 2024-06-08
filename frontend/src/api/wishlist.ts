import axios from 'axios';

export const getWishlist = async (token: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.get(`${url}/books/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
