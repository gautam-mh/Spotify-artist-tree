from spotify_artist_tree.api import get_artist_id, get_albums, get_tracks

def builder(user_input):
    artist = user_input
    artist_id = get_artist_id(artist)
    
    if artist_id is None:
        print(f"[!] No artist found with name '{artist}'. Please check the spelling and try again.")
        return
    
    try:
        albums = get_albums(artist_id)
        if not albums:
            print(f"[!] No albums found for artist '{artist}'.")
            return
            
        # {
        #   "2020": [al1, al2,...],
        #   "2019": [al1,al2,..]
        # }
        grp_dict = {}
        for album in albums:
            year = album["release_date"][0:4]
            if year not in grp_dict:
                grp_dict[year] = [album]
            else:
                grp_dict[year].append(album)

        for year, albums in sorted(grp_dict.items(), reverse=True):
            print(year)
            for album in albums:
                print("  |--" + album["name"])
                try:
                    tracks = get_tracks(album["id"])
                    for track in tracks:
                        print("    |--" + track["name"])
                except:
                    print("    |-- [!] Could not fetch tracks for this album")
    except:
        print(f"[!] Error: Could not fetch albums for artist '{artist}'. Please try again later.")
