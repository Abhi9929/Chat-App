import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      id='error-page'
      className='h-screen grid place-content-center bg-slate-600'
    >
      <div className='text-center grid gap-3'>
        <h1 className='text-4xl'>Oops!</h1>
        <p className='text-2xl'>Sorry, an unexpected error has occured</p>
        <p className='text-xl'>
          <i>Page {error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
