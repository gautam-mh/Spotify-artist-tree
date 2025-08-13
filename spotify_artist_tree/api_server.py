from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Optional
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
from dotenv import load_dotenv
from pydantic import BaseModel

# Load environment variables
load_dotenv()

app = FastAPI(title="Spotify Artist Tree API")

@app.get("/")
async def root():
    return {"message": "Spotify Artist Tree API is running"}

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Spotify client
try:
    client_credentials_manager = SpotifyClientCredentials(
        client_id=os.getenv("SPOTIFY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIFY_CLIENT_SECRET")
    )
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
except Exception as e:
    print(f"Error initializing Spotify client: {e}")
    raise

class ArtistResponse(BaseModel):
    id: str
    name: str
    images: List[Dict[str, Optional[str | int]]]

class TrackResponse(BaseModel):
    id: str
    name: str
    duration_ms: int
    track_number: int
    external_urls: Dict[str, str]

class AlbumResponse(BaseModel):
    id: str
    name: str
    release_date: str
    images: List[Dict[str, Optional[str | int]]]
    tracks: List[TrackResponse]
    external_urls: Dict[str, str]

class ArtistTreeResponse(BaseModel):
    artist: ArtistResponse
    albumsByYear: Dict[str, List[AlbumResponse]]

@app.get("/api/search-artist/{artist_name}", response_model=ArtistResponse)
async def search_artist(artist_name: str):
    try:
        print(f"Searching for artist: {artist_name}")
        results = sp.search(q=f"artist:{artist_name}", type="artist")
        print(f"Search results: {results}")
        
        if not results["artists"]["items"]:
            print("No artists found")
            raise HTTPException(status_code=404, detail="Artist not found")
        
        artist = results["artists"]["items"][0]
        print(f"Found artist: {artist['name']} (ID: {artist['id']})")
        return {
            "id": artist["id"],
            "name": artist["name"],
            "images": artist["images"]
        }
    except Exception as e:
        print(f"Error in search_artist: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/artist-tree/{artist_id}", response_model=ArtistTreeResponse)
async def get_artist_tree(artist_id: str):
    try:
        print(f"Getting tree for artist ID: {artist_id}")
        # Get artist details
        artist = sp.artist(artist_id)
        print(f"Got artist details: {artist['name']}")
        
        # Get all albums with limit and market filter to reduce results
        albums_data = []
        results = sp.artist_albums(
            artist_id,
            album_type="album",
            limit=20  # Limit to 20 albums per request
        )
        print(f"Initial albums fetch: {len(results['items'])} albums")
        albums_data.extend(results["items"])
        
        # Limit to 3 pages of albums (60 total) to prevent timeouts
        page_count = 1
        while results["next"] and page_count < 3:
            print(f"Fetching album page {page_count + 1}")
            results = sp.next(results)
            albums_data.extend(results["items"])
            page_count += 1
        
        # Group albums by year and fetch tracks
        albums_by_year = {}
        for album in albums_data:
            year = album["release_date"][:4]
            print(f"Processing album: {album['name']} ({year})")
            
            # Get tracks for the album (limit to first page only)
            tracks_data = []
            try:
                tracks = sp.album_tracks(album["id"], limit=50)  # Get up to 50 tracks
                tracks_data.extend(tracks["items"])
            except Exception as e:
                print(f"Error fetching tracks for album {album['name']}: {str(e)}")
                continue  # Skip this album if tracks can't be fetched
            
            album_with_tracks = {
                "id": album["id"],
                "name": album["name"],
                "release_date": album["release_date"],
                "images": album["images"],
                "external_urls": album["external_urls"],
                "tracks": [
                    {
                        "id": track["id"],
                        "name": track["name"],
                        "duration_ms": track["duration_ms"],
                        "track_number": track["track_number"],
                        "external_urls": track["external_urls"]
                    }
                    for track in tracks_data
                ]
            }
            
            if year not in albums_by_year:
                albums_by_year[year] = []
            albums_by_year[year].append(album_with_tracks)
        
        return {
            "artist": {
                "id": artist["id"],
                "name": artist["name"],
                "images": artist["images"]
            },
            "albumsByYear": albums_by_year
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
