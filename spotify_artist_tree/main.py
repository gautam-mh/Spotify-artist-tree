import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import cred

client_credentials_manager = SpotifyClientCredentials(
    client_id=cred.client_ID, client_secret=cred.client_SECRET
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


def get_artist_id(artist_name):
    data = sp.search(q=f"artist:{artist_name}", type="artist")
    return data["artists"]["items"][0]["id"]


def get_albums(artist_id):
    album_data = sp.artist_albums(artist_id, album_type="album")
    return album_data["items"]


def get_tracks(album_id):
    tracks_data = sp.album_tracks(album_id)
    return tracks_data["items"]


# print(get_tracks("6VH2op0GKIl3WNTbZmmcmI"))

# # print(get_albums("36QJpDe2go2KgaRleHCDTp"))

# print(get_artist_id("Led Zeppelin"))

artist = input()
artist_id = get_artist_id(artist)
albums = get_albums(artist_id)
for album in albums:
    print(album["release_date"][0:4])
    print("  |--" + album["name"])
    tracks = get_tracks(album["id"])
    for track in tracks:
        print("    |--" + track["name"])
