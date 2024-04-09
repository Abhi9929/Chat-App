/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import { light } from '@mui/material/styles/createPalette';
import React from 'react';
import { Link } from 'react-router-dom';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 40,
      height: 40,
      fontSize: 18,
    },
    children: `${name.split('')[0].toUpperCase()}`,
  };
}

function Person({ info }) {
  // console.log(info);
  return (
    <li className='my-2'>
      <Link 
        to={`contacts/:${info._id}`}
        className='hover:bg-slate-200 w-full flex px-2 py-1 capitalize '
      >
        <div className='flex gap-3 items-start'>
          <Avatar className='relative top-1' {...stringAvatar(info.username)} />
          <div className=' flex flex-col'>
            <div className='name text-lg'>
              {info.username ? <>{info.username}</> : <i>No Name</i>}
            </div>
            <div className="message text-[12px] text-slate-700 ">
              this is the last message
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Person;
