import axios from 'axios';

const verify = async (token: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  //   try {
  const response = await axios.get(`${url}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
};

export default verify;
