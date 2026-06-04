import Link from 'next/link';

export default function NotFound() {
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
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(5rem, 15vw, 9rem)',
          fontWeight: 700,
          color: 'var(--brand-100)',
          lineHeight: 1,
          marginBottom: '0',
          letterSpacing: '-0.05em',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.375rem, 3vw, 1.875rem)',
          fontWeight: 600,
          color: 'var(--gray-900)',
          letterSpacing: '-0.02em',
          marginBottom: '0.75rem',
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          color: 'var(--gray-500)',
          fontSize: '1.0625rem',
          marginBottom: '2rem',
          maxWidth: '36ch',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn btn-primary"
      >
        ← Back to home
      </Link>
    </div>
  );
}