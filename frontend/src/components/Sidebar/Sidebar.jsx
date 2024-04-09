/* eslint-disable react-refresh/only-export-components */
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useEffect } from 'react';
import { getContacts } from '../../allContacts';
import { useLoaderData } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import Person from './Person';
import axios from 'axios';
import URI from '../../config';
import { useGlobalContext } from '../../context';

export async function loader() {
  const response = await axios.get(`${URI}/users/sync`);
  const data = (await response).data;
  const users = data.allUsers;
  return { users };
}

function SideBar() {
  const { users } = useLoaderData();
  const contacts = users;
  
  const { user } = useGlobalContext();
  return (
    <>
      <Header />
      <SearchBar />
      <div className='bg-[#eee] px-3 overflow-scroll pb-4'>
        <div className='contact-list bg-[#f6f6f6] pt-2 shadow-md'>
          <h1 className='text-xl font-bold ml-3 pb-2'>Add new Chat</h1>
          <hr />
          <ul className='py-2 text-xl '>
            {contacts
              .filter((person) => person._id !== user._id)
              .map((person) => (
                <Person key={person._id} info={person} />
              ))}
          </ul>
        </div>
        <style>
          {`
          ::-webkit-scrollbar {display:none;}
        `}
        </style>
      </div>
    </>
  );
}

export default SideBar;
