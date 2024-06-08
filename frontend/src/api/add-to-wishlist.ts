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

// const axios = require('axios');
// let data = JSON.stringify({
//   bookId: 'rb4YAAAAYAAJ'
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'http://localhost:3000/api/books/wishlist?bookId=rb4YAAAAYAAJ',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im1pdGVzaCIsImlhdCI6MTcxNzg2NTUxMSwiZXhwIjoxNzE3ODY3MzExfQ.X_9BgkTrvjpdUkIRVgoq03ungE234gIaA-Myn5ew5MM'
//   },
//   data: data
// };

// axios
//   .request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });
