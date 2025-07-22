import { createContext, useContext, useState, ReactNode } from 'react';
import { TrackType } from '@/types';

export const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export interface PlaylistContextType {
  selectedTrack: TrackType | null;
  setSelectedTrack: (track: TrackType | null) => void;
}

interface PlaylistProviderProps {
  children: ReactNode;
}

export const PlaylistProvider = ({ children }: PlaylistProviderProps) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackType | null>(null);

  return (
    <PlaylistContext.Provider value={{ selectedTrack, setSelectedTrack }}>
      {children}
    </PlaylistContext.Provider>
  );
};
