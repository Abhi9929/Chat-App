import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import { useGlobalContext } from '../../context';

function Header() {
  const { user } = useGlobalContext();
  const username = `${user.username?.charAt(0).toUpperCase()}${user.username?.slice(1)}`;
  return (
    <div className='flex justify-between items-center bg-[#ccc]'>
      <div className='avatar flex items-center'>
        <IconButton>
          <Avatar src='https://avatars.githubusercontent.com/u/130915036?v=4' />
        </IconButton>
        <span>{username.includes('undefined') ? 'User' : username}</span>
      </div>
      <div className='icons'>
        <IconButton>
          <DonutLargeIcon className='!text-xl' />
        </IconButton>
        <IconButton>
          <ChatIcon className='!text-xl' />
        </IconButton>
        <IconButton>
          <MoreVertIcon className='!text-xl' />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
