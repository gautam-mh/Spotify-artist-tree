import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import cred

client_credentials_manager = SpotifyClientCredentials(
    client_id=cred.client_ID, client_secret=cred.client_SECRET
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

def get_artist_id(artist_name):
    

def get_albums(artist_id):
    album = sp.artist_albums(artist_id, album_type="album")
    return album


def get_tracks(album_id):
    tracks = sp.album_tracks(album_id)
    return tracks


get_albums(
    "https://open.spotify.com/artist/36QJpDe2go2KgaRleHCDTp?si=L_nga3lOT02AkK2YN8mCLA"
)
get_tracks(
    "https://open.spotify.com/album/6VH2op0GKIl3WNTbZmmcmI?si=1XxL9nRaQrOm2im6MDayPA"
)


