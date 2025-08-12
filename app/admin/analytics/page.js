'use client'
import { useState, useEffect } from "react"
import AdminLayout from "@/app/components/admin/AdminLayout.js"
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react'

export default function AdminAnalytics() {
    const [analytics, setAnalytics] = useState({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        popularPosts: []
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAnalytics()
    }, []) // dependencies array, [] means only once, [a, b] means every time a or b changes, no array means on every render

    const fetchAnalytics = async () => {
        try {
            const response = await fetch('/api/posts/analytics', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setAnalytics(data)
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error)
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <p className="text-gray-900">Loading analytics...</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>

                {/* Overview cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-500 text-white">
                                <BarChart3 size={24} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Posts</p>
                                <p className="text-2xl font-semibold text-gray-900">{analytics.totalPosts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-500 text-white">
                                <TrendingUp size={24} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Views</p>
                                <p className="text-2xl font-semibold text-gray-900">{analytics.totalViews}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-500 text-white">
                                <Users size={24} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Likes</p>
                                <p className="text-2xl font-semibold text-gray-900">{analytics.totalLikes}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-500 text-white">
                                <Clock size={24} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Comments</p>
                                <p className="text-2xl font-semibold text-gray-900">{analytics.totalComments}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular posts */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Top Performing Posts</h2>
                    </div>
                    <div className="p-6">
                        {(analytics.popularPosts?.length ?? 0) === 0 ? (
                            <p className="text-gray-500">No posts data available</p>
                        ) : (
                            <div className="space-y-6">
                                {analytics.popularPosts.map((post, index) => (
                                    <div key={post._id} className="flex items.center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{post.title}</h3>
                                                <p className="text-sm text-gray-500">Performance metrics</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6 text-sm">
                                            <div className="text-center">
                                                <div className="font-semibold text-gray-900">{post.views}</div>
                                                <div className="text-gray-500">Views</div>
                                            </div>

                                            <div className="text-center">
                                                <div className="font-semibold text-gray-900">{post.likes}</div>
                                                <div className="text-gray-500">Likes</div>
                                            </div>

                                            <div className="text-center">
                                                <div className="font-semibold text-gray-900">{post.views > 0 ? Math.round((post.likes / post.views) * 100) : 0}%</div>
                                                <div className="text-gray-500">Engagement</div>
                                            </div>
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