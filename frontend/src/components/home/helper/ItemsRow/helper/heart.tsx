import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import addToWishlist from '../../../../../api/add-to-wishlist';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';

interface HeartProps {
  item: any;
}

const Heart = ({ item }: HeartProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    setIsWishlisted(item.isWishlisted);
  }, [item.isWishlisted]);
  const onHeartHandler = async (value: any) => {
    try {
      setIsWishlisted(!isWishlisted);
      await addToWishlist(value?.id, localStorage.getItem('token') as string);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isWishlisted ? (
        <Tooltip title="Remove from wishlist">
          <div
            className="fixed top-10 right-0 m-2 text-red-700 hover:text-red-200 cursor-pointer"
            onClick={() => onHeartHandler(item)}>
            <FavoriteTwoToneIcon />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title="Add to wishlist">
          <div
            className="fixed top-10 right-0 m-2 text-red-100 hover:text-red-500 cursor-pointer"
            onClick={() => onHeartHandler(item)}>
            <FavoriteTwoToneIcon />
          </div>
        </Tooltip>
      )}
    </>
  );
};

export default Heart;
