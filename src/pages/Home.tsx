import { useState, useEffect } from 'react';
import { PlaylistType } from '../types';
import PlaylistHeader from '../components/PlaylistHeader';
import PlaylistCards from '../components/PlaylistCards';
import PlaylistModal from '../components/PlaylistModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', description: '' });

  // Add Playlist

  const addPlaylist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newPlaylist, id: crypto.randomUUID() }),
    });
    const data = await res.json();
    setPlaylists([...playlists, data]);
    setNewPlaylist({ name: '', description: '' });
    setShowModal(false);
  };

  //Delete Playlist

  const deletePlaylist = async (id: string | number) => {
    const res = await fetch(`http://localhost:8000/playlists/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  return (
    <div className="p-12 max-w-5xl mx-auto">
      <PlaylistHeader setShowModal={setShowModal} />
      <PlaylistCards
        playlists={playlists}
        setPlaylists={setPlaylists}
        deletePlaylist={deletePlaylist}
      />
      <PlaylistModal
        showModal={showModal}
        setShowModal={setShowModal}
        addPlaylist={addPlaylist}
        newPlaylist={newPlaylist}
        setNewPlaylist={setNewPlaylist}
      />
    </div>
  );
};

export default Home;
