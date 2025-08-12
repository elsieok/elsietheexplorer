'use client'
import { useState, useEffect } from "react"
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

export default function LikeButton({ postId, initialLikes = 0 }) {
    const [likes, setLikes] = useState(initialLikes)
    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}/like`, { method: 'GET' });
                if (response.ok) {
                    const data = await response.json()
                    setLikes(data.likes)
                    setLiked(data.liked)
                }
            } catch (error) {
                console.error("Failed to fetch like status", err)
            }
        }

        fetchLikeStatus()
    }, [postId])
    
    const handleLike = async () => {
        if (loading) return
    

        setLoading(true)
        try {
            const response = await fetch(`/api/posts/${postId}/like`, { method: 'POST' })

            if (response.ok) {
                const data = await response.json()
                setLikes(data.likes)
                setLiked(data.liked)
            }
        } catch (error) {
            console.error('Failed to like: ', error)
        }
        setLoading(false)
    }

    return (
        <div className="flex items-center space-x-2 py-4">
            <div className="relative group ">
                <button
                    onClick={handleLike}
                    disabled={loading}
                    className="z-10 relative"
                > {liked ? ( <IoMdHeart size={30} /> ) : ( <IoMdHeartEmpty size={30} /> )}
                </button>

                {/* Transparent heart appears on hover */}
                <IoMdHeart size={40} className="text-[#E2B9B8] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[57%]" />
                <IoMdHeart size={30} className="text-red-500 absolute top-0 left-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
            </div>
            <span className="text-gray-900">{likes}</span>
        </div>
    )
}

