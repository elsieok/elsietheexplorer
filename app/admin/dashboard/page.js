'use client'
import { useState, useEffect } from "react"
import AdminLayout from "@/app/components/admin/AdminLayout.js"
import { BarChart3, FileText, MessageSquare, Eye, Heart } from 'lucide-react'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        popularPosts: []
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/posts/analytics')
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        }
        setLoading(false)
    }

    const statCards = [
        {
            title: 'Total Posts',
            value: stats.totalPosts,
            icon: FileText,
            color: 'bg-blue-500'
        },
        {
            title: 'Total Views',
            value: stats.totalViews,
            icon: Eye,
            color: 'bg-green-500'
        },
        {
            title: 'Total Likes',
            value: stats.totalLikes,
            icon: Heart,
            color: 'bg-red-500'
        },
        {
            title: 'Total Comments',
            value: stats.totalComments,
            icon: MessageSquare,
            color: 'bg-purple-500'
        }
    ]

    if (loading) {
        return (
        <AdminLayout>
            <div className="text-center py-12">
            <p className="text-gray-900">Loading dashboard...</p>
            </div>
        </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat) => (
                        <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Popular posts */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Popular Posts</h2>
                        </div>
                        <div className="p-6">
                            {(stats.popularPosts?.length ?? 0 ) === 0 ? ( <p className="text-gray-500">No posts yet</p> ) : (
                                <div className="space-y-4">
                                    {stats.popularPosts.map((post) => (
                                        <div key={post._id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{post.title}</h3>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <Eye size={16} className="mr-1" />
                                                        {post.views}
                                                </span>
                                                <span className="flex items-center">
                                                    <Heart size={16} className="mr-1" />
                                                    {post.likes}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
        </div>
    </AdminLayout>
  )
}