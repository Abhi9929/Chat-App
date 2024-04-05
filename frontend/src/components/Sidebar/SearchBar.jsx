import React from 'react';
import { Form } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

function SearchBar() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 mb-6  rounded-sm py-3 px-3'>
      <div className='flex gap-1 items-center bg-white relative rounded-md'>
        <IconButton >
          <SearchIcon className='' />
        </IconButton>
        <form id='search-form' role='search'>
          <input
            id='q'
            aria-label='Search contacts'
            placeholder='Search'
            type='search'
            name='q'
            className='px-2 py-1 rounded-lg outline-none'
          />
          <div id='search-spinner' aria-hidden hidden={true} />
          <div className='sr-only' aria-live='polite'></div>
        </form>
        {/* <Form method='post'>
          <button type='submit' className=' bg-slate-500 px-3 py-1 rounded-lg'>
            New
          </button>
        </Form> */}
      </div>
    </div>
  );
}

export default SearchBar;
