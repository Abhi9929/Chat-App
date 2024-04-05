import React from 'react';
import SideBar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
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
    </>
  );
}

export default Root;
