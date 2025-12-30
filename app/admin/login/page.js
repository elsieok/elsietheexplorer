'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail } from "lucide-react"

export default function AdminLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('adminToken', data.token)
                router.push('/admin/dashboard')
            } else {
                setError(data.error || 'Login failed')
            }
        } catch (error) {
            setError('Network error. Please try again.')
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#F2DFDE] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#E2B9B8] py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border-2 border-[#C56462]">
                    <div className="text-center mb-6">
                        <div className="mx-auto h-16 w-16 bg-[#C56462] rounded-full flex items-center justify-center shadow-md">
                            <Lock className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Admin Login</h2>
                        <p className="mt-2 text-sm text-gray-700">Sign in to access the admin panel</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-900">Email</label>
                            <div className="mt-1 relative">
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="appearance-none block w-full px-3 py-2 pl-10 border-2 border-[#C56462] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#803635] focus:border-[#803635] bg-white text-gray-900"
                                    placeholder="admin@example.com"
                                />
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-[#C56462]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Password</label>
                            <div className="mt-1 relative">
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="appearance-none block w-full px-3 py-2 pl-10 border-2 border-[#C56462] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#803635] focus:border-[#803635] bg-white text-gray-900"
                                />
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-[#C56462]" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border-2 border-[#803635] rounded-md shadow-sm text-sm font-medium text-white bg-[#C56462] hover:bg-[#803635] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#803635] disabled:opacity-50 transition-colors">
                                {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}