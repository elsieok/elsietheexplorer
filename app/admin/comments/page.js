'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { CheckCircle, XCircle, Trash2, Trash } from 'lucide-react'
import { format } from 'date-fns'

export default function AdminComments() {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('pending') // 'all', 'approved', 'pending'

    useEffect (() => {
        fetchComments()
    }, [filter])

    const fetchComments = async () => {
        try {
            const approved = filter == 'approved' ? 'true' : 'false'
            const response = await fetch(`/api/comments?approved=${approved}`)

            if (response.ok) {
                let data = await response.json() // let because variable might in the next line
                if (filter == 'pending') {
                    data = data.filter(comment => !comment.approved)
                }
                setComments(data)

            }
        } catch (error) {
            console.error('Failed to fetch commenets: ', error)
        }
        setLoading(false)
    }

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`/api/comments/approve/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            })

            if (response.ok) {
                setComments(comments.map(comment => comment._id == id ? { ...comment, approved: true } : comment))
            }
        } catch (error) {
            console.error('Failed to approve comment:', error)
            alert('Failed to approve comment')
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            try {
                const response = await fetch(`/api/comments/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                })

                if (response.ok) {
                    setComments(prev => prev.filter(comment => comment._id !== id))
                }
            } catch (error) {
                console.error('Failed to delete comment:', error)
                alert('Failed to delete comment')
            }
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <p className="text-gray-900">Loading comments...</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Comments</h1>

                    <div className='flex space-x-2'>
                        <button onClick={() => setFilter('pending')} className={`px-2py-2 rounded-lg transition-colors ${filter == 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            Pending
                        </button>

                        <button onClick={() => setFilter('approved')} className={`px-2py-2 rounded-lg transition-colors ${filter == 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            Approved
                        </button>

                        <button onClick={() => setFilter('all')} className={`px-2py-2 rounded-lg transition-colors ${filter == 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            All
                        </button>
                    </div>
                </div>

                <div className='bg-white shadow rounded-lg overflow-hidden'>
                    {comments.length == 0 ? (
                        <div className='p-8 text-center text-gray-500'>
                            No comments found.
                        </div>
                    ) : (
                        <div className='divide-y divide-gray-200'>
                            {comments.map((comment) => (
                                <div key={comment._id} className='p-6'>
                                    <div className='flex items-start justify-between'>
                                        <div className='flex-1'>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className='font-medium text-gray-900'>{comment.name}</span>
                                                <span className='text-sm text-gray-500'>{comment.email}</span>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${comment.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}></span>
                                            </div>

                                            <p className='text-grayy-700 mb-3'>{comment.content}</p>

                                            <div className='text-sm text-gray-500'>
                                                <span>On: <strong>{comment.postId?.title}</strong></span>
                                                <span className='ml-4'>
                                                    {format(new Date(comment.createdAt), 'd MMM, yyyy h:mm a')}
                                                </span>
                                            </div>
                                        </div>


                                        <div className='flex items-center space-x-2 ml-4'>
                                            {!comment.approved && (
                                                <button onClick={() => handleApprove(comment._id)} className='text-green-600 hover:text-green-900 p-1' title='Approve comment'>
                                                    <CheckCircle size={20}/>
                                                </button>
                                            )}

                                            <button onClick={() => handleDelete(comment._id)} className='text-red-600 hover:text-red-900 p-1' title='Delete comment'>
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