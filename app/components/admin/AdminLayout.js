'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, FileText, MessageSquare, Settings, LogOut, Menu, X, Mail } from "lucide-react";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('adminToken')

            if (!token) {
                router.push('/admin/login')
                return
            }

            try {
                const res = await fetch('/api/admin/verify', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!res.ok) {
                    localStorage.removeItem('adminToken')
                    router.push('/admin/login')
                    return
                }

                setAuthenticated(true)
            } catch (err) {
                console.error('Token verification error:', err)
                localStorage.removeItem('adminToken')
                router.push('/admin/login')
            } finally {
                setLoading(false)
            }
        }

        verifyToken()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#F2DFDE]">
                <p className="text-gray-900">Loading...</p>
            </div>
        )
    }

    if (!authenticated) {
        return null
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: Settings },
        { name: 'Posts', href: '/admin/posts', icon: FileText },
        { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { name: 'Contact Messages', href: '/admin/contacts', icon: Mail }
    ]

    return (
        <div className="min-h-screen bg-[#F2DFDE]">
            {/* Mobile Sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
                    onClick={() => setSidebarOpen(false)} 
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#E2B9B8] shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 border-r-2 border-[#C56462] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-16 items-center justify-between px-4 border-b-2 border-[#C56462] bg-[#CE8988]">
                    <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                    <button 
                        onClick={() => setSidebarOpen(false)} 
                        className="lg:hidden p-1 rounded-md hover:bg-[#C56462] hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4">
                    <ul className="space-y-2">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="flex items-center px-3 py-2 text-gray-900 rounded-lg hover:bg-[#C56462] hover:text-white transition-colors font-medium"
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="border-t-2 border-[#C56462] p-4 bg-[#CE8988]">
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center w-full px-3 py-2 text-gray-900 rounded-lg hover:bg-[#C56462] hover:text-white transition-colors font-medium"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <div className="bg-[#C56462] shadow-md border-b-2 border-[#803635] h-16 flex items-center justify-between px-4">
                    <button 
                        onClick={() => setSidebarOpen(true)} 
                        className="lg:hidden p-2 rounded-md hover:bg-[#803635] hover:text-white transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center space-x-4 ml-auto">
                        <Link
                            href="/"
                            className="text-white hover:text-[#F5E6E6] transition-colors font-semibold"
                            target="_blank"
                        > 
                            View Site
                        </Link>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}