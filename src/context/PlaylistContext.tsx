import { createContext, useContext, useState, ReactNode } from 'react';
import { TrackType } from '@/types';

export const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export interface PlaylistContextType {
  selectedTrack: TrackType | null;
  setSelectedTrack: (track: TrackType | null) => void;
  selectedCamelotKey: string;
  setSelectedCamelotKey: (key: string) => void;
  showAddTrackModal: boolean;
  setShowAddTrackModal: (val: boolean) => void;
  showEditTrackModal: boolean;
  setShowEditTrackModal: (val: boolean) => void;
  trackToEdit: TrackType | null;
  setTrackToEdit: (track: TrackType | null) => void;
  handleEditTrack: (track: TrackType) => void;
}

interface PlaylistProviderProps {
  children: ReactNode;
}

export const PlaylistProvider = ({ children }: PlaylistProviderProps) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackType | null>(null);
  const [selectedCamelotKey, setSelectedCamelotKey] = useState<string>('');
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [showEditTrackModal, setShowEditTrackModal] = useState(false);
  const [trackToEdit, setTrackToEdit] = useState<TrackType | null>(null);

  const handleEditTrack = (track: TrackType) => {
    setTrackToEdit(track);
    setShowEditTrackModal(true);
  };

  return (
    <PlaylistContext.Provider
      value={{
        selectedTrack,
        setSelectedTrack,
        selectedCamelotKey,
        setSelectedCamelotKey,
        showAddTrackModal,
        setShowAddTrackModal,
        showEditTrackModal,
        setShowEditTrackModal,
        trackToEdit,
        setTrackToEdit,
        handleEditTrack,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
