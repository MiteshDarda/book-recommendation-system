import axios from 'axios';

const verify = async (token: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(`${url}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default verify;
