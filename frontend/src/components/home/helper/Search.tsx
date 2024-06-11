import { SearchOutlined } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  LinearProgress,
  Paper,
  Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { searchQuery } from '../../../api/search-query';
import { useState } from 'react';
import ItemsRow from './ItemsRow';
import { messageSlice } from '../../../store/reducers/message_slice';
import { MessageTypeEnum } from '../../../store/reducers/enums/message_type.enum';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  //* ------------------------------------------- CONSTANTS/STATES -------------------------------------------
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([] as any[]);
  const [searchTerm, setSearchTerm] = useState('' as string);
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

  const searchHandler = async (data: any) => {
    setLoading(true);
    setSearchTerm(data.query);
    try {
      const response = (await searchQuery(
        data.query,
        localStorage.getItem('token') as string
      )) as any;
      if (response?.data) {
        setSearchResults(response?.data);
      } else if (response?.error) {
        console.log('error', response?.error);
      }
    } catch (error: any) {
      errorHandling(error);
    } finally {
      setLoading(false);
    }
  };

  //* ------------------------------------------- JSX -------------------------------------------
  return (
    <div className="w-[90%] flex flex-col justify-center items-left">
      <div className="w-full">
        <Paper
          onSubmit={handleSubmit((data: any) => searchHandler(data))}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <InputBase
            disabled={loading}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search For Books"
            inputProps={{ 'aria-label': 'search books' }}
            {...register('query', { required: true })}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled={loading}>
            {loading ? <CircularProgress size={'24px'} /> : <SearchOutlined />}
          </IconButton>
        </Paper>
      </div>
      {/* 
      //$ --------------------------------- SEARCH RESULTS / BOOKS ---------------------------------  
      */}

      {loading ? (
        <Box sx={{ width: '100%', margin: '1rem' }}>
          <Typography variant="h6">Searching...</Typography>
          <LinearProgress color="inherit" sx={{ height: '1rem', borderRadius: '1rem' }} />
        </Box>
      ) : (
        <ItemsRow items={searchResults} heading={`Search Results for ${searchTerm}`} />
      )}
    </div>
  );
};

export default Search;
