'use client'
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, FileText, MessageSquare, Settings, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (token) {
            // verridy token with backend
            setAuthenticated(true)
        } else {
            router.push('/admin/login')
        }
        setLoading(false)
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
    }

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    if (!authenticated) {
        return null
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: Settings },
        { name: 'Posts', href: '/admin/posts', icon: FileText },
        { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 }
    ]

    return (
        <><Head>
            <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gray-50">
                {/* Mobile Sidebar overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex h-16 items-center justify-between px-4 border-b">
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-4">
                        <ul className="space-y-2">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="border-t p-4">
                        <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:ml-64">
                    {/* Top bar */}
                    <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-gray-100">
                            <Menu size={20} />
                        </button>

                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                target="_blank"
                            > View Site
                            </Link>
                        </div>
                    </div>

                    {/* Page content */}
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div></>
    )
}