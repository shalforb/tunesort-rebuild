import { useState, useEffect } from 'react';
import { PlaylistType } from '../types';
import PlaylistCard from './PlaylistCard';

interface PlaylistCardsProps {
  playlists: PlaylistType[];
  setPlaylists: React.Dispatch<React.SetStateAction<PlaylistType[]>>;
  deletePlaylist: (id: string | number) => void;
}

const PlaylistCards = ({
  playlists,
  setPlaylists,
  deletePlaylist,
}: PlaylistCardsProps) => {
  useEffect(() => {
    const fetchPlaylists = async () => {
      const apiUrl = 'http://localhost:8000/playlists';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setPlaylists(data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          deletePlaylist={deletePlaylist}
        />
      ))}
    </div>
  );
};

export default PlaylistCards;
