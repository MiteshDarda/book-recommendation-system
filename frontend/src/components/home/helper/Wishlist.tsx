import { useEffect, useState } from 'react';
import ItemsRow from './ItemsRow';
import { getWishlist } from '../../../api/wishlist';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = (await getWishlist(localStorage.getItem('token') as string)) as any;
        console.log('response', response);
        if (response) {
          console.log('data------', response);
          setWishlistItems(response);
          //   setWishlistItems(['a', 'b', 'c']);
          console.log('wishlistItems>>>>>', wishlistItems);
        } else if (response?.error) {
          console.log('error', response?.error);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchWishlist();
  }, []);

  useEffect(() => {
    console.log('wishlistItems', wishlistItems);
  }, [wishlistItems]);
  return (
    <div className="w-[80%] flex flex-col justify-center items-center">
      <ItemsRow items={wishlistItems} heading="Wishlist" />
    </div>
  );
};
export default Wishlist;
