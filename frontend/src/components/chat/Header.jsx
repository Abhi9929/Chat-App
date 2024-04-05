/* eslint-disable react/prop-types */
import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function Header({details}) {
  const person = details;
  const img = 'https://avatars.githubusercontent.com/u/130915036?v=4';
  return (
    <div className='flex justify-between items-center bg-[#ccc] px-1 py-[6px]'>
      <div className='avatar'>
          <div className='flex gap-2 items-start'>
          <Avatar className='relative top-[2px]' src='https://avatars.githubusercontent.com/u/130915036?v=4' />
          {/* <Avatar  {...stringAvatar(person.first)} /> */}
          <div className=' flex flex-col'>
            <div className='name text-left text-lg'>
              {person.first ? <>{person.first}</> : <i>No Name</i>}
            </div>
            <div className="message text-[12px] text-slate-700 -mt-[2px]">
              last seen at...
            </div>
          </div>
        </div>
      </div>
      <div className='icons'>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon className='!text-xl' />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
