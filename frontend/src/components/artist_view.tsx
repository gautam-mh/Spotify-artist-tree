import { Artist, AlbumsByYear } from '@/types/spotify'
import { AlbumTree } from './album_tree'
import Image from 'next/image'

type ArtistViewProps = {
    artist: Artist
    albumsByYear: AlbumsByYear
}

const containerStyle = {
    maxWidth: '56rem',
    margin: '0 auto',
    padding: '2rem 0'
}

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem'
}

const artistImageStyle = {
    position: 'relative' as const,
    width: '8rem',
    height: '8rem',
    marginRight: '1.5rem',
    borderRadius: '9999px',
    overflow: 'hidden'
}

export const ArtistView = ({ artist, albumsByYear }: ArtistViewProps) => {
    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                {artist.images?.[0] && (
                    <div style={artistImageStyle}>
                        <Image
                            src={artist.images[0].url}
                            alt={artist.name}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}
                <h1 style={{
                    fontSize: '2.25rem',
                    fontWeight: 'bold',
                    color: '#111827'
                }}>{artist.name}</h1>
            </div>
            
            <div>
                {Object.entries(albumsByYear)
                    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                    .map(([year, albums]) => (
                        <AlbumTree key={year} year={year} albums={albums} />
                    ))}
            </div>
        </div>
    )
}
