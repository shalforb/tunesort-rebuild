import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AppDataProps, TrackType } from '../types';
import PlaylistHeader from '../components/PlaylistHeader';
import CamelotSelector from '../components/CamelotSelector';
import SelectedTrackInfo from '../components/SelectedTrackInfo';
import TrackTable from '../components/TrackTable';
import TrackSearch from '../components/TrackSearch';
import TrackModal from '../components/TrackModal';
import { PlaylistContext } from '../context/PlaylistContext';
import {
  getCompatibleCamelotKeys,
  getCompatibleTracks,
} from '@/lib/trackUtils';
import { useTrackActions } from '@/hooks/useTrackActions';

const PlaylistPage: React.FC<AppDataProps> = ({
  playlists,
  tracks,
  setTracks,
}) => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error('useContext must be used within a PlaylistProvider');
  }
  const {
    selectedTrack,
    selectedCamelotKey,
    showAddTrackModal,
    setShowAddTrackModal,
    showEditTrackModal,
    setShowEditTrackModal,
    trackToEdit,
    setTrackToEdit,
  } = context;

  const { id } = useParams();
  const showAllTracks = id === 'all';
  const playlist = playlists.find((p) => String(p.id) === id);
  const { handleAddTrack, handleEditTrackSubmit, handleDeleteTrack } =
    useTrackActions(setTracks, tracks);

  if (!showAllTracks && !playlist) {
    return <div className="p-8 text-destructive">Playlist not found</div>;
  }

  const playlistTracks = showAllTracks
    ? tracks
    : tracks.filter((track) => track.playlistId === id);

  let displayTracks = {
    lower: [] as TrackType[],
    same: [] as TrackType[],
    higher: [] as TrackType[],
  };

  if (selectedTrack) {
    const { lower, same, higher } = getCompatibleCamelotKeys(
      selectedTrack.camelotKey
    );
    displayTracks = {
      lower: getCompatibleTracks(playlistTracks, lower, selectedTrack.tempoBpm),
      same: getCompatibleTracks(playlistTracks, same, selectedTrack.tempoBpm),
      higher: getCompatibleTracks(
        playlistTracks,
        higher,
        selectedTrack.tempoBpm
      ),
    };
  } else if (selectedCamelotKey) {
    displayTracks.same = playlistTracks
      .filter((track) => track.camelotKey === selectedCamelotKey)
      .sort((a, b) => a.tempoBpm - b.tempoBpm);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PlaylistHeader
        title={showAllTracks ? 'All Tracks' : playlist?.name || ''}
      />

      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <CamelotSelector playlistTracks={playlistTracks} />
        </div>
      </div>

      {selectedTrack && <SelectedTrackInfo />}

      <TrackSearch tracks={playlistTracks} />

      {(selectedTrack || selectedCamelotKey) && (
        <div className="space-y-6">
          {selectedTrack ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TrackTable
                tracks={displayTracks.lower}
                title="Lower Adjacent"
                subtitle={`Previous Camelot number (${getCompatibleCamelotKeys(
                  selectedTrack.camelotKey
                ).lower.join(', ')})`}
                handleDeleteTrack={handleDeleteTrack}
              />
              <TrackTable
                tracks={displayTracks.same}
                title="Same Number"
                subtitle={`Same Camelot number (${getCompatibleCamelotKeys(
                  selectedTrack.camelotKey
                ).same.join(', ')})`}
                handleDeleteTrack={handleDeleteTrack}
              />
              <TrackTable
                tracks={displayTracks.higher}
                title="Higher Adjacent"
                subtitle={`Next Camelot number (${getCompatibleCamelotKeys(
                  selectedTrack.camelotKey
                ).higher.join(', ')})`}
                handleDeleteTrack={handleDeleteTrack}
              />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <TrackTable
                tracks={displayTracks.same}
                title={`Tracks in ${selectedCamelotKey}`}
                subtitle="Click a track to see compatible mixing options"
                handleDeleteTrack={handleDeleteTrack}
              />
            </div>
          )}
        </div>
      )}

      {!selectedCamelotKey && !selectedTrack && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Search for a track above or select a Camelot key to start exploring
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Click on any track to see mixing-compatible tracks within ±10 BPM
            (including harmonic mixing)
          </p>
        </div>
      )}

      <TrackModal
        isOpen={showAddTrackModal}
        onClose={() => setShowAddTrackModal(false)}
        onSubmit={handleAddTrack}
        playlists={playlists}
        mode="add"
      />

      <TrackModal
        isOpen={showEditTrackModal}
        onClose={() => setShowEditTrackModal(false)}
        onSubmit={handleEditTrackSubmit}
        initialData={trackToEdit}
        playlists={playlists}
        mode="edit"
      />
    </div>
  );
};

export default PlaylistPage;
