import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
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

const spotifyLinkStyle = {
    color: '#1DB954',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    transition: 'background-color 0.2s',
    backgroundColor: 'transparent',
    cursor: 'pointer'
}

export const AlbumTree = ({ year, albums }: AlbumTreeProps) => {
    const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null)
    
    // Debug log to check if we're getting Spotify URLs
    console.log('Albums with URLs:', albums.map(album => ({
        name: album.name,
        spotifyUrl: album.external_urls?.spotify,
        trackUrls: album.tracks?.map(track => ({
            name: track.name,
            spotifyUrl: track.external_urls?.spotify
        }))
    })))

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
                            <div style={{ 
                                flex: 1,
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column' as const,
                                gap: '0.25rem'
                            }}>
                                <span style={{
                                    fontWeight: 500,
                                    color: '#111827'
                                }}>{album.name}</span>
                                {album.external_urls?.spotify ? (
                                    <a
                                        href={album.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toast.success(`Opening ${album.name} in Spotify`);
                                        }}
                                        style={spotifyLinkStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#1DB95410'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }}
                                    >
                                        Open in Spotify
                                    </a>
                                ) : (
                                    <span style={{ ...spotifyLinkStyle, color: '#6B7280' }}>
                                        No Spotify Link
                                    </span>
                                )}
                            </div>
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
                                                <div style={{ 
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.25rem'
                                                }}>
                                                    <span>{track.name}</span>
                                                    {track.external_urls?.spotify ? (
                                                        <a
                                                            href={track.external_urls.spotify}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={spotifyLinkStyle}
                                                            onClick={(e) => {
                                                                toast.success(`Playing ${track.name} on Spotify`);
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#1DB95410'
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = 'transparent'
                                                            }}
                                                        >
                                                            Play on Spotify
                                                        </a>
                                                    ) : (
                                                        <span style={{ ...spotifyLinkStyle, color: '#6B7280' }}>
                                                            No Spotify Link
                                                        </span>
                                                    )}
                                                </div>
                                                <span style={{ color: '#6B7280', marginLeft: '1rem' }}>
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
