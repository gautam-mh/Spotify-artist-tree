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

class AlbumResponse(BaseModel):
    id: str
    name: str
    release_date: str
    images: List[Dict[str, Optional[str | int]]]
    tracks: List[TrackResponse]

class ArtistTreeResponse(BaseModel):
    artist: ArtistResponse
    albumsByYear: Dict[str, List[AlbumResponse]]

@app.get("/api/search-artist/{artist_name}", response_model=ArtistResponse)
async def search_artist(artist_name: str):
    try:
        results = sp.search(q=f"artist:{artist_name}", type="artist")
        if not results["artists"]["items"]:
            raise HTTPException(status_code=404, detail="Artist not found")
        
        artist = results["artists"]["items"][0]
        return {
            "id": artist["id"],
            "name": artist["name"],
            "images": artist["images"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/artist-tree/{artist_id}", response_model=ArtistTreeResponse)
async def get_artist_tree(artist_id: str):
    try:
        # Get artist details
        artist = sp.artist(artist_id)
        
        # Get all albums
        albums_data = []
        results = sp.artist_albums(artist_id, album_type="album")
        albums_data.extend(results["items"])
        
        while results["next"]:
            results = sp.next(results)
            albums_data.extend(results["items"])
        
        # Group albums by year and fetch tracks
        albums_by_year = {}
        for album in albums_data:
            year = album["release_date"][:4]
            
            # Get tracks for the album
            tracks_data = []
            tracks = sp.album_tracks(album["id"])
            tracks_data.extend(tracks["items"])
            
            while tracks["next"]:
                tracks = sp.next(tracks)
                tracks_data.extend(tracks["items"])
            
            album_with_tracks = {
                "id": album["id"],
                "name": album["name"],
                "release_date": album["release_date"],
                "images": album["images"],
                "tracks": [
                    {
                        "id": track["id"],
                        "name": track["name"],
                        "duration_ms": track["duration_ms"],
                        "track_number": track["track_number"]
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
