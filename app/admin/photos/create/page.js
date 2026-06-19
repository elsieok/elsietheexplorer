'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from "@/app/components/admin/AdminLayout"
import { Camera, Upload } from 'lucide-react'

const MAX_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg']

export default function CreatePhoto() {
    const router = useRouter()

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [caption, setCaption] = useState('')
    const [takenOn, setTakenOn] = useState('')
    const [cameraName, setCameraName] = useState('')
    const [photoType, setPhotoType] = useState('gallery')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)

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

    async function handleSubmit(e) {
        e.preventDefault()

        if (!file) {
            setError('Please choose a photo to upload.')
            return
        }

        setError(null)
        setUploading(true)

        try {
            // 1. Get a presigned S3 upload URL — the adminToken cookie rides
            // along automatically with this same-origin request
            const presignRes = await fetch('/api/photos/presign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName: file.name, contentType: file.type }),
            })
            if (!presignRes.ok) {
                const { error: msg } = await presignRes.json().catch(() => ({}))
                throw new Error(msg || 'Failed to get upload URL')
            }
            const { url, key } = await presignRes.json()

            // 2. Upload the file directly to S3
            const uploadRes = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': file.type },
                body: file,
            })
            if (!uploadRes.ok) {
                throw new Error('Failed to upload to S3')
            }

            // 3. Save the photo record (s3Key, caption, date taken) in MongoDB
            const saveRes = await fetch('/api/photos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    s3Key: key,
                    caption: caption.trim() || undefined,
                    takenOn: takenOn || undefined,
                    camera: cameraName.trim() || undefined,
                    type: photoType,
                }),
            })
            if (!saveRes.ok) {
                const { error: msg } = await saveRes.json().catch(() => ({}))
                throw new Error(msg || 'Failed to save photo')
            }

            router.push('/admin/photos')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <AdminLayout>
            <div className="container-sm" style={{ paddingInline: 0, marginInline: 0 }}>
                <h1
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 700,
                        fontSize: "1.625rem",
                        color: "var(--gray-900)",
                        letterSpacing: "-0.02em",
                        marginBottom: "1.5rem",
                    }}
                >
                    Upload photo
                </h1>

                <div className="card" style={{ padding: "2rem", maxWidth: "32rem" }}>
                    {error && (
                        <div className="alert alert-danger" style={{ marginBottom: "1.25rem" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>

                        <div
                            onClick={() => document.getElementById('photo-input')?.click()}
                            style={{
                                border: `2px dashed var(--border-soft)`,
                                borderRadius: "var(--radius-lg)",
                                padding: preview ? 0 : "3rem 1.5rem",
                                textAlign: "center",
                                cursor: "pointer",
                                overflow: "hidden",
                                background: preview ? "transparent" : "var(--brand-50)",
                                transition: "border-color var(--transition-fast)",
                            }}
                        >
                            {preview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{ width: "100%", maxHeight: "20rem", objectFit: "cover", display: "block" }}
                                />
                            ) : (
                                <>
                                    <Camera size={28} color="var(--brand-500)" style={{ marginBottom: "0.5rem" }} />
                                    <p style={{ color: "var(--gray-600)", margin: 0, fontWeight: 500 }}>Click to choose a JPEG photo</p>
                                    <p style={{ color: "var(--gray-400)", fontSize: "0.8125rem", margin: "0.25rem 0 0" }}>Max 10 MB</p>
                                </>
                            )}
                            <input
                                id="photo-input"
                                type="file"
                                accept="image/jpeg"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div>
                            <label className="form-label">Where should this appear?</label>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--gray-700)', cursor: 'pointer' }}>
                                    <input type="radio" name="photoType" checked={photoType === 'gallery'} onChange={() => setPhotoType('gallery')} />
                                    Photography page
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--gray-700)', cursor: 'pointer' }}>
                                    <input type="radio" name="photoType" checked={photoType === 'post'} onChange={() => setPhotoType('post')} />
                                    Blog posts only
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="caption" className="form-label">Caption</label>
                            <input
                                id="caption"
                                type="text"
                                value={caption}
                                onChange={e => setCaption(e.target.value)}
                                placeholder="e.g. Sunrise over the Sahyadris"
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label htmlFor="takenOn" className="form-label">Taken on</label>
                            <input
                                id="takenOn"
                                type="date"
                                value={takenOn}
                                onChange={e => setTakenOn(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label htmlFor="camera" className="form-label">Camera</label>
                            <input
                                id="camera"
                                type="text"
                                value={cameraName}
                                onChange={e => setCameraName(e.target.value)}
                                placeholder="e.g. Fujifilm X100V"
                                className="form-input"
                            />
                        </div>

                        <button type="submit" disabled={uploading} className="btn btn-primary" style={{ width: "100%" }}>
                            {uploading ? (
                                <>
                                    <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                                    Uploading…
                                </>
                            ) : (
                                <>
                                    <Upload size={16} />
                                    Upload photo
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}