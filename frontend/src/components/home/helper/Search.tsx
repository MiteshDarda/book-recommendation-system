import { SearchOutlined } from '@mui/icons-material';
import { Box, IconButton, InputBase, LinearProgress, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { searchQuery } from '../../../api/search-query';
import { useState } from 'react';
import ItemsRow from './ItemsRow';

const Search = () => {
  //* ------------------------------------------- CONSTANTS/STATES -------------------------------------------
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([] as any[]);
  const [searchTerm, setSearchTerm] = useState('' as string);

  //* ------------------------------------------- FUNCTIONS -------------------------------------------
  const searchHandler = async (data: any) => {
    setLoading(true);
    setSearchTerm(data.query);
    try {
      const response = (await searchQuery(
        data.query,
        localStorage.getItem('token') as string
      )) as any;
      console.log('response', response);
      if (response?.data) {
        console.log('data', response?.data);
        setSearchResults(response?.data);
      } else if (response?.error) {
        console.log('error', response?.error);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  //* ------------------------------------------- JSX -------------------------------------------
  return (
    <div className="w-[80%] flex flex-col justify-center items-center">
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
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchOutlined />
          </IconButton>
        </Paper>
      </div>
      {/* 
      //$ --------------------------------- SEARCH RESULTS / BOOKS ---------------------------------  
      */}

      {loading ? (
        <Box sx={{ width: '50%', margin: '1rem' }}>
          <LinearProgress sx={{ height: '1rem', borderRadius: '1rem' }} />
        </Box>
      ) : (
        <ItemsRow items={searchResults} heading={`Search Results for ${searchTerm}`} />
      )}
    </div>
  );
};

export default Search;
