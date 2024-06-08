import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import addToWishlist from '../../../../../api/add-to-wishlist';
import { useEffect, useState } from 'react';

interface HeartProps {
  item: any;
}

const Heart = ({ item }: HeartProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    setIsWishlisted(item.isWishlisted);
  }, [item.isWishlisted]);
  const onHeartHandler = async (value: any) => {
    console.log('value', value?.id);
    try {
      setIsWishlisted(!isWishlisted);
      const res = await addToWishlist(value?.id, localStorage.getItem('token') as string);
      console.log('res', res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isWishlisted ? (
        <div
          className="fixed top-10 right-0 m-2 text-red-700 hover:text-red-200 cursor-pointer"
          onClick={() => onHeartHandler(item)}>
          <FavoriteTwoToneIcon />
        </div>
      ) : (
        <div
          className="fixed top-10 right-0 m-2 text-red-100 hover:text-red-500 cursor-pointer"
          onClick={() => onHeartHandler(item)}>
          <FavoriteTwoToneIcon />
        </div>
      )}
    </>
  );
};

export default Heart;
