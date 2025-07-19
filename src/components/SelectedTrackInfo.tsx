import { TrackType } from '../types';

interface SelectedTrackInfoProps {
  selectedTrack: TrackType;
}

const SelectedTrackInfo: React.FC<SelectedTrackInfoProps> = ({
  selectedTrack,
}) => {
  return (
    <div className="mb-6 p-4 bg-accent rounded-lg border border-primary">
      <h3 className="font-semibold text-foreground mb-1">Selected Track</h3>
      <p className="text-foreground">
        <strong>{selectedTrack.title}</strong> by {selectedTrack.artist}
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        {selectedTrack.tempoBpm} BPM • {selectedTrack.camelotKey} • Showing
        compatible tracks within ±10 BPM (including harmonic mixing at half/double BPM)
      </p>
    </div>
  );
};

export default SelectedTrackInfo;
