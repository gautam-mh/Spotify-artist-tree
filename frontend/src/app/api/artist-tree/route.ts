import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function GET(request: NextRequest) {
    console.log('API route called')
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    console.log('Search query:', query)

    if (!query) {
        return NextResponse.json(
            { error: 'Artist name is required' },
            { status: 400 }
        )
    }

    try {
        // First, search for the artist
        console.log('Fetching from:', `${API_BASE_URL}/search-artist/${encodeURIComponent(query)}`)
        const artistResponse = await fetch(
            `${API_BASE_URL}/search-artist/${encodeURIComponent(query)}`
        )
        console.log('Artist search response status:', artistResponse.status)

        if (!artistResponse.ok) {
            const error = await artistResponse.json()
            return NextResponse.json(
                { error: error.detail || 'Artist not found' },
                { status: artistResponse.status }
            )
        }

        const artist = await artistResponse.json()

        // Then get the full artist tree
        console.log('Fetching tree for artist:', artist)
        const treeResponse = await fetch(
            `${API_BASE_URL}/artist-tree/${artist.id}`
        )
        console.log('Tree response status:', treeResponse.status)

        if (!treeResponse.ok) {
            const error = await treeResponse.json()
            return NextResponse.json(
                { error: error.detail || 'Failed to fetch artist data' },
                { status: treeResponse.status }
            )
        }

        const treeData = await treeResponse.json()
        console.log('Tree data from backend:', JSON.stringify(treeData, null, 2))
        
        // Check if we have external_urls in the response
        const sampleAlbum = treeData.albumsByYear?.[Object.keys(treeData.albumsByYear)[0]]?.[0]
        console.log('Sample album data:', sampleAlbum)
        
        return NextResponse.json(treeData)
    } catch (error) {
        console.error('Error fetching artist data:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
