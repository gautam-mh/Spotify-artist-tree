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
    padding: '2rem 1rem',
    width: '100%'
}

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap' as const,
    gap: '1rem'
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
                    fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
                    fontWeight: 'bold',
                    color: '#111827',
                    lineHeight: '1.2'
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
