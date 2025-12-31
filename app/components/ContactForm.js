'use client'
import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSubmitted(true)
                setFormData({ name: '', email: '', message: '' })
                setTimeout(() => setSubmitted(false), 5000)
            } else {
                alert('Failed to send message. Please try again.')
            }
        } catch (error) {
            console.error('Failed to send message:', error)
            alert('Failed to send message. Please try again.')
        }

        setSubmitting(false)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="bg-[#E2B9B8] rounded-xl shadow-lg p-8 border-2 border-[#C56462]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
            
            {submitted ? (
                <div className="bg-green-100 border-2 border-green-400 text-green-800 px-4 py-3 rounded-lg">
                    Thanks for reaching out! I&apos;ll get back to you soon.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border-2 border-[#C56462] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#803635] bg-white text-gray-900"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border-2 border-[#C56462] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#803635] bg-white text-gray-900"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border-2 border-[#C56462] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#803635] bg-white text-gray-900"
                            placeholder="What would you like to say?"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 bg-[#C56462] text-white px-6 py-3 rounded-lg hover:bg-[#803635] transition-colors disabled:opacity-50 font-semibold shadow-md"
                    >
                        <Send size={20} />
                        {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    )
}