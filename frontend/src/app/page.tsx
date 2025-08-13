'use client'

import { SearchBar } from '@/components/search_bar'
import { ArtistView } from '@/components/artist_view'
import { LoadingState } from '@/components/loading_state'
import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { ArtistTreeData } from '@/types/spotify'

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [artistData, setArtistData] = useState<ArtistTreeData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = useCallback(async (query: string) => {
        if (isLoading) return; // Prevent multiple simultaneous searches
        if (!query.trim()) {
            toast.error('Please enter an artist name')
            return
        }

        setIsLoading(true)
        setError(null)
        
        const searchPromise = (async () => {
            try {
                const response = await fetch(`/api/artist-tree?q=${encodeURIComponent(query)}`)
                const data = await response.json()
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch artist data')
                }
                
                setArtistData(data)
                return data
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load artist data'
                setError(errorMessage)
                console.error(err)
                throw err
            } finally {
                setIsLoading(false)
            }
        })()

        await toast.promise(searchPromise, {
            loading: 'Searching for artist...',
            success: (data) => `Found ${data.artist.name}'s discography!`,
            error: (err) => err instanceof Error ? err.message : 'Failed to load artist data'
        })
    }, [isLoading])

    return (
        <main style={{ 
                minHeight: '100vh', 
                padding: 'clamp(1rem, 3vw, 2rem) clamp(0.5rem, 2vw, 1rem)',
                width: '100%'
            }}>
            <div style={{ 
                maxWidth: '80rem', 
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{ paddingBottom: 'clamp(2rem, 5vw, 3rem)' }}>
                    <h1 style={{ 
                        textAlign: 'center', 
                        marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                        fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                        fontWeight: 'bold',
                        color: '#111827',
                        lineHeight: '1.2'
                    }}>
                        Spotify Artist Tree
                    </h1>
                    <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                    
                    {error && (
                        <div style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            backgroundColor: '#FEF2F2',
                            color: '#B91C1C',
                            borderRadius: '0.5rem'
                        }}>
                            {error}
                        </div>
                    )}

                    {isLoading ? (
                        <LoadingState />
                    ) : artistData && (
                        <div style={{ marginTop: '3rem' }}>
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