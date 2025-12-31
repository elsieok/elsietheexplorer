'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PostForm({ post = null, isEdit = false }) {
    const [formData, setFormData] = useState({
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        excerpt: post?.excerpt || '',
        author: post?.author || 'Elsie',
        tags: post?.tags?.join(', ') || '',
        published: post?.published ?? true
    })

    const [saving, setSaving] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        const postData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        }

        try {
            const url = isEdit ? `/api/posts/${post._id}` : '/api/posts'
            const method = isEdit ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(postData)
            })

            if (response.ok) {
                router.push('/admin/posts')
            } else {
                alert('Failed to save post')
            }
        } catch (error) {
            console.error('Failed to save post:', error)
            alert('Failed to save post')
        }
        setSaving(false)
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#E2B9B8] rounded-xl shadow-lg p-8 border-2 border-[#C56462]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-2 border-[#C56462] rounded-lg focus:ring-2 focus:ring-[#803635] bg-white text-gray-900" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug
                        </label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-2 border-[#C56462] rounded-lg focus:ring-2 focus:ring-[#803635] bg-white text-gray-900"
                            placeholder="Auto-generated from title" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            required
                            value={formData.author}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-2 border-[#C56462] rounded-lg focus:ring-2 focus:ring-[#803635] bg-white text-gray-900" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            required
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-2 border-[#C56462] rounded-lg focus:ring-2 focus:ring-[#803635] bg-white text-gray-900" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt *
                    </label>
                    <textarea
                        name="excerpt"
                        required
                        rows={3}
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 border-[#C56462] rounded-lg focus:ring-2 focus:ring-[#803635] bg-white text-gray-900" 
                        placeholder="Brief description of the post" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content * (Markdown)
                    </label>
                    <textarea
                        name="content"
                        required
                        rows={20}
                        value={formData.content}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 border-[#C56462] rounded-lg focus:ring-2 focus:ring-[#803635] bg-white text-gray-900" 
                        placeholder="Write your post content in Markdown..." />
                </div>

                <div>
                    <input
                        type="checkbox"
                        name="published"
                        id="published"
                        value={formData.published}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded" />
                    <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                        Publish immediately
                    </label>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-white text-[#C56462] rounded-lg hover:bg-[#F5E6E6] transition-colors">
                            Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-[#803635] text-white rounded-lg hover:bg-[#6B2D2C] transition-colors disabled:opacity-50">
                            {saving ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
                    </button>
                </div>
            </div>
        </form>
    )
}