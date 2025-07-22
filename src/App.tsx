import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PlaylistType, TrackType } from './types';
import Home from './pages/Home';
import PlaylistPage from './pages/PlaylistPage';
import { PlaylistProvider } from './context/PlaylistContext';

function App() {
  const apiUrl = 'http://localhost:8000';
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [tracks, setTracks] = useState<TrackType[]>([]);

  // Fetch Playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch(`${apiUrl}/playlists`);
        const data = await res.json();
        setPlaylists(data);
      } catch (error) {
        console.log('Error fetching playlists', error);
      }
    };
    fetchPlaylists();
  }, []);

  //Fetch Tracks
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch(`${apiUrl}/tracks`);
        const data = await res.json();
        setTracks(data);
      } catch (error) {
        console.log('Error fetching tracks');
      }
    };
    fetchTracks();
  }, []);

  return (
    <PlaylistProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              playlists={playlists}
              setPlaylists={setPlaylists}
              tracks={tracks}
              setTracks={setTracks}
            />
          }
        ></Route>
        <Route
          path="/playlists/:id"
          element={
            <PlaylistPage
              playlists={playlists}
              setPlaylists={setPlaylists}
              tracks={tracks}
              setTracks={setTracks}
            />
          }
        ></Route>
      </Routes>
    </PlaylistProvider>
  );
}

export default App;
