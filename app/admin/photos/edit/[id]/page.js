'use client'
import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/app/components/admin/AdminLayout'
import Image from 'next/image'

export default function EditPhoto({ params }) {
    const router = useRouter()
    const { id } = use(params)

    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    const [caption, setCaption] = useState('')
    const [takenOn, setTakenOn] = useState('')
    const [camera, setCamera] = useState('')

    useEffect(() => {
        fetch(`/api/photos/${id}`)
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(data => {
                setPhoto(data)
                setCaption(data.caption || '')
                setTakenOn(data.takenOn ? data.takenOn.slice(0, 10) : '')
                setCamera(data.camera || '')
            })
            .catch(() => setError('Failed to load photo'))
            .finally(() => setLoading(false))
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)
        setError(null)
        try {
            const res = await fetch(`/api/photos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ caption, takenOn, camera }),
            })
            if (!res.ok) {
                const { error: msg } = await res.json().catch(() => ({}))
                throw new Error(msg || 'Failed to update photo')
            }
            router.push('/admin/photos')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Update failed')
        } finally {
            setSaving(false)
        }
    }

    return (
        <AdminLayout>
            <div className="container-sm" style={{ paddingInline: 0, marginInline: 0 }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.625rem', color: 'var(--gray-900)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                    Edit photo
                </h1>

                {loading ? (
                    <p style={{ color: 'var(--gray-400)' }}>Loading…</p>
                ) : !photo ? (
                    <p style={{ color: 'var(--gray-400)' }}>Photo not found.</p>
                ) : (
                    <div className="card" style={{ padding: '2rem', maxWidth: '32rem' }}>
                        {error && <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>{error}</div>}

                        <div style={{ position: 'relative', width: '100%', height: '12rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '1.25rem', background: 'var(--gray-100)' }}>
                            <Image src={photo.url} alt={photo.caption || ''} fill style={{ objectFit: 'cover' }} />
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                            <div>
                                <label htmlFor="caption" className="form-label">Caption</label>
                                <input id="caption" type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="e.g. Sunrise over the Sahyadris" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="takenOn" className="form-label">Taken on</label>
                                <input id="takenOn" type="date" value={takenOn} onChange={e => setTakenOn(e.target.value)} className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="camera" className="form-label">Camera</label>
                                <input id="camera" type="text" value={camera} onChange={e => setCamera(e.target.value)} placeholder="e.g. Fujifilm X100V" className="form-input" />
                            </div>
                            <button type="submit" disabled={saving} className="btn btn-primary" style={{ width: '100%' }}>
                                {saving ? 'Saving…' : 'Save changes'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}