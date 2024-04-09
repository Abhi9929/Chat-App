/* eslint-disable react/prop-types */
import React from 'react';
import { useGlobalContext } from '../../context';

function Message({ data }) {
  const { user } = useGlobalContext();

  const { message, sender, receiver, timestamp } = data;
  console.log(message, sender, receiver);
  const date = new Date(timestamp); 
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const time = date.toLocaleDateString('en-US', options);   

  // for sender
  let boolVal = true;
  if (user.username !== sender) {
    //for receiver
    boolVal = false;
  }

  return (
    <p
      className={`chat_message bg-slate-200 rounded-[10px] relative mb-8 px-2 w-fit py-1 mt-2 max-w-80`}
      style={boolVal ? senderStyle : receiverStyle}
    >
      <span className='chat_name text-[12px] font-semibold absolute -top-4'>
        {sender}
      </span>
      {message}
      <span className='chat_timestamp ml-3 text-[10px]'>
        {time}
      </span>
    </p>
  );
}

const senderStyle = {
  marginLeft: 'auto',
  backgroundColor: '#dcf8c6',
};
const receiverStyle = {
  marginLeft: 'none',
  backgroundColor: 'white',
};
export default Message;
