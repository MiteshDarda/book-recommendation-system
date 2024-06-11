import axios from 'axios';

export const signUp = async (name: string, email: string, password: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(`${url}/auth/register`, {
    name,
    email,
    password
  });
  return response.data;
};
