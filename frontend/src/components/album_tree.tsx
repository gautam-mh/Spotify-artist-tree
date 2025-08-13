import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Album, Track } from '@/types/spotify'
import Image from 'next/image'

type AlbumTreeProps = {
    year: string
    albums: Album[]
}

export const AlbumTree = ({ year, albums }: AlbumTreeProps) => {
    const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null)

    const toggleAlbum = (albumId: string) => {
        setExpandedAlbum(expandedAlbum === albumId ? null : albumId)
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{year}</h2>
            <div className="space-y-4">
                {albums.map((album) => (
                    <div key={album.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => toggleAlbum(album.id)}
                            className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors duration-200"
                        >
                            {album.images?.[0] && (
                                <div className="relative w-16 h-16 mr-4 rounded-md overflow-hidden">
                                    <Image
                                        src={album.images[0].url}
                                        alt={album.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <span className="flex-grow text-left font-medium">{album.name}</span>
                            <ChevronDownIcon
                                className={`w-5 h-5 transform transition-transform duration-200 ${
                                    expandedAlbum === album.id ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <AnimatePresence>
                            {expandedAlbum === album.id && album.tracks && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 py-2 bg-gray-50">
                                        {album.tracks.map((track: Track) => (
                                            <div
                                                key={track.id}
                                                className="py-2 flex items-center text-sm text-gray-700"
                                            >
                                                <span className="w-8 text-right text-gray-400">
                                                    {track.track_number}.
                                                </span>
                                                <span className="ml-4">{track.name}</span>
                                                <span className="ml-auto text-gray-400">
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
