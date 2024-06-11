import { useEffect, useState } from 'react';
import getSuggestions from '../../../api/get-suggestions';
import { Box, LinearProgress } from '@mui/material';
import ItemsRow from './ItemsRow';

const Suggestions = () => {
  //* ------------------------------------------- CONSTANTS/STATES -------------------------------------------
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = (await getSuggestions(localStorage.getItem('token') as string)) as any;
        if (response) {
          setSuggestions(response);
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
  return (
    <div className="w-[90%] flex flex-col justify-center items-left">
      {loading ? (
        <Box sx={{ width: '100%', margin: '1rem' }}>
          <LinearProgress sx={{ height: '1rem', borderRadius: '1rem' }} />
        </Box>
      ) : (
        <ItemsRow items={suggestions} heading="Suggestions" />
      )}
    </div>
  );
};

export default Suggestions;
