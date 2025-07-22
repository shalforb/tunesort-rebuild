import { useContext } from 'react';
import { PlaylistContext } from '@/context/PlaylistContext';

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

const CamelotSelector: React.FC<{
  playlistTracks: { camelotKey: string }[];
}> = ({ playlistTracks }) => {
  const context = useContext(PlaylistContext);
  if (!context)
    throw new Error('PlaylistContext must be used within a Provider');
  const { selectedCamelotKey, setSelectedCamelotKey, setSelectedTrack } =
    context;

  const onSelect = (key: string) => {
    setSelectedCamelotKey(key);
    setSelectedTrack(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-foreground text-center">
        Select a Camelot Key
      </h2>
      <div className="grid grid-cols-12 gap-2 max-w-4xl justify-self-center">
        {camelotOrder.map((camelotKey) => {
          const hasTracksInKey = playlistTracks.some(
            (track) => track.camelotKey === camelotKey
          );
          return (
            <button
              key={camelotKey}
              onClick={() => onSelect(camelotKey)}
              disabled={!hasTracksInKey}
              className={`
                  p-4 rounded-lg border-2 font-medium transition-all
                  ${
                    selectedCamelotKey === camelotKey
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : hasTracksInKey
                      ? 'bg-card text-foreground border-border hover:bg-accent hover:border-ring'
                      : 'bg-muted text-muted-foreground border-border cursor-not-allowed'
                  }
                `}
            >
              {camelotKey}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CamelotSelector;
