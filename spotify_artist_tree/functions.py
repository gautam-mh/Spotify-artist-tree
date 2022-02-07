from api import get_artist_id, get_albums, get_tracks

def builder(user_input):
    artist = user_input
    artist_id = get_artist_id(artist)
    albums = get_albums(artist_id)
    # {
    #   "2020": [al1, al2,...],
    #   "2019": [al1,al2,..]
    # }
    grp_dict = {}
    for album in albums:
        if album["release_date"][0:4] not in grp_dict.keys():
            grp_dict[album["release_date"][0:4]] = [album]
        else:
            grp_dict[album["release_date"][0:4]].append(album)

    for year, albums in grp_dict.items():
        print(year)
        for album in albums:
            print("  |--" + album["name"])
            tracks = get_tracks(album["id"])
            for track in tracks:
                print("    |--" + track["name"])
