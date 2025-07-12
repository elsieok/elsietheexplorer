'use client'; // this must be a client component

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 className='text-gray-900'> 500 - Server Error </h1>
      <p className='text-gray-900'> Something went wrong. Please try again later. </p>
      <button onClick={() => reset()} className='text-gray-900 underline hover:text-[#6B2D2C]'>Try Again</button>
      <br />
      <a href="/" className='text-gray-900 underline hover:text-[#6B2D2C]'>Go home</a>
    </div>
  );
}