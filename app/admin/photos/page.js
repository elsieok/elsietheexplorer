'use client'
import { useState, useEffect, useCallback } from "react"
import AdminLayout from "@/app/components/admin/AdminLayout"
import { Camera, Plus, Trash2, Edit } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function AdminPhotos() {
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(null)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState('all') // 'all' | 'gallery' | 'post'

    const loadPhotos = useCallback(async () => {
        setLoading(true)
        try {
            const query = filter === 'all' ? '' : `?type=${filter}`
            const res = await fetch(`/api/photos${query}`)
            if (!res.ok) throw new Error('Failed to load photos')
            const data = await res.json()
            setPhotos(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load photos')
        } finally {
            setLoading(false)
        }
    }, [filter])

    useEffect(() => {
        loadPhotos()
    }, [loadPhotos])

    async function handleDelete(id) {
        if (!confirm('Delete this photo? This cannot be undone.')) return

        setDeleting(id)
        try {
            const res = await fetch(`/api/photos/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete photo')
            setPhotos(prev => prev.filter(p => p._id !== id))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete photo')
        } finally {
            setDeleting(null)
        }
    }

    const filterTabs = [
        ['all', 'All'],
        ['gallery', 'Photography page'],
        ['post', 'Blog posts only'],
    ]

    return (
        <AdminLayout>
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.625rem", color: "var(--gray-900)", letterSpacing: "-0.02em", margin: 0 }}>
                            Photos
                        </h1>
                        {!loading && (
                            <p style={{ color: "var(--gray-400)", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
                                {photos.length} photo{photos.length !== 1 ? 's' : ''} total
                            </p>
                        )}
                    </div>
                    <Link
                        href="/admin/photos/create"
                        className="btn btn-primary btn-sm"
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                    >
                        <Plus size={16} />
                        Upload photo
                    </Link>
                </div>

                {error && (
                    <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>{error}</div>
                )}

                {/* Filter tabs */}
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    {filterTabs.map(([value, label]) => (
                        <button
                            key={value}
                            onClick={() => setFilter(value)}
                            style={{
                                padding: '0.5rem 0', marginBottom: '-1px',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: '0.9rem', fontWeight: 500,
                                color: filter === value ? 'var(--brand-600)' : 'var(--gray-400)',
                                borderBottom: filter === value ? '2px solid var(--brand-500)' : '2px solid transparent',
                                transition: 'color 150ms ease, border-color 150ms ease',
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="admin-panel-card">
                    {loading ? (
                        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                    <div className="skeleton" style={{ width: 56, height: 56, borderRadius: "var(--radius-md)" }} />
                                    <div className="skeleton" style={{ flex: 1, height: "1rem" }} />
                                    <div className="skeleton" style={{ width: 80, height: "1rem" }} />
                                </div>
                            ))}
                        </div>
                    ) : photos.length === 0 ? (
                        <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.625rem" }}>
                                <Camera size={28} />
                            </div>
                            <p style={{ fontWeight: 600, color: "var(--gray-700)", marginBottom: "0.375rem" }}>No photos yet</p>
                            <p style={{ color: "var(--gray-400)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Upload your first photo.</p>
                            <Link href="/admin/photos/create" className="btn btn-primary btn-sm">
                                <Plus size={15} /> Upload photo
                            </Link>
                        </div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table className="admin-table" style={{ minWidth: "650px" }}>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Caption</th>
                                        <th style={{ width: 110 }}>Used on</th>
                                        <th style={{ width: 110 }}>Taken on</th>
                                        <th style={{ width: 140 }}>Camera</th>
                                        <th style={{ width: 100 }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {photos.map(photo => (
                                        <tr key={photo._id}>
                                            <td>
                                                <div style={{ position: "relative", width: 56, height: 56, borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--gray-100)" }}>
                                                    <Image src={photo.url} alt={photo.caption || ''} fill style={{ objectFit: "cover" }} />
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 500, color: "var(--gray-900)", fontSize: "0.9375rem" }}>
                                                {photo.caption || <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>Untitled</span>}
                                            </td>
                                            <td>
                                                <span className={`badge ${photo.type === 'post' ? 'badge-gray' : 'badge-brand'}`}>
                                                    {photo.type === 'post' ? 'Blog only' : 'Photography'}
                                                </span>
                                            </td>
                                            <td style={{ color: "var(--gray-400)", fontSize: "0.875rem" }}>
                                                {photo.takenOn ? new Date(photo.takenOn).toLocaleDateString() : '—'}
                                            </td>
                                            <td style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>
                                                {photo.camera || '—'}
                                            </td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                                    <Link
                                                        href={`/admin/photos/edit/${photo._id}`}
                                                        title="Edit photo"
                                                        style={{
                                                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                                                            width: 30, height: 30, borderRadius: "var(--radius-md)",
                                                            color: "var(--gray-400)", textDecoration: "none",
                                                            transition: "all 150ms ease",
                                                        }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = "var(--brand-50)"; e.currentTarget.style.color = "var(--brand-600)"; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gray-400)"; }}
                                                    >
                                                        <Edit size={15} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(photo._id)}
                                                        disabled={deleting === photo._id}
                                                        title="Delete photo"
                                                        style={{
                                                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                                                            width: 30, height: 30, borderRadius: "var(--radius-md)",
                                                            color: "var(--gray-400)", background: "none", border: "none",
                                                            cursor: "pointer", transition: "all 150ms ease",
                                                            opacity: deleting === photo._id ? 0.5 : 1,
                                                        }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = "var(--danger-50)"; e.currentTarget.style.color = "var(--danger-700)"; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gray-400)"; }}
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}