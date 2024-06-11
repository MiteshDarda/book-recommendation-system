import axios from 'axios';

const addToWishlist = async (bookId: string, token: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.post(
      `${url}/books/wishlist?bookId=${bookId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export default addToWishlist;
