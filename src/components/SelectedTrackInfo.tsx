import React, { useContext } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';

const SelectedTrackInfo: React.FC = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('PlaylistContext must be used within a Provider');
  }

  const { selectedTrack } = context;

  if (!selectedTrack) return null;

  return (
    <div className="mb-6 p-4 bg-accent rounded-lg border border-primary">
      <h3 className="font-semibold text-foreground mb-1">Selected Track</h3>
      <p className="text-foreground">
        <strong>{selectedTrack.title}</strong> by {selectedTrack.artist}
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        {selectedTrack.tempoBpm} BPM • {selectedTrack.camelotKey} • Showing
        compatible tracks within ±10 BPM (including harmonic mixing at
        half/double BPM)
      </p>
    </div>
  );
};

export default SelectedTrackInfo;
