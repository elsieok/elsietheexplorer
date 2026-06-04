'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '3rem 1.25rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'var(--danger-50)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          fontSize: '1.75rem',
        }}
      >
        ⚠️
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.375rem, 3vw, 1.875rem)',
          fontWeight: 600,
          color: 'var(--gray-900)',
          letterSpacing: '-0.02em',
          marginBottom: '0.625rem',
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          color: 'var(--gray-500)',
          fontSize: '1rem',
          marginBottom: '2rem',
          maxWidth: '38ch',
        }}
      >
        An unexpected error occurred. Please try again or go back home.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          className="btn btn-primary"
        >
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Go home
        </Link>
      </div>
    </div>
  );
}