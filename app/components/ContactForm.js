'use client'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({})
    setSubmitting(true)

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (r.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      }
    } catch { /* silently fail */ }
    setSubmitting(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  if (submitted) {
    return (
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
          animation: 'fadeIn 300ms ease',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--success-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginInline: 'auto',
            marginBottom: '1.25rem',
          }}
        >
          <CheckCircle size={26} style={{ color: 'var(--success-700)' }} strokeWidth={1.75} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.375rem', color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
          Message sent!
        </h3>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.9375rem', margin: 0 }}>
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          fontSize: '1.375rem',
          color: 'var(--gray-900)',
          marginBottom: '1.5rem',
          letterSpacing: '-0.015em',
        }}
      >
        Get in touch
      </h3>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
          <div>
            <label className="form-label" htmlFor="contact-name">
              Name <span style={{ color: 'var(--brand-500)' }}>*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className={`form-input${errors.name ? ' error' : ''}`}
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ fontSize: '0.8rem', color: 'var(--danger-500)', margin: '0.3rem 0 0' }}>{errors.name}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="contact-email">
              Email <span style={{ color: 'var(--brand-500)' }}>*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ fontSize: '0.8rem', color: 'var(--danger-500)', margin: '0.3rem 0 0' }}>{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="contact-message">
            Message <span style={{ color: 'var(--brand-500)' }}>*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            className={`form-input form-textarea${errors.message ? ' error' : ''}`}
            placeholder="What would you like to say?"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p style={{ fontSize: '0.8rem', color: 'var(--danger-500)', margin: '0.3rem 0 0' }}>{errors.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Send size={16} />
            {submitting ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </form>
    </div>
  )
}