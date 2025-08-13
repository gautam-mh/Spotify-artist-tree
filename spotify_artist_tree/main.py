from spotify_artist_tree.functions import builder
import sys


while True:
    print(">> Enter the name of artist to get the album tree\n>> Press 0 to stop")
    inp = input()
    if inp == "0":
        sys.exit("Program has been exited successfully")
    builder(inp)
