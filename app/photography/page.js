'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, MapPin, Calendar, Camera } from 'lucide-react'

export default function PhotographyPage() {
  const [selected, setSelected] = useState(null)
  const [sizes, setSizes] = useState({})
  const [ready, setReady] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)

  const photos = [
    // Add photos here as objects:
    // { id: '1', src: '/photos/aboutPic/about.jpg', title: 'Title', location: 'City, Country', date: 'Month Year' }
  ]

  useEffect(() => {
    const update = () => {
      const el = document.getElementById('gallery-container')
      if (el) setContainerWidth(el.clientWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (photos.length > 0 && Object.keys(sizes).length === photos.length) setReady(true)
  }, [sizes, photos.length])

  const handleLoad = (id, img) => {
    setSizes(prev => ({ ...prev, [id]: { width: img.naturalWidth, height: img.naturalHeight } }))
  }

  // Simple masonry-ish layout without external dep
  const columns = containerWidth >= 900 ? 3 : containerWidth >= 600 ? 2 : 1
  const colWidth = (containerWidth - (columns - 1) * 8) / columns

  const cols = Array.from({ length: columns }, () => [])
  const colHeights = Array(columns).fill(0)
  photos.forEach(photo => {
    const shortest = colHeights.indexOf(Math.min(...colHeights))
    cols[shortest].push(photo)
    const ratio = (sizes[photo.id]?.height ?? 1) / (sizes[photo.id]?.width ?? 1)
    colHeights[shortest] += colWidth * ratio + 8
  })

  return (
    <div style={{ maxWidth: '72rem', marginInline: 'auto', padding: '3rem 1.25rem 5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--gray-900)',
            letterSpacing: '-0.025em',
            marginBottom: '0.5rem',
          }}
        >
          Photography
        </h1>
        <p style={{ color: 'var(--gray-500)', fontSize: '1.0625rem', margin: 0 }}>
          Capturing moments from adventures around the world.
        </p>
      </div>

      {/* Empty state */}
      {photos.length === 0 && (
        <div
          style={{
            padding: '5rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 'var(--radius-xl)',
              background: 'var(--brand-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginInline: 'auto',
              marginBottom: '1.5rem',
              fontSize: '2.25rem',
            }}
          >
            <Camera color: "#8b5cf6" />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--gray-800)',
              marginBottom: '0.625rem',
              letterSpacing: '-0.015em',
            }}
          >
            Gallery coming soon
          </h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '1rem', margin: 0, maxWidth: '36ch', marginInline: 'auto' }}>
            Currently curating my favourite shots from travels and adventures.
          </p>
        </div>
      )}

      {/* Hidden probes */}
      {photos.length > 0 && !ready && (
        <div style={{ visibility: 'hidden', position: 'absolute' }}>
          {photos.map(photo => (
            <Image
              key={photo.id}
              src={photo.src}
              alt=""
              width={10}
              height={10}
              onLoadingComplete={img => handleLoad(photo.id, img)}
            />
          ))}
        </div>
      )}

      {/* Gallery grid */}
      {photos.length > 0 && ready && (
        <div
          id="gallery-container"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '8px',
          }}
        >
          {cols.map((col, ci) => (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {col.map(photo => {
                const ratio = (sizes[photo.id]?.height ?? 1) / (sizes[photo.id]?.width ?? 1)
                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelected(photo)}
                    style={{
                      position: 'relative',
                      paddingBottom: `${ratio * 100}%`,
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                      background: 'var(--gray-100)',
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 300ms ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {/* Hover overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)',
                        opacity: 0,
                        transition: 'opacity 200ms ease',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '1rem',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                    >
                      <div>
                        <p style={{ fontWeight: 600, color: 'white', fontSize: '0.9375rem', margin: '0 0 0.2rem' }}>{photo.title}</p>
                        {photo.location && (
                          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8125rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={12} /> {photo.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 150ms ease',
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              top: '1.25rem',
              right: '1.25rem',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 101,
            }}
          >
            <X size={18} />
          </button>

          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh' }}
          >
            <Image
              src={selected.src}
              alt={selected.title}
              width={1400}
              height={900}
              style={{
                objectFit: 'contain',
                maxHeight: '80vh',
                borderRadius: 'var(--radius-lg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                padding: '1.5rem 1.25rem 1rem',
                borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
              }}
            >
              <p style={{ fontWeight: 600, color: 'white', fontSize: '1.0625rem', margin: '0 0 0.25rem' }}>
                {selected.title}
              </p>
              <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>
                {selected.location && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} /> {selected.location}
                  </span>
                )}
                {selected.date && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={13} /> {selected.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}