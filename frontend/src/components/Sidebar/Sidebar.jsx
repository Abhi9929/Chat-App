import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React from 'react';
import { getContacts } from '../../allContacts';
import { Link } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import Person from './Person';

('use client');

function SideBar() {
  const contacts = getContacts();
  return (
    <>
      <Header />
      <SearchBar />
      <div className='bg-[#eee] px-3 overflow-scroll pb-4'>
        <div className='contact-list bg-[#f6f6f6] pt-2 shadow-md'>
          <h1 className='text-xl font-bold ml-3 pb-2'>Add new Chat</h1>
          <hr />
          <ul className='py-2 text-xl '>
            {contacts.map((person) => {
              return <Person key={person.id} person={person} />;
            })}
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
