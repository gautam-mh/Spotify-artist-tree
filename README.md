# 🎵 Spotify Artist Tree

A full-stack web application and CLI tool that generates a beautiful visualization of any artist's discography using the Spotify Web API. The application organizes albums chronologically and displays all tracks within each album, creating an easy-to-read hierarchical view of an artist's musical journey.

## ✨ Features

### Web Application
- **Real-time Search**: Instantly search for any artist on Spotify
- **Interactive UI**: Expandable album view with track listings
- **Direct Spotify Integration**: Open albums and play tracks directly in Spotify
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UX**: Toast notifications, loading states, and smooth animations
- **Error Handling**: Graceful handling of network issues and API errors

### CLI Tool
- **Artist Search**: Automatically finds artists using Spotify's search API
- **Chronological Organization**: Groups albums by release year in descending order
- **Complete Discography**: Shows all albums and their tracks in a tree structure
- **Error Handling**: Graceful handling of network issues, rate limits, and missing data

## 🛠️ Technical Requirements

### Backend
- Python 3.10 or higher
- FastAPI for the REST API
- Dependencies:
  - spotipy (^2.19.0) - Official Spotify Web API client for Python
  - fastapi - Modern web framework for building APIs
  - uvicorn - ASGI server for FastAPI
  - python-dotenv - Environment variable management

### Frontend
- Node.js 18 or higher
- Next.js 14 for the web application
- Dependencies:
  - React - UI library
  - Next.js - React framework
  - Framer Motion - Animation library
  - React Hot Toast - Toast notifications
  - Heroicons - Icon library

### General
- Spotify Developer Account (for API credentials)
- Git for version control

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   git clone https://github.com/your-username/spotify-artist-tree.git
   cd spotify-artist-tree
   ```

2. **Backend Setup**
   ```bash
   # Create and configure .env file
   echo "SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   FRONTEND_URL=http://localhost:3000" > .env

   # Install Python dependencies
   pip install -r requirements.txt

   # Start the backend server
   python -m spotify_artist_tree.api_server
   ```

3. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd frontend

   # Create and configure .env.local file
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api" > .env.local

   # Install dependencies
   npm install

   # Start the development server
   npm run dev
   ```

4. **Access the Application**
   - Web App: Open http://localhost:3000 in your browser
   - CLI Tool: Run `python -m spotify_artist_tree.main` in a separate terminal

## 💻 Web Application Features

### Search and Display
- Real-time artist search with debouncing
- Chronologically organized albums
- Expandable track listings
- Direct links to Spotify

### User Experience
- Responsive design for all screen sizes
- Loading states and animations
- Toast notifications for user feedback
- Error handling and retry mechanisms

### Performance
- Optimized API calls
- Debounced search
- Efficient data caching

## 🎯 CLI Usage Example

```bash
>> Enter the name of artist to get the album tree
>> Press 0 to stop
Led Zeppelin

2015
  |--Coda (Deluxe Edition)
    |--We're Gonna Groove - Rough Mix
    |--Poor Tom - Rough Mix
    ...
```

## 🔧 Project Structure

```
spotify-artist-tree/
├── frontend/                # Next.js web application
│   ├── src/
│   │   ├── app/            # Next.js app router
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
│
├── spotify_artist_tree/    # Python backend
│   ├── api_server.py      # FastAPI server
│   ├── api.py            # Spotify API interaction
│   ├── functions.py      # Core logic
│   └── main.py           # CLI interface
│
└── tests/                # Test files
```

## 🐛 Troubleshooting

- **Artist Not Found**: Check the spelling or try using the artist's exact Spotify name
- **Rate Limiting**: If you hit API rate limits, wait a few minutes before retrying
- **Authentication Errors**: Verify your credentials in `.env` are correct
- **Network Issues**: Ensure you have a stable internet connection
- **CORS Issues**: Make sure FRONTEND_URL in `.env` matches your frontend URL

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

Made with ❤️ using Python, Next.js, and Spotify Web API