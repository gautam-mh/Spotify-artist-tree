# 🎵 Spotify Artist Tree

A Python CLI tool that generates a beautiful tree visualization of any artist's discography using the Spotify Web API. The tool organizes albums chronologically and displays all tracks within each album, creating an easy-to-read hierarchical view of an artist's musical journey.

## ✨ Features

- **Artist Search**: Automatically finds artists using Spotify's search API
- **Chronological Organization**: Groups albums by release year in descending order
- **Complete Discography**: Shows all albums and their tracks in a tree structure
- **Error Handling**: Graceful handling of network issues, rate limits, and missing data
- **Simple Interface**: Easy-to-use command-line interface with clear prompts
- **Zero Configuration**: Just add your Spotify API credentials and you're ready to go

## 🛠️ Technical Requirements

- Python 3.10 or higher
- Spotify Developer Account (for API credentials)
- Dependencies:
  - spotipy (^2.19.0) - Official Spotify Web API client for Python
  - pytest (^5.2) - For running tests

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   git clone https://github.com/your-username/spotify-artist-tree.git
   cd spotify-artist-tree
   ```

2. **Install Dependencies**
   ```bash
   # Using pip
   pip install -r requirements.txt

   # OR using Poetry (recommended)
   poetry install
   ```

3. **Configure Spotify API**
   - Create a new app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create `spotify_artist_tree/cred.py` with your credentials:
     ```python
     client_ID = "your_client_id_here"
     client_SECRET = "your_client_secret_here"
     ```

4. **Run the Program**
   ```bash
   python -m spotify_artist_tree.main
   ```

## 🎯 Usage Example

```bash
>> Enter the name of artist to get the album tree
>> Press 0 to stop
Led Zeppelin

2015
  |--Coda (Deluxe Edition)
    |--We're Gonna Groove - Rough Mix
    |--Poor Tom - Rough Mix
    ...
1979
  |--In Through the Out Door
    |--In the Evening
    |--South Bound Saurez
    ...
```

## 🔧 Project Structure

```
spotify_artist_tree/
├── api.py          # Spotify API interaction functions
├── functions.py    # Core logic for building the album tree
└── main.py         # CLI interface and entry point
```

### Key Components

- **api.py**: Handles all Spotify API interactions
  - Authentication using client credentials
  - Artist search functionality
  - Album and track data retrieval

- **functions.py**: Contains the core `builder` function that:
  - Processes artist search results
  - Groups albums by year
  - Generates the tree structure output

- **main.py**: Provides the CLI interface with:
  - Interactive input loop
  - Simple exit mechanism
  - Error handling display

## 🐛 Troubleshooting

- **Artist Not Found**: Check the spelling or try using the artist's exact Spotify name
- **Rate Limiting**: If you hit API rate limits, wait a few minutes before retrying
- **Authentication Errors**: Verify your credentials in `cred.py` are correct and properly formatted
- **Network Issues**: Ensure you have a stable internet connection

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or feedback:
- Email: gautammhiremath@gmail.com
- GitHub Issues: [Create an issue](https://github.com/your-username/spotify-artist-tree/issues)

---

Made with ❤️ using Python and Spotify Web API