import axios from 'axios';

export const searchQuery = async (query: string, token: string) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${url}/books?query=${query}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios
    .request(config)
    .then((response: any) => {
      return { data: response.data };
    })
    .catch((error: any) => {
      return { error: error };
    });
};
