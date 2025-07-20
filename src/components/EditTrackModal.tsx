import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Button } from './UI/button';
import { Card, CardTitle, CardContent } from './UI/card';
import { Label } from './UI/label';
import { Input } from './UI/input';
import { PlaylistType, TrackType } from '../types';

interface EditTrackModalProps {
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  editTrack: (trackData: any) => void;
  playlists: PlaylistType[];
  trackToEdit: TrackType | null;
}

const EditTrackModal: React.FC<EditTrackModalProps> = ({
  showEditModal,
  setShowEditModal,
  editTrack,
  playlists,
  trackToEdit,
}) => {
  const [editedTrack, setEditedTrack] = useState({
    title: '',
    artist: '',
    tempoBpm: '',
    camelotKey: '',
    playlistId: '',
  });

  const camelotKeys = [
    '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B',
    '7A', '7B', '8A', '8B', '9A', '9B', '10A', '10B', '11A', '11B', '12A', '12B'
  ];

  // Pre-populate form when trackToEdit changes
  useEffect(() => {
    if (trackToEdit) {
      setEditedTrack({
        title: trackToEdit.title,
        artist: trackToEdit.artist,
        tempoBpm: trackToEdit.tempoBpm.toString(),
        camelotKey: trackToEdit.camelotKey,
        playlistId: trackToEdit.playlistId || '',
      });
    }
  }, [trackToEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trackToEdit) return;

    const trackData = {
      ...trackToEdit,
      ...editedTrack,
      tempoBpm: parseInt(editedTrack.tempoBpm),
      playlistId: editedTrack.playlistId || null,
    };
    
    editTrack(trackData);
    setShowEditModal(false);
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  if (!showEditModal || !trackToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Card className="p-6 shadow-xl w-full max-w-md relative">
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>
        <CardTitle className="text-xl">Edit Track</CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm">Track Title *</Label>
              <Input
                type="text"
                value={editedTrack.title}
                onChange={(e) =>
                  setEditedTrack({ ...editedTrack, title: e.target.value })
                }
                required
                className="mt-1"
                placeholder="Enter track title"
              />
            </div>
            <div>
              <Label className="text-sm">Artist *</Label>
              <Input
                type="text"
                value={editedTrack.artist}
                onChange={(e) =>
                  setEditedTrack({ ...editedTrack, artist: e.target.value })
                }
                required
                className="mt-1"
                placeholder="Enter artist name"
              />
            </div>
            <div>
              <Label className="text-sm">BPM *</Label>
              <Input
                type="number"
                value={editedTrack.tempoBpm}
                onChange={(e) =>
                  setEditedTrack({ ...editedTrack, tempoBpm: e.target.value })
                }
                required
                min="1"
                max="999"
                className="mt-1"
                placeholder="e.g., 128"
              />
            </div>
            <div>
              <Label className="text-sm">Camelot Key *</Label>
              <select
                value={editedTrack.camelotKey}
                onChange={(e) =>
                  setEditedTrack({ ...editedTrack, camelotKey: e.target.value })
                }
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a key</option>
                {camelotKeys.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-sm">Playlist</Label>
              <select
                value={editedTrack.playlistId}
                onChange={(e) =>
                  setEditedTrack({ ...editedTrack, playlistId: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">No playlist (add to all tracks)</option>
                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTrackModal; 