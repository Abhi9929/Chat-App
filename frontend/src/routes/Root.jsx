import React, { useEffect, useState } from 'react';
import SideBar from '../components/Sidebar/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { ContextProvider } from '../context';
import URI from '../config';
import axios from 'axios';

function Root() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));
  
  
  const [data, setData] = useState({});
  useEffect(() => {
    if(!token) {
      navigate('/signin')
    }
    async function getUserDetail() {
      try {
        const response = axios.post(
          `${URI}/users/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const { data } = (await response).data;
        setData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getUserDetail();
  }, []);

  return (
    <ContextProvider value={{user: data}} >
      <div className='w-full grid place-content-center h-screen bg-slate-200'>
        <div className='w-[95vw] h-[95vh] flex rounded-md overflow-hidden border border-slate-200 shadow-lg'>
          <div className='flex flex-col w-fit h-full bg-[#eee]'>
            <SideBar />
          </div>
          <div className='w-full h-full !pl-[2px]'>
            <Outlet />
          </div>
        </div>
      </div>
    </ContextProvider>
  );
}

export default Root;
