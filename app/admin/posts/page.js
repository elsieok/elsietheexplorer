'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import AdminLayout from "@/app/components/admin/AdminLayout.js"
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { format } from "date-fns"

export default function AdminPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts?published=false')
            if (response.ok) {
                const data = await response.json()
                setPosts(data)
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        }
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`/api/posts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                })

                if (response.ok) {
                    setPosts(posts.filter(post => post._id != id))
                }
            } catch (error) {
                console.error('Failed to delete post:', error)
                alert('Failed to delete post')
            }
        }
    }

    if (loading) {
         return (
            <AdminLayout>
                <div className="text-center py-12">
                <p className="text-gray-900">Loading posts...</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text3-xl font-bold text-gray-900">Posts</h1>
                    <Link href={"/admin/posts/create"} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus size={20}/>
                    New Post
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {posts.length == 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No posts yet. Create your first post!
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font medium text-gray-500 uppercase tracking-wider">
                                            Views
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font medium text-gray-500 uppercase tracking-wider">
                                            Likes
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {posts.map((post) => (
                                        <tr key={post._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {post.published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {post.views}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {post.likes}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {format(new Date(post.createdAt), 'd MMM, yyyy')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-900" target="_blank">
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link href={`/admin/posts/edit/${post._id}`} className="text-indigo-600 hover:text-indigo-900">
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:text-red-900">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
