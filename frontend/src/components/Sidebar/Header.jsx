import React from 'react'
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from '@mui/material';

function Header() {
  return (
    <div className='flex justify-between items-center bg-[#ccc]'>
        <div className='avatar'>
          <IconButton>
          <Avatar src='https://avatars.githubusercontent.com/u/130915036?v=4' />
          </IconButton>
        </div>
        <div className='icons'>
          <IconButton >
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

  )
}

export default Header