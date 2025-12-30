'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function PhotographyPage() {
    const [selectedImage, setSelectedImage] = useState(null)

    // You'll replace this with actual photos later
    const photos = [
        // { id: 1, src: '/photos/photo1.jpg', title: 'Sunset in Manchester', location: 'Manchester, UK', date: '2024-03-15' },
        // Add your photos here
    ]

    // const categories = ['All', 'Travel', 'Nature', 'Street', 'Portrait']
    // const [selectedCategory, setSelectedCategory] = useState('All')

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    Photography
                </h1>
                <p className="text-gray-900 text-lg">
                    Capturing moments from my adventures around the world
                </p>
            </div>

            {/* * Category filter
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === category
                                ? 'bg-[#C56462] text-white font-semibold'
                                : 'bg-[#E2B9B8] text-gray-700 hover:bg-[#CE8988]'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div> */}

            {photos.length === 0 ? (
                <div className="text-center py-20 bg-[#E2B9B8] rounded-lg">
                    <p className="text-gray-900 text-xl mb-4">
                        Photo gallery coming soon!
                    </p>
                    <p className="text-gray-700">
                        Currently curating my favorite shots.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photos.map(photo => (
                        <div
                            key={photo.id}
                            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-[#E2B9B8] shadow-md hover:shadow-xl transition-shadow"
                            onClick={() => setSelectedImage(photo)}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="font-semibold text-lg">{photo.title}</h3>
                                    <p className="text-sm">{photo.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/** Lightbox modal */}
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