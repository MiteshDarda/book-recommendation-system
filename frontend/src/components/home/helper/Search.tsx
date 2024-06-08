import { SearchOutlined } from '@mui/icons-material';
import { IconButton, InputBase, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { searchQuery } from '../../../api/search-query';
import { useState } from 'react';
import ItemsRow from './ItemsRow';

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([] as any[]);

  const formSubmitHandler = async (data: any) => {
    setLoading(true);
    try {
      console.log('data', data);
      const response = (await searchQuery(data.query)) as any;
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

  return (
    <div className="w-[80%] flex flex-col justify-center items-center">
      <div className="w-full">
        <Paper
          onSubmit={handleSubmit((data: any) => formSubmitHandler(data))}
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
      <ItemsRow items={searchResults} />
    </div>
  );
};

export default Search;
