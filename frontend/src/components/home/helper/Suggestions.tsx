import { useEffect, useState } from 'react';
import getSuggestions from '../../../api/get-suggestions';
import { Box, LinearProgress, Typography } from '@mui/material';
import ItemsRow from './ItemsRow';
import { messageSlice } from '../../../store/reducers/message_slice';
import { MessageTypeEnum } from '../../../store/reducers/enums/message_type.enum';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Suggestions = () => {
  //* ------------------------------------------- CONSTANTS/STATES -------------------------------------------
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //* ------------------------------------------- FUNCTIONS -------------------------------------------
  const errorHandling = (error: any) => {
    if (error?.response?.status === 403) {
      localStorage.clear();
      dispatch(
        messageSlice.actions.setMessage({
          type: MessageTypeEnum.ERROR,
          text: 'Opps!! Login Expired'
        })
      );
      navigate('/');
      return;
    }
    dispatch(
      messageSlice.actions.setMessage({
        type: MessageTypeEnum.ERROR,
        text:
          (error?.response?.data?.message?.constructor === Array &&
            error?.response?.data?.message?.[0]) ||
          error?.response?.data?.message ||
          'Something went wrong'
      })
    );
    console.log('error', error);
  };

  //* ------------------------------------------- USE EFFECT -------------------------------------------
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
      } catch (error: any) {
        errorHandling(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  //* ------------------------------------------- JSX -------------------------------------------
  return (
    <div className="w-[90%] flex flex-col justify-center items-left">
      {loading ? (
        <Box sx={{ width: '100%', margin: '1rem' }}>
          <Typography variant="h6">Suggestions Loading....</Typography>
          <LinearProgress color="inherit" sx={{ height: '1rem', borderRadius: '1rem' }} />
        </Box>
      ) : (
        <ItemsRow items={suggestions} heading="Suggestions" />
      )}
    </div>
  );
};

export default Suggestions;
