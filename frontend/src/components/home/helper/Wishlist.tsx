import { useEffect, useState } from 'react';
import ItemsRow from './ItemsRow';
import { getWishlist } from '../../../api/wishlist';
import { Box, LinearProgress } from '@mui/material';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = (await getWishlist(localStorage.getItem('token') as string)) as any;
        if (response) {
          setWishlistItems(response);
        } else if (response?.error) {
          console.log('error', response?.error);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  useEffect(() => {
    console.log('wishlistItems', wishlistItems);
  }, [wishlistItems]);
  return (
    <div className="w-[80%] flex flex-col justify-center items-center">
      {loading ? (
        <Box sx={{ width: '50%', margin: '1rem' }}>
          <LinearProgress sx={{ height: '1rem', borderRadius: '1rem' }} />
        </Box>
      ) : (
        <ItemsRow items={wishlistItems} heading="Wishlist" />
      )}
    </div>
  );
};
export default Wishlist;
