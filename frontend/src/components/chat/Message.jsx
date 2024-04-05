/* eslint-disable react/prop-types */
import React from 'react';

function Message({reciever, details}) {
  return (
    <p
      className={`chat_message bg-slate-200 rounded-[10px] relative mb-8 px-2 w-fit py-1 mt-2 max-w-80`}
      style={reciever ? recieverStyle : {}}
    >
      <span className='chat_name text-[12px] font-semibold absolute -top-4'>
        {reciever ? details.first : 'Sonny'}
      </span>
      This is a message
      <span className='chat_timestamp ml-3 text-[10px]'>
        {new Date().toUTCString()}
      </span>
    </p>
  );
}

const recieverStyle = {
  marginLeft: 'auto',
  backgroundColor: '#dcf8c6',
};
export default Message;
