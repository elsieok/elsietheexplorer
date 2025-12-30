'use client'
import { useState, useEffect } from "react"
import AdminLayout from "@/app/components/admin/AdminLayout.js"
import { FileText, Eye, Heart, MessageSquare } from 'lucide-react'

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
            color: 'bg-[#C56462]',
            lightColor: 'bg-[#E2B9B8]'
        },
        {
            title: 'Total Views',
            value: stats.totalViews,
            icon: Eye,
            color: 'bg-[#64D4E2]',
            lightColor: 'bg-[#B2E9F0]'
        },
        {
            title: 'Total Likes',
            value: stats.totalLikes,
            icon: Heart,
            color: 'bg-[#CE8988]',
            lightColor: 'bg-[#F5E6E6]'
        },
        {
            title: 'Total Comments',
            value: stats.totalComments,
            icon: MessageSquare,
            color: 'bg-[#803635]',
            lightColor: 'bg-[#E2B9B8]'
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
                        <div key={stat.title} className={`${stat.lightColor} rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow`}>
                            <div className="flex items-center">
                                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Popular posts */}
                <div className="bg-white rounded-lg shadow-md border border-[#E2B9B8]">
                    <div className="p-6 border-b border-gray-200 bg-[#F5E6E6]">
                        <h2 className="text-xl font-semibold text-gray-900">Popular Posts</h2>
                    </div>
                    <div className="p-6">
                        {(stats.popularPosts?.length ?? 0) === 0 ? (
                            <p className="text-gray-500">No posts yet</p>
                        ) : (
                            <div className="space-y-4">
                                {stats.popularPosts.map((post) => (
                                    <div key={post._id} className="flex items-center justify-between p-4 border border-[#E2B9B8] rounded-lg hover:bg-[#F5E6E6] transition-colors">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{post.title}</h3>
                                        </div>
                                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Eye size={16} className="text-[#64D4E2]" />
                                                {post.views}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Heart size={16} className="text-[#CE8988]" />
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