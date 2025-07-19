import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { AppDataProps, TrackType } from '../types';
import PlaylistHeader from '../components/PlaylistHeader';
import CamelotSelector from '../components/CamelotSelector';
import SelectedTrackInfo from '../components/SelectedTrackInfo';
import TrackTable from '../components/TrackTable';
import TrackSearch from '../components/TrackSearch';
import AddTrackModal from '../components/AddTrackModal';

const PlaylistPage: React.FC<AppDataProps> = ({ playlists, tracks, setTracks }) => {
  const { id } = useParams();
  const showAllTracks = id === 'all';
  const playlist = playlists.find((p) => String(p.id) === id);

  const [selectedCamelotKey, setSelectedCamelotKey] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<TrackType | null>(null);
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);

  if (!showAllTracks && !playlist) {
    return <div className="p-8 text-destructive">Playlist not found</div>;
  }

  const playlistTracks = showAllTracks
    ? tracks
    : tracks.filter((track) => track.playlistId === id);

  const camelotOrder = [
    '1A',
    '1B',
    '2A',
    '2B',
    '3A',
    '3B',
    '4A',
    '4B',
    '5A',
    '5B',
    '6A',
    '6B',
    '7A',
    '7B',
    '8A',
    '8B',
    '9A',
    '9B',
    '10A',
    '10B',
    '11A',
    '11B',
    '12A',
    '12B',
  ];

  const getAdjacentCamelotKeys = (camelotKey: string) => {
    const number = camelotKey.slice(0, -1);
    const lowerNum = number === '1' ? '12' : String(parseInt(number) - 1);
    const higherNum = number === '12' ? '1' : String(parseInt(number) + 1);
    return {
      lower: [lowerNum + 'A', lowerNum + 'B'],
      same: [number + 'A', number + 'B'],
      higher: [higherNum + 'A', higherNum + 'B'],
    };
  };

  const getCompatibleTracks = (targetKeys: string[], referenceBpm: number) => {
    return playlistTracks
      .filter(
        (track) => {
          if (!targetKeys.includes(track.camelotKey)) return false;
          
          // Check if BPM is within ±10 of reference BPM
          const directMatch = Math.abs(track.tempoBpm - referenceBpm) <= 10;
          
          // Check if BPM is within ±10 of half the reference BPM (harmonic mixing)
          const halfMatch = Math.abs(track.tempoBpm - referenceBpm / 2) <= 10;
          
          // Check if BPM is within ±10 of double the reference BPM (harmonic mixing)
          const doubleMatch = Math.abs(track.tempoBpm - referenceBpm * 2) <= 10;
          
          return directMatch || halfMatch || doubleMatch;
        }
      )
      .sort((a, b) => a.tempoBpm - b.tempoBpm);
  };

  const handleCamelotKeyClick = (camelotKey: string) => {
    setSelectedCamelotKey(camelotKey);
    setSelectedTrack(null);
  };

  const handleTrackClick = (track: TrackType) => {
    setSelectedTrack(track);
  };

  const handleSearchTrackSelect = (track: TrackType) => {
    setSelectedTrack(track);
    setSelectedCamelotKey(''); // Clear camelot selection when searching
  };

  const handleAddTrack = async (trackData: any) => {
    try {
      const response = await fetch('http://localhost:8000/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      });
      
      if (response.ok) {
        const newTrack = await response.json();
        setTracks([...tracks, newTrack]);
      } else {
        console.error('Failed to add track');
      }
    } catch (error) {
      console.error('Error adding track:', error);
    }
  };

  let displayTracks = {
    lower: [] as TrackType[],
    same: [] as TrackType[],
    higher: [] as TrackType[],
  };

  if (selectedTrack) {
    const { lower, same, higher } = getAdjacentCamelotKeys(
      selectedTrack.camelotKey
    );
    displayTracks = {
      lower: getCompatibleTracks(lower, selectedTrack.tempoBpm),
      same: getCompatibleTracks(same, selectedTrack.tempoBpm),
      higher: getCompatibleTracks(higher, selectedTrack.tempoBpm),
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
          <CamelotSelector
            camelotOrder={camelotOrder}
            playlistTracks={playlistTracks}
            selectedCamelotKey={selectedCamelotKey}
            onSelect={handleCamelotKeyClick}
          />
        </div>
        <button
          onClick={() => setShowAddTrackModal(true)}
          className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2 ml-4"
        >
          <span className="text-lg">+</span>
          <span>Add Track</span>
        </button>
      </div>

      {selectedTrack && <SelectedTrackInfo selectedTrack={selectedTrack} />}

      <TrackSearch
        tracks={playlistTracks}
        onTrackSelect={handleSearchTrackSelect}
        selectedTrackId={selectedTrack?.id || null}
      />

      {(selectedTrack || selectedCamelotKey) && (
        <div className="space-y-6">
          {selectedTrack ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TrackTable
                tracks={displayTracks.lower}
                title="Lower Adjacent"
                subtitle="Previous Camelot number"
                selectedTrackId={null}
                referenceBpm={selectedTrack.tempoBpm}
                onTrackClick={handleTrackClick}
              />
              <TrackTable
                tracks={displayTracks.same}
                title="Same Number"
                subtitle="Same Camelot number (A/B)"
                selectedTrackId={selectedTrack.id}
                onTrackClick={handleTrackClick}
              />
              <TrackTable
                tracks={displayTracks.higher}
                title="Higher Adjacent"
                subtitle="Next Camelot number"
                selectedTrackId={null}
                referenceBpm={selectedTrack.tempoBpm}
                onTrackClick={handleTrackClick}
              />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <TrackTable
                tracks={displayTracks.same}
                title={`Tracks in ${selectedCamelotKey}`}
                subtitle="Click a track to see compatible mixing options"
                selectedTrackId={null}
                onTrackClick={handleTrackClick}
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
            Click on any track to see mixing-compatible tracks within ±10 BPM (including harmonic mixing)
          </p>
        </div>
      )}

      <AddTrackModal
        showAddModal={showAddTrackModal}
        setShowAddModal={setShowAddTrackModal}
        addTrack={handleAddTrack}
        playlists={playlists}
      />
    </div>
  );
};

export default PlaylistPage;
