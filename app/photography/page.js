'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import justifiedLayout from 'justified-layout'

export default function PhotographyPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [sizes, setSizes] = useState({})
  const [ready, setReady] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)

  const photos = [
    
  ]

  /* Measure gallery width */
  useEffect(() => {
    const updateWidth = () => {
      const el = document.getElementById('gallery-container')
      if (el) setContainerWidth(el.clientWidth)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  /* Check when all image sizes are known */
  useEffect(() => {
    if (Object.keys(sizes).length === photos.length) {
      setReady(true)
    }
  }, [sizes, photos.length])

  const handleLoad = (id, img) => {
    setSizes(prev => ({
      ...prev,
      [id]: {
        width: img.naturalWidth,
        height: img.naturalHeight,
      },
    }))
  }

  const layout = ready
    ? justifiedLayout(
        photos.map(p => sizes[p.id]),
        {
          containerWidth,
          targetRowHeight: 290,
          boxSpacing: 6,
        }
      )
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Photography
        </h1>
        <p className="text-gray-900 text-lg">
          Capturing moments from my adventures around the world
        </p>
      </div>

      {/* Empty state */}
      {photos.length === 0 && (
        <div className="text-center py-20 bg-[#E2B9B8] rounded-lg">
          <p className="text-gray-900 text-xl mb-4">
            Photo gallery coming soon!
          </p>
          <p className="text-gray-700">
            Currently curating my favorite shots.
          </p>
        </div>
      )}

      {/* Hidden probes to measure images */}
      {photos.length > 0 && !ready && (
        <div className="hidden">
          {photos.map(photo => (
            <Image
              key={photo.id}
              src={photo.src}
              alt=""
              width={10}
              height={10}
              onLoadingComplete={(img) => handleLoad(photo.id, img)}
            />
          ))}
        </div>
      )}

      {/* Justified Gallery */}
      {photos.length > 0 && ready && (
        <div id="gallery-container" className="relative">
          <div
            className="relative"
            style={{ height: layout.containerHeight }}
          >
            {layout.boxes.map((box, i) => {
              const photo = photos[i]

              return (
                <div
                  key={photo.id}
                  className="absolute overflow-hidden rounded-lg cursor-pointer bg-[#E2B9B8] shadow-md hover:shadow-xl transition-shadow"
                  style={{
                    left: box.left,
                    top: box.top,
                    width: box.width,
                    height: box.height,
                  }}
                  onClick={() => setSelectedImage(photo)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg">{photo.title}</h3>
                      <p className="text-sm">{photo.location}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p>{selectedImage.location} • {selectedImage.date}</p>
            </div>
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
