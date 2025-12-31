'use client'
import { use, useState, useEffect } from "react"
import AdminLayout from "@/app/components/admin/AdminLayout"
import PostForm from "@/app/components/admin/PostForm"

export default function EditPost({ params }) {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    const { id } = use(params)

    useEffect(() => {
        fetch(`/api/posts/${id}`).then(res => res.json()).then(data =>{
            setPost(data)
            setLoading(false)
        }).catch(err => {
            console.error('Failed to fetch post: ', err)
            setLoading(false)
        })
    }, [id])

    if (loading) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <p className="text-gray-900">Loading post...</p>
                </div>
            </AdminLayout>
        )
    }

    if (!post) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <p className="text-red-900">Post not found</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>
                <PostForm post={post} isEdit={true} />
            </div>
        </AdminLayout>
    )

}