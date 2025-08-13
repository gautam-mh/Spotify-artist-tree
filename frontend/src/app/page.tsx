'use client'

import { SearchBar } from '@/components/search_bar'
import { ArtistView } from '@/components/artist_view'
import { useState } from 'react'
import { ArtistTreeData } from '@/types/spotify'

// For debugging
console.log('Page component loaded')

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [artistData, setArtistData] = useState<ArtistTreeData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async (query: string) => {
        setIsLoading(true)
        setError(null)
        
        try {
            // TODO: Replace with actual API endpoint
            const response = await fetch(`/api/artist-tree?q=${encodeURIComponent(query)}`)
            if (!response.ok) {
                throw new Error('Failed to fetch artist data')
            }
            const data = await response.json()
            setArtistData(data)
        } catch (err) {
            setError('Failed to load artist data. Please try again.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
                <div style={{ paddingBottom: '3rem' }}>
                    <h1 style={{ 
                        textAlign: 'center', 
                        marginBottom: '2rem',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#111827'
                    }}>
                        Spotify Artist Tree
                    </h1>
                    <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                    
                    {error && (
                        <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {artistData && (
                        <div className="mt-12">
                            <ArtistView
                                artist={artistData.artist}
                                albumsByYear={artistData.albumsByYear}
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}