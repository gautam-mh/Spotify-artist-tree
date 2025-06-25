# Spotify Artist Tree

## Overview
Spotify Artist Tree is a Python command-line tool that lets you explore any artist's discography using the Spotify Web API. Enter an artist's name, and the program prints a tree of all their albums and tracks, grouped by release year.

---

## Features
- Fetches albums and tracks for any artist from Spotify
- Groups albums by release year in a tree format
- Simple, interactive CLI
- Uses the official Spotify Web API via [spotipy](https://spotipy.readthedocs.io/)

---

## Requirements
- Python 3.10+
- Spotify Developer Account (for API credentials)
- See `requirements.txt` for Python dependencies:
  - spotipy==2.19.0
  - pytest==5.4.3 (for testing)

---

## Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/spotify-artist-tree.git
   cd spotify-artist-tree
   ```
2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
3. **Set up Spotify API credentials:**
   - Create a file named `cred.py` in the `spotify_artist_tree/` directory with the following content:
     ```python
     client_ID = "YOUR_SPOTIFY_CLIENT_ID"
     client_SECRET = "YOUR_SPOTIFY_CLIENT_SECRET"
     ```
   - Get your credentials from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).

---

## Usage
1. **Run the program:**
   ```sh
   python -m spotify_artist_tree.main
   ```
2. **Follow the prompt:**
   - Enter the name of an artist (e.g., `Led Zeppelin`).
   - The program will display albums and tracks in a tree format, grouped by year.
   - Enter `0` to exit.

### Example Output
```
>> Enter the name of artist to get the album tree
>> Press 0 to stop
Led Zeppelin
1969
  |--Led Zeppelin
    |--Good Times Bad Times
    |--Babe I'm Gonna Leave You
    ...
1971
  |--Led Zeppelin IV
    |--Black Dog
    |--Rock and Roll
    ...
```

---

## Testing
Run the tests with:
```sh
pytest
```

---

## Troubleshooting
- **Missing credentials:** If you see an error about missing credentials, ensure `cred.py` exists and contains valid Spotify API keys.
- **Network/API errors:** If you hit rate limits or have network issues, try again later.
- **No results:** The program always picks the first artist match. If you get the wrong artist, try a more specific name.

---

## Contributing
Contributions are welcome! Please open an issue or pull request for suggestions or improvements.

---

## License
MIT License (add your license here if different)

---

## Contact
For questions, contact gautammhiremath@gmail.com.
