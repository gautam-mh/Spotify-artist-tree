import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = 'http://localhost:8000/api'

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
        const artistResponse = await fetch(
            `${API_BASE_URL}/search-artist/${encodeURIComponent(query)}`
        )

        if (!artistResponse.ok) {
            const error = await artistResponse.json()
            return NextResponse.json(
                { error: error.detail || 'Artist not found' },
                { status: artistResponse.status }
            )
        }

        const artist = await artistResponse.json()

        // Then get the full artist tree
        const treeResponse = await fetch(
            `${API_BASE_URL}/artist-tree/${artist.id}`
        )

        if (!treeResponse.ok) {
            const error = await treeResponse.json()
            return NextResponse.json(
                { error: error.detail || 'Failed to fetch artist data' },
                { status: treeResponse.status }
            )
        }

        const treeData = await treeResponse.json()
        return NextResponse.json(treeData)
    } catch (error) {
        console.error('Error fetching artist data:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
