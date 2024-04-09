/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Header from '../../components/chat/Header';
import Message from '../../components/chat/Message';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Icon, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import URI from '../../config';
import Pusher from 'pusher-js';

const token = JSON.parse(localStorage?.getItem('token'));
export async function loader({ params }) {
  const JWT_Token = JSON.parse(localStorage?.getItem('token'));
  const response = axios.post(
    `${URI}/users/verify`,
    {},
    {
      headers: {
        Authorization: `Bearer ${JWT_Token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const { data } = (await response).data;
  const senderInfo = data;
  const response2 = await axios.get(
    `${URI}/users/receiver/${params.receiverId}`
  );
  const receiverInfo = (await response2).data;
  return { receiverInfo, senderInfo };
}

function Contact() {
  const { receiverInfo, senderInfo } = useLoaderData();
  const [message, setMessage] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [msgArr, setMsgArr] = useState([]);
  const [isMessageChanged, setIsMessageChanged] = useState(false);

  const inputRef = useRef(null);
  const scrollableDiv = useRef(null);

  let { receiverId } = useParams();
  
  if (scrollableDiv.current !== null) {
    scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
  }

  // console.log(receiverInfo);
  // console.log("sender: " + senderInfo?.username + "  " + "receiver: " + receiverInfo?.data.username);
  useEffect(() => {
    console.log("useEffect 1");
    async function SyncMessage() {
      const response = await axios.get(`${URI}/messages/sync/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const { data } = response.data;
      let newData = data.map((data) => ({
        message: data.content,
        sender: data.senderDetails.username,
        receiver: data.receiverDetails.username,
        timestamp: data.createdAt,
        id: data._id,
      }));
      setMsgArr(newData);
      setIsMessageChanged(true);    
    }
    SyncMessage();
    scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
  }, [receiverId]);

  useEffect(() => {
    console.log("useEffect 2");
    var pusher = new Pusher('615276f32877e0dd5e82', {
      cluster: 'sa1',
    });
    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      setMsgArr((prevMsg) => [
        ...prevMsg,
        {
          receiver: receiverInfo.data.username,
          sender: senderInfo?.username,
          message: data.content,
          id: data._id,
          timestamp: data.timestamp,
        },
      ]);
    });

    scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [msgArr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length == 0) {
      setErrorAlert(true);
      inputRef.current.focus();
      return;
    }
    async function sendMessage() {
      await axios.post(
        `${URI}/messages/new`,
        {
          content: message,
          receiverId: receiverInfo?.data?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    sendMessage();    
    setIsMessageChanged((prevState) => !prevState);
    inputRef.current.focus();
    setMessage('');
  };
  console.log("msgArr: ", msgArr);
  return (
    <>
      <Header userInfo={receiverInfo.data} />
      <div
        className='chat_body overflow-scroll '
        style={{
          height: 'calc(95vh - 114px)',
        }}
      >
        <div
          className='chat__area h-full bg-[#E1D7CF] p-2 pb-2 overflow-scroll'
          style={{ overflow: 'scroll' }}
          ref={scrollableDiv}
        >
          {msgArr?.map((data) => (
            <Message key={data.id} data={data} />
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
            className={`w-full p-1 rounded-full outline-none py-2 ps-10 ${
              errorAlert && 'border border-red-500'
            }`}
            ref={inputRef}
            value={message}
            onChange={(e) => {
              setErrorAlert(false);
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
