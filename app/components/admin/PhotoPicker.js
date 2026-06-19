'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Upload, ImageIcon } from 'lucide-react'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg']
const MAX_BYTES = 10 * 1024 * 1024

export default function PhotoPicker({ onSelect, onClose }) {
    const [tab, setTab] = useState('existing') // 'existing' | 'upload'
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [caption, setCaption] = useState('')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/api/photos?type=post')
            .then(r => r.ok ? r.json() : [])
            .then(data => setPhotos(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false))
    }, [])

    function handleFileChange(e) {
        const selected = e.target.files?.[0]
        if (!selected) return
        if (!ALLOWED_TYPES.includes(selected.type)) {
            setError('Please choose a JPEG image (.jpg/.jpeg).')
            return
        }
        if (selected.size > MAX_BYTES) {
            setError('File must be under 10 MB.')
            return
        }
        setError(null)
        setFile(selected)
        setPreview(URL.createObjectURL(selected))
    }

    async function handleUpload() {
        if (!file) {
            setError('Please choose a photo first.')
            return
        }
        setError(null)
        setUploading(true)
        try {
            const presignRes = await fetch('/api/photos/presign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName: file.name, contentType: file.type }),
            })
            if (!presignRes.ok) throw new Error('Failed to get upload URL')
            const { url, key } = await presignRes.json()

            const uploadRes = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': file.type },
                body: file,
            })
            if (!uploadRes.ok) throw new Error('Failed to upload to S3')

            const saveRes = await fetch('/api/photos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    s3Key: key,
                    caption: caption.trim() || undefined,
                    type: 'post',
                }),
            })
            if (!saveRes.ok) {
                const { error: msg } = await saveRes.json().catch(() => ({}))
                throw new Error(msg || 'Failed to save photo')
            }
            const { photo } = await saveRes.json()
            onSelect(photo)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: 'rgba(0,0,0,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                className="card"
                style={{ width: '100%', maxWidth: '40rem', maxHeight: '85vh', overflowY: 'auto', padding: '1.5rem' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)' }}>Insert a photo</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                        <X size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    <button
                        type="button"
                        onClick={() => setTab('existing')}
                        style={{
                            padding: '0.5rem 0.25rem', marginBottom: '-1px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '0.9rem', fontWeight: 500,
                            color: tab === 'existing' ? 'var(--brand-600)' : 'var(--gray-400)',
                            borderBottom: tab === 'existing' ? '2px solid var(--brand-500)' : '2px solid transparent',
                        }}
                    >
                        <ImageIcon size={14} style={{ display: 'inline', marginRight: '0.35rem', verticalAlign: '-2px' }} />
                        Choose existing
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('upload')}
                        style={{
                            padding: '0.5rem 0.25rem', marginBottom: '-1px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '0.9rem', fontWeight: 500,
                            color: tab === 'upload' ? 'var(--brand-600)' : 'var(--gray-400)',
                            borderBottom: tab === 'upload' ? '2px solid var(--brand-500)' : '2px solid transparent',
                        }}
                    >
                        <Upload size={14} style={{ display: 'inline', marginRight: '0.35rem', verticalAlign: '-2px' }} />
                        Upload new
                    </button>
                </div>

                {error && <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>{error}</div>}

                {tab === 'existing' ? (
                    loading ? (
                        <p style={{ color: 'var(--gray-400)' }}>Loading photos…</p>
                    ) : photos.length === 0 ? (
                        <p style={{ color: 'var(--gray-400)' }}>No blog-post photos uploaded yet. Use the &quot;Upload new&quot; tab.</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                            {photos.map(photo => (
                                <button
                                    key={photo._id}
                                    type="button"
                                    onClick={() => onSelect(photo)}
                                    title={photo.caption || ''}
                                    style={{
                                        position: 'relative', aspectRatio: '1', border: 'none', padding: 0,
                                        borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer',
                                        background: 'var(--gray-100)',
                                    }}
                                >
                                    <Image src={photo.url} alt={photo.caption || ''} fill style={{ objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    )
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div
                            onClick={() => document.getElementById('picker-photo-input')?.click()}
                            style={{
                                border: '2px dashed var(--border-soft)',
                                borderRadius: 'var(--radius-lg)',
                                padding: preview ? 0 : '2.5rem 1.5rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                background: preview ? 'transparent' : 'var(--brand-50)',
                            }}
                        >
                            {preview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '14rem', objectFit: 'cover', display: 'block' }} />
                            ) : (
                                <>
                                    <Upload size={24} color="var(--brand-500)" style={{ marginBottom: '0.5rem' }} />
                                    <p style={{ color: 'var(--gray-600)', margin: 0, fontWeight: 500 }}>Click to choose a JPEG</p>
                                    <p style={{ color: 'var(--gray-400)', fontSize: '0.8125rem', margin: '0.25rem 0 0' }}>Max 10 MB</p>
                                </>
                            )}
                            <input
                                id="picker-photo-input"
                                type="file"
                                accept="image/jpeg"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>

                        <input
                            type="text"
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                            placeholder="Caption (optional)"
                            className="form-input"
                        />

                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading || !file}
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                        >
                            {uploading ? 'Uploading…' : 'Upload and insert'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}