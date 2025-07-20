import React, { useState, useMemo } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { TrackType } from '../types';
import { Input } from './UI/input';
import { Card, CardContent } from './UI/card';

interface TrackSearchProps {
  tracks: TrackType[];
  onTrackSelect: (track: TrackType) => void;
  selectedTrackId?: string | null;
}

const TrackSearch: React.FC<TrackSearchProps> = ({
  tracks,
  onTrackSelect,
  selectedTrackId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return tracks
      .filter(
        (track) =>
          track.title.toLowerCase().includes(query) ||
          track.artist.toLowerCase().includes(query) ||
          track.camelotKey.toLowerCase().includes(query) ||
          track.tempoBpm.toString().includes(query)
      )
      .sort((a, b) => {
        // Prioritize exact matches
        const aTitleMatch = a.title.toLowerCase() === query;
        const bTitleMatch = b.title.toLowerCase() === query;
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;

        // Then sort by title
        return a.title.localeCompare(b.title);
      })
      .slice(0, 10); // Limit to 10 results
  }, [tracks, searchQuery]);

  const handleTrackClick = (track: TrackType) => {
    onTrackSelect(track);
    setSearchQuery('');
    setIsExpanded(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsExpanded(false);
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tracks by title, artist, BPM, or Camelot key..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsExpanded(true);
          }}
          onFocus={() => setIsExpanded(true)}
          className="px-10 py-6"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <FaTimes size={14} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isExpanded && (searchQuery || filteredTracks.length > 0) && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-2 shadow-lg">
          <CardContent className="p-0">
            {searchQuery && filteredTracks.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No tracks found matching "{searchQuery}"
              </div>
            ) : filteredTracks.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => handleTrackClick(track)}
                    className={`p-3 border-b border-border cursor-pointer hover:bg-accent transition-colors ${
                      selectedTrackId === track.id
                        ? 'bg-accent border-primary'
                        : ''
                    }`}
                  >
                    <div className="font-medium text-foreground">
                      {track.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {track.artist}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {track.tempoBpm} BPM • {track.camelotKey}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Start typing to search for tracks...
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Click outside to close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default TrackSearch;
