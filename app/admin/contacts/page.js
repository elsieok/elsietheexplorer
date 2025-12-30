'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Mail, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

export default function AdminContacts() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/contact')
            if (response.ok) {
                const data = await response.json()
                setContacts(data)
            }
        } catch (error) {
            console.error('Failed to fetch contacts:', error)
        }
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            try {
                const response = await fetch(`/api/contact/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                })

                if (response.ok) {
                    setContacts(prev => prev.filter(contact => contact._id !== id))
                }
            } catch (error) {
                console.error('Failed to delete contact:', error)
                alert('Failed to delete message')
            }
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <p className="text-gray-900">Loading messages...</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Contact Messages</h1>
                </div>

                <div className='bg-white shadow-md rounded-lg overflow-hidden border border-[#E2B9B8]'>
                    {contacts.length === 0 ? (
                        <div className='p-8 text-center text-gray-500'>
                            No messages yet.
                        </div>
                    ) : (
                        <div className='divide-y divide-gray-200'>
                            {contacts.map((contact) => (
                                <div key={contact._id} className='p-6 hover:bg-[#F5E6E6] transition-colors'>
                                    <div className='flex items-start justify-between'>
                                        <div className='flex-1'>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Mail size={18} className="text-[#C56462]" />
                                                <span className='font-medium text-gray-900'>{contact.name}</span>
                                                <span className='text-sm text-gray-500'>{contact.email}</span>
                                            </div>

                                            <p className='text-gray-700 mb-3 whitespace-pre-wrap'>{contact.message}</p>

                                            <div className='text-sm text-gray-500'>
                                                {format(new Date(contact.createdAt), 'd MMM, yyyy h:mm a')}
                                            </div>
                                        </div>

                                        <div className='flex items-center space-x-2 ml-4'>
                                            <button 
                                                onClick={() => handleDelete(contact._id)} 
                                                className='text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-lg transition-colors' 
                                                title='Delete message'
                                            >
                                                <Trash2 size={20}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}