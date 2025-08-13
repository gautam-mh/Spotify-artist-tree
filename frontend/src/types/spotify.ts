export type Track = {
    id: string
    name: string
    duration_ms: number
    track_number: number
    external_urls?: {
        spotify: string
    }
}

export type Album = {
    id: string
    name: string
    release_date: string
    images: Array<{
        url: string
        height: number
        width: number
    }>
    tracks?: Track[]
    external_urls?: {
        spotify: string
    }
}

export type Artist = {
    id: string
    name: string
    images: Array<{
        url: string
        height: number
        width: number
    }>
}

export type AlbumsByYear = {
    [year: string]: Album[]
}

export type ArtistTreeData = {
    artist: Artist
    albumsByYear: AlbumsByYear
}
