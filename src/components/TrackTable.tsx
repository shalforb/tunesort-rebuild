import React, { useEffect, useRef, useState, useContext } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';
import {
  FaEllipsisH,
  FaEdit,
  FaTrash,
  FaMicrophone,
  FaMusic,
} from 'react-icons/fa';
import { TrackType } from '../types';

interface TrackTableProps {
  tracks: TrackType[];
  title: string;
  subtitle?: string;
  handleDeleteTrack: (track: TrackType) => Promise<void>;
}

const TrackTable: React.FC<TrackTableProps> = ({
  tracks,
  title,
  subtitle,
  handleDeleteTrack,
}) => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error('TrackTable must be used within a PlaylistProvider');
  }

  const { selectedTrack, setSelectedTrack, handleEditTrack } = context;

  const referenceBpm = selectedTrack?.tempoBpm;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);
  const [showMenuForTrack, setShowMenuForTrack] = useState<string | null>(null);

  const getCompatibilityType = (trackBpm: number, referenceBpm: number) => {
    const directMatch = Math.abs(trackBpm - referenceBpm) <= 10;
    const halfMatch = Math.abs(trackBpm - referenceBpm / 2) <= 10;
    const doubleMatch = Math.abs(trackBpm - referenceBpm * 2) <= 10;

    if (halfMatch) return 'half';
    if (doubleMatch) return 'double';
    return null; // Direct matches don't get a label
  };

  const handleMenuClick = (e: React.MouseEvent, trackId: string) => {
    e.stopPropagation();
    setShowMenuForTrack(showMenuForTrack === trackId ? null : trackId);
  };

  const handleEditClick = (e: React.MouseEvent, track: TrackType) => {
    e.stopPropagation();
    setShowMenuForTrack(null);
    handleEditTrack?.(track);
  };

  const handleDeleteClick = (e: React.MouseEvent, track: TrackType) => {
    e.stopPropagation();
    setShowMenuForTrack(null);
    handleDeleteTrack?.(track);
  };

  const handleSearchAcapella = (e: React.MouseEvent, track: TrackType) => {
    e.stopPropagation();
    setShowMenuForTrack(null);
    const searchQuery = encodeURIComponent(
      `${track.title} ${track.artist} acapella`
    );
    window.open(
      `https://www.youtube.com/results?search_query=${searchQuery}`,
      '_blank'
    );
  };

  const handleSearchInstrumental = (e: React.MouseEvent, track: TrackType) => {
    e.stopPropagation();
    setShowMenuForTrack(null);
    const searchQuery = encodeURIComponent(
      `${track.title} ${track.artist} instrumental`
    );
    window.open(
      `https://www.youtube.com/results?search_query=${searchQuery}`,
      '_blank'
    );
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMenuForTrack(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!containerRef.current || tracks.length === 0) return;

    let targetTrackId: string | null = null;

    if (
      selectedTrack?.id &&
      tracks.some((track) => track.id === selectedTrack.id)
    ) {
      // If the selected track is in this table, scroll to it
      targetTrackId = selectedTrack.id;
    } else if (referenceBpm && tracks.length > 0) {
      // Otherwise, scroll to the track with closest BPM in this table
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
  }, [tracks, selectedTrack?.id, referenceBpm]);

  if (tracks.length === 0) return null;

  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600 mb-3">{subtitle}</p>}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div ref={containerRef} className="max-h-96 overflow-y-auto">
          {tracks.map((track) => {
            const compatibilityType = referenceBpm
              ? getCompatibilityType(track.tempoBpm, referenceBpm)
              : null;

            return (
              <div
                key={track.id}
                ref={(el) => {
                  trackRefs.current[track.id] = el;
                }}
                onClick={() => setSelectedTrack(track)}
                onMouseEnter={() => setHoveredTrackId(track.id)}
                onMouseLeave={() => setHoveredTrackId(null)}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors relative ${
                  selectedTrack?.id === track.id &&
                  selectedTrack?.camelotKey === track.camelotKey
                    ? 'bg-blue-50 border-blue-200'
                    : ''
                }`}
              >
                <div className="font-medium text-gray-900">{track.title}</div>
                <div className="text-sm text-gray-600">{track.artist}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {track.tempoBpm} BPM • {track.camelotKey}
                  {compatibilityType && (
                    <span
                      className={`ml-2 px-2 py-0.5 rounded text-xs ${
                        compatibilityType === 'half'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {compatibilityType === 'half' ? 'Half BPM' : 'Double BPM'}
                    </span>
                  )}
                </div>

                {/* Hover Menu */}
                {hoveredTrackId === track.id && (
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => handleMenuClick(e, track.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FaEllipsisH size={14} />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenuForTrack === track.id && (
                      <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                        <button
                          onClick={(e) => handleEditClick(e, track)}
                          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <FaEdit size={12} />
                          <span>Edit Track</span>
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, track)}
                          className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <FaTrash size={12} />
                          <span>Delete Track</span>
                        </button>
                        <button
                          onClick={(e) => handleSearchAcapella(e, track)}
                          className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center space-x-2"
                        >
                          <FaMicrophone size={12} />
                          <span>Search Acapella</span>
                        </button>
                        <button
                          onClick={(e) => handleSearchInstrumental(e, track)}
                          className="w-full px-3 py-2 text-left text-sm text-purple-600 hover:bg-purple-50 flex items-center space-x-2"
                        >
                          <FaMusic size={12} />
                          <span>Search Instrumental</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackTable;
