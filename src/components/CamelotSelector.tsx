interface CamelotSelectorProps {
  camelotOrder: string[];
  playlistTracks: { camelotKey: string }[];
  selectedCamelotKey: string;
  onSelect: (key: string) => void;
}

const CamelotSelector: React.FC<CamelotSelectorProps> = ({
  camelotOrder,
  playlistTracks,
  selectedCamelotKey,
  onSelect,
}) => {
  return (
    <div className="mb-8">
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
