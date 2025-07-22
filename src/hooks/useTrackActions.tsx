import { TrackType } from '@/types';

export function useTrackActions(
  setTracks: React.Dispatch<React.SetStateAction<TrackType[]>>,
  tracks: TrackType[]
) {
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

  const handleEditTrackSubmit = async (
    trackData: any,
    onSuccess?: () => void
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8000/tracks/${trackData.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trackData),
        }
      );

      if (response.ok) {
        const updatedTrack = await response.json();
        setTracks(
          tracks.map((t) => (t.id === updatedTrack.id ? updatedTrack : t))
        );
        onSuccess?.();
      } else {
        console.error('Failed to update track');
      }
    } catch (error) {
      console.error('Error updating track:', error);
    }
  };

  const handleDeleteTrack = async (track: TrackType) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${track.title}" by ${track.artist}?`
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:8000/tracks/${track.id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          setTracks(tracks.filter((t) => t.id !== track.id));
        } else {
          console.error('Failed to delete track');
        }
      } catch (error) {
        console.error('Error deleting track:', error);
      }
    }
  };

  return { handleAddTrack, handleEditTrackSubmit, handleDeleteTrack };
}
