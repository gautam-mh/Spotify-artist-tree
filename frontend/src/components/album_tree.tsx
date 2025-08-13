import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Album, Track } from '@/types/spotify'
import Image from 'next/image'

type AlbumTreeProps = {
    year: string
    albums: Album[]
}

const albumCardStyle = {
    background: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    marginBottom: '1rem'
}

const albumButtonStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    cursor: 'pointer',
    border: 'none',
    background: 'white',
    transition: 'background-color 0.2s'
}

const albumImageContainerStyle = {
    position: 'relative' as const,
    width: '4rem',
    height: '4rem',
    marginRight: '1rem',
    borderRadius: '0.375rem',
    overflow: 'hidden'
}

const trackContainerStyle = {
    backgroundColor: '#F9FAFB',
    padding: '0.5rem 1rem'
}

const trackItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0',
    fontSize: '0.875rem',
    color: '#374151'
}

export const AlbumTree = ({ year, albums }: AlbumTreeProps) => {
    const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null)

    const toggleAlbum = (albumId: string) => {
        setExpandedAlbum(expandedAlbum === albumId ? null : albumId)
    }

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '1rem'
            }}>{year}</h2>
            <div>
                {albums.map((album) => (
                    <div key={album.id} style={albumCardStyle}>
                        <button
                            onClick={() => toggleAlbum(album.id)}
                            style={albumButtonStyle}
                            onMouseEnter={(e) => {
                                (e.target as HTMLButtonElement).style.backgroundColor = '#F9FAFB'
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLButtonElement).style.backgroundColor = 'white'
                            }}
                        >
                            {album.images?.[0] && (
                                <div style={albumImageContainerStyle}>
                                    <Image
                                        src={album.images[0].url}
                                        alt={album.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            <span style={{ 
                                flex: 1,
                                textAlign: 'left',
                                fontWeight: 500,
                                color: '#111827'
                            }}>{album.name}</span>
                            <ChevronDownIcon
                                style={{
                                    width: '1.25rem',
                                    height: '1.25rem',
                                    transform: expandedAlbum === album.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </button>
                        <AnimatePresence>
                            {expandedAlbum === album.id && album.tracks && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={trackContainerStyle}>
                                        {album.tracks.map((track: Track) => (
                                            <div
                                                key={track.id}
                                                style={trackItemStyle}
                                            >
                                                <span style={{ 
                                                    width: '2rem',
                                                    textAlign: 'right',
                                                    color: '#6B7280',
                                                    marginRight: '1rem'
                                                }}>
                                                    {track.track_number}.
                                                </span>
                                                <span style={{ flex: 1 }}>{track.name}</span>
                                                <span style={{ color: '#6B7280' }}>
                                                    {formatDuration(track.duration_ms)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )
}

const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
