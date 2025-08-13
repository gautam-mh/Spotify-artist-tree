import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import cred 
import sys

try:
    client_credentials_manager = SpotifyClientCredentials(
        client_id=cred.client_ID, client_secret=cred.client_SECRET
    )
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
except:
    sys.exit("[!] Error: Client credentials not provided. Kindly add them in cred.py!")


def get_artist_id(artist_name):
    try:
        data = sp.search(q=f"artist:{artist_name}", type="artist")
        if not data["artists"]["items"]:
            return None
        return data["artists"]["items"][0]["id"]
    except:
        sys.exit("[!] Error: Network connection issue or Rate limit reached. Please try again")


def get_albums(artist_id):
    album_data = sp.artist_albums(artist_id, album_type="album")
    return album_data["items"]


def get_tracks(album_id):
    tracks_data = sp.album_tracks(album_id)
    return tracks_data["items"]


# print(get_tracks("6VH2op0GKIl3WNTbZmmcmI"))

# # print(get_albums("36QJpDe2go2KgaRleHCDTp"))

# print(get_artist_id("Led Zeppelin"))


