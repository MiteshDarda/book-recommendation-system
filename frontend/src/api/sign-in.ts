import axios from 'axios';

export const signIn = async (email: string, password: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(`${url}/auth/login`, {
    email,
    password
  });
  return response.data;
};
