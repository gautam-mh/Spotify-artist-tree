import { Artist, AlbumsByYear } from '@/types/spotify'
import { AlbumTree } from './album_tree'
import Image from 'next/image'

type ArtistViewProps = {
    artist: Artist
    albumsByYear: AlbumsByYear
}

export const ArtistView = ({ artist, albumsByYear }: ArtistViewProps) => {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex items-center mb-8">
                {artist.images?.[0] && (
                    <div className="relative w-32 h-32 mr-6 rounded-full overflow-hidden">
                        <Image
                            src={artist.images[0].url}
                            alt={artist.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <h1 className="text-4xl font-bold">{artist.name}</h1>
            </div>
            
            <div className="space-y-8">
                {Object.entries(albumsByYear)
                    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                    .map(([year, albums]) => (
                        <AlbumTree key={year} year={year} albums={albums} />
                    ))}
            </div>
        </div>
    )
}
