'use client'

import { SearchBar } from '@/components/search_bar'
import { ArtistView } from '@/components/artist_view'
import { useState } from 'react'
import { ArtistTreeData } from '@/types/spotify'

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
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12">
                    <h1 className="text-4xl font-bold text-center mb-8">
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