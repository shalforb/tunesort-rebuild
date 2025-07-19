import { useState, useEffect } from 'react';
import { PlaylistType, AppDataProps } from '../types';
import PlaylistHeader from '../components/HomeHeader';
import PlaylistCards from '../components/PlaylistCards';
import AddPlaylistModal from '../components/AddPlaylistModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

const Home: React.FC<AppDataProps> = ({
  playlists,
  setPlaylists,
  tracks,
  setTracks,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', description: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<PlaylistType | null>(
    null
  );

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
    setShowAddModal(false);
  };

  //Delete Playlist

  const deletePlaylist = async (id: string | number) => {
    const res = await fetch(`http://localhost:8000/playlists/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  const handleDeleteConfirmed = async () => {
    if (!playlistToDelete) return;

    await deletePlaylist(playlistToDelete.id);
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistToDelete.id));
    setShowDeleteModal(false);
    setPlaylistToDelete(null);
  };

  return (
    <div className="p-12 max-w-5xl mx-auto">
      <PlaylistHeader setShowAddModal={setShowAddModal} />
      <PlaylistCards
        playlists={playlists}
        deletePlaylist={deletePlaylist}
        setShowDeleteModal={setShowDeleteModal}
        setPlaylistToDelete={setPlaylistToDelete}
      />
      <AddPlaylistModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        setNewPlaylist={setNewPlaylist}
        addPlaylist={addPlaylist}
        newPlaylist={newPlaylist}
      />
      <DeleteConfirmModal
        open={showDeleteModal}
        onOpenChange={(open) => setShowDeleteModal(open)}
        playlist={playlistToDelete}
        onDelete={handleDeleteConfirmed}
      />
    </div>
  );
};

export default Home;
