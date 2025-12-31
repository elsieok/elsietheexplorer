'use client'
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { formatDistanceToNow } from "date-fns"
import { MessageCircle, Send } from "lucide-react"

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: ''
    })

    useEffect(() => {
        const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments?postId=${postId}&approved=true`)
            if (response.ok) {
                const data = await response.json()
                setComments(data)
            }
        } catch (error) {
            console.error('Failed to fetch comments:', error)
        }
        setLoading(false)
    }
        fetchComments()
    }, [postId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    postId
                })
            })

            if (response.ok) {
                setFormData({ name: '', email: '', content: '' })
                setShowForm(false)
                alert('Comment submitted!')
            } else {
                alert('Failed to submit comment. Please try again.')
            }
        } catch (error) {
            console.error('Failed to submit comment:', error)
            alert('Failed to submit comment. Please try again.')
        }
    
        setSubmitting(false)
    }

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-900">Loading comments...</p>
            </div>
        )
    }

    return (
        <div className="bg-[#E2B9B8] rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900 text-xl font-bold flex items-center gap-2">
                    <MessageCircle size={24} />
                    Comments ({comments.length})
                </h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#64D4E2] text-white px-4 py-2 rounded-lg hover:bg-[#94E1EB] border border-gray-400 transition-colors"
                >
                    Add Comment
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-[#F5E6E6] rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name (optional)"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email*"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>
                    <textarea
                        name="content"
                        placeholder="Write your comment..."
                        required
                        rows={4}
                        value={formData.content}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-900"
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-2 bg-[#64D4E2] border border-gray-400 text-white px-4 py-2 rounded-lg hover:bg-[#94E1EB] transition-colors disabled:opacity-50"
                        >
                            <Send size={16} />
                            {submitting ? 'Submitting...' : 'Submit Comment'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="text-gray-900 px-4 py-2 border border-gray-500 rounded-lg hover:bg-[#94E1EB]/30 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Your comment will be reviewed before appearing.
                    </p>
                </form>
            )}

            {comments.length === 0 ? (
                <p className="text-gray-900 text-center py-8">
                    No comments yet. Be the first to comment!
                </p>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment._id} className="border-b border-gray-200 hover:bg-[#F5E6E6] pb-4 px-4 py-2 rounded-lg last:border-b-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-900">{comment.name}</span>
                                <span className="text-sm text-gray-900">
                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}