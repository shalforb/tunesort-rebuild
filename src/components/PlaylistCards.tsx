import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlaylistType } from '../types';
import PlaylistCard from './PlaylistCard';
import { Card, CardTitle } from './UI/card';

interface PlaylistCardsProps {
  playlists: PlaylistType[];
  deletePlaylist: (id: string | number) => void;
  setPlaylistToDelete: React.Dispatch<
    React.SetStateAction<PlaylistType | null>
  >;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaylistCards = ({
  playlists,
  deletePlaylist,
  setPlaylistToDelete,
  setShowDeleteModal,
}: PlaylistCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4 flex-row justify-between cursor-pointer hover:shadow-md hover:p-6 transition-all delay-70 duration-100">
        <Link to="playlists/all">
          <CardTitle className="mb-1">All Tracks</CardTitle>
        </Link>
      </Card>
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          deletePlaylist={deletePlaylist}
          setPlaylistToDelete={setPlaylistToDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      ))}
    </div>
  );
};

export default PlaylistCards;
