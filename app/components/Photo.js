import Image from 'next/image'

export default function Photo({ src, caption, width = 1200, height = 800 }) {
    return (
        <figure style={{ margin: 0 }}>
            <Image
                src={src}
                alt={caption || ''}
                width={width}
                height={height}
                style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {caption && (
                <figcaption
                    style={{
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        color: 'var(--gray-500)',
                        marginTop: '0.5rem',
                        marginBottom: '1.5em',
                    }}
                >
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}