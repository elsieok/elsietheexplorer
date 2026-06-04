'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Mail, Trash2, User } from 'lucide-react'
import { format } from 'date-fns'

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetch('/api/contact')
      .then(r => r.ok ? r.json() : [])
      .then(data => { setContacts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this message permanently?')) return
    setDeleting(id)
    try {
      const r = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      })
      if (r.ok) setContacts(prev => prev.filter(c => c._id !== id))
    } catch { /* noop */ }
    setDeleting(null)
  }

  return (
    <AdminLayout>
      <div>
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.625rem', color: 'var(--gray-900)', letterSpacing: '-0.02em', margin: 0 }}>
            Messages
          </h1>
          {!loading && (
            <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>
              {contacts.length} message{contacts.length !== 1 ? 's' : ''} received
            </p>
          )}
        </div>

        <div className="admin-panel-card">
          {loading ? (
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ padding: '1.125rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div className="skeleton" style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton" style={{ height: '0.875rem', width: '140px', marginBottom: '0.375rem' }} />
                      <div className="skeleton" style={{ height: '0.75rem', width: '200px' }} />
                    </div>
                  </div>
                  <div className="skeleton" style={{ height: '0.875rem', marginBottom: '0.375rem' }} />
                  <div className="skeleton" style={{ height: '0.875rem', width: '75%' }} />
                </div>
              ))}
            </div>
          ) : contacts.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'var(--brand-50)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginInline: 'auto',
                  marginBottom: '1rem',
                }}
              >
                <Mail size={22} style={{ color: 'var(--brand-300)' }} strokeWidth={1.5} />
              </div>
              <p style={{ fontWeight: 600, color: 'var(--gray-600)', marginBottom: '0.25rem' }}>No messages yet</p>
              <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', margin: 0 }}>
                Contact form submissions will appear here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {contacts.map((contact, i) => (
                <div
                  key={contact._id}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: i < contacts.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    transition: 'background 150ms ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--brand-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>

                    {/* Avatar + sender info */}
                    <div style={{ display: 'flex', gap: '0.875rem', flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: 'var(--brand-100)',
                          color: 'var(--brand-600)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          flexShrink: 0,
                        }}
                      >
                        {contact.name?.[0]?.toUpperCase() ?? <User size={16} />}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: '0.9375rem' }}>
                            {contact.name}
                          </span>
                          <a
                            href={`mailto:${contact.email}`}
                            style={{
                              fontSize: '0.8125rem',
                              color: 'var(--brand-600)',
                              textDecoration: 'none',
                            }}
                          >
                            {contact.email}
                          </a>
                        </div>

                        <p
                          style={{
                            fontSize: '0.9375rem',
                            color: 'var(--gray-700)',
                            lineHeight: 1.65,
                            margin: '0.375rem 0 0.625rem',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {contact.message}
                        </p>

                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', margin: 0 }}>
                          {format(new Date(contact.createdAt), 'd MMM yyyy, h:mm a')}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                      <a
                        href={`mailto:${contact.email}?subject=Re: Your message`}
                        title="Reply via email"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--gray-400)',
                          textDecoration: 'none',
                          transition: 'all 150ms ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--info-50)'; e.currentTarget.style.color = 'var(--info-700)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-400)'; }}
                      >
                        <Mail size={16} />
                      </a>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        disabled={deleting === contact._id}
                        title="Delete message"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: 'var(--radius-md)',
                          background: 'none',
                          border: 'none',
                          cursor: deleting === contact._id ? 'not-allowed' : 'pointer',
                          color: 'var(--gray-400)',
                          transition: 'all 150ms ease',
                          opacity: deleting === contact._id ? 0.5 : 1,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger-50)'; e.currentTarget.style.color = 'var(--danger-700)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--gray-400)'; }}
                      >
                        <Trash2 size={16} />
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