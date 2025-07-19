import React, { useEffect, useRef } from 'react';
import { TrackType } from '../types';

interface TrackTableProps {
  tracks: TrackType[];
  title: string;
  subtitle?: string;
  selectedTrackId?: string | null;
  onTrackClick: (track: TrackType) => void;
  referenceBpm?: number;
}

const TrackTable: React.FC<TrackTableProps> = ({
  tracks,
  title,
  subtitle,
  selectedTrackId,
  onTrackClick,
  referenceBpm,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getCompatibilityType = (trackBpm: number, referenceBpm: number) => {
    const directMatch = Math.abs(trackBpm - referenceBpm) <= 10;
    const halfMatch = Math.abs(trackBpm - referenceBpm / 2) <= 10;
    const doubleMatch = Math.abs(trackBpm - referenceBpm * 2) <= 10;
    
    if (halfMatch) return 'half';
    if (doubleMatch) return 'double';
    return null; // Direct matches don't get a label
  };

  useEffect(() => {
    if (!containerRef.current || tracks.length === 0) return;

    let targetTrackId: string | null = null;

    if (selectedTrackId) {
      // For the same table, scroll to the exact selected track
      targetTrackId = selectedTrackId;
    } else if (referenceBpm && tracks.length > 0) {
      // For adjacent tables, find the track with closest BPM
      const closestTrack = tracks.reduce((closest, track) => {
        const closestDiff = Math.abs(closest.tempoBpm - referenceBpm);
        const currentDiff = Math.abs(track.tempoBpm - referenceBpm);
        return currentDiff < closestDiff ? track : closest;
      });
      targetTrackId = closestTrack.id;
    }

    if (targetTrackId && trackRefs.current[targetTrackId]) {
      const targetElement = trackRefs.current[targetTrackId];
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [tracks, selectedTrackId, referenceBpm]);

  if (tracks.length === 0) return null;

  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600 mb-3">{subtitle}</p>}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div ref={containerRef} className="max-h-96 overflow-y-auto">
          {tracks.map((track) => {
            const compatibilityType = referenceBpm ? getCompatibilityType(track.tempoBpm, referenceBpm) : null;
            
            return (
              <div
                key={track.id}
                ref={(el) => {
                  trackRefs.current[track.id] = el;
                }}
                onClick={() => onTrackClick(track)}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedTrackId === track.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="font-medium text-gray-900">{track.title}</div>
                <div className="text-sm text-gray-600">{track.artist}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {track.tempoBpm} BPM • {track.camelotKey}
                  {compatibilityType && (
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                      compatibilityType === 'half'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {compatibilityType === 'half' ? 'Half BPM' : 'Double BPM'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackTable;
