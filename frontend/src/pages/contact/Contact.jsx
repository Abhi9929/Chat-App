/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getContact } from '../../allContacts';
import Header from '../../components/chat/Header';
import Message from '../../components/chat/Message';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Icon, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';

export async function loader({ params }) {
  const contactPerson = await getContact(params.contactId);
  return { contactPerson };
}

function Contact() {
  const { contactPerson } = useLoaderData();

  const [message, setMessage] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header details={contactPerson} />
      <div
        className='chat_body overflow-scroll '
        style={{
          maxHeight: 'calc(95vh - 114px)',
        }}
      >
        <div
          className='chat__area h-full bg-[#E1D7CF] p-2 pb-2 overflow-scroll'
          style={{ overflow: 'scroll' }}
        >
          {[
            false,
            true,
            true,
            false,
            false,
            true,
            true,
            false,
            false,
            true,
            true,
            false,
            false,
            true,
            true,
            false,
          ].map((value, index) => (
            <Message key={index} reciever={value} details={contactPerson} />
          ))}
          <style>
            {`
  ::-webkit-scrollbar {
    width: 10px; 
  }
  `}
          </style>
        </div>
      </div>
      <div className='chat__footer flex bg-slate-300 w-full items-center gap-2 py-2 px-2'>
        <form
          className='relative flex w-full gap-2 items-center'
          onSubmit={handleSubmit}
        >
          <div className='absolute top-0 left-0'>
            <IconButton>
              <InsertEmoticonIcon />
            </IconButton>
          </div>
          <input
            type='text'
            className='w-full p-1 rounded-full py-2 ps-10'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <MicIcon />
          <div className='bg-green-500 rounded-full'>
            <IconButton type='submit'>
              <SendIcon className='text-white' sx={{ width: 25, height: 25 }} />
            </IconButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
