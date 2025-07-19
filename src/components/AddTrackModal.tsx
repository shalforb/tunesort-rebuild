import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { Button } from './UI/button';
import { Card, CardTitle, CardContent } from './UI/card';
import { Label } from './UI/label';
import { Input } from './UI/input';
import { PlaylistType } from '../types';

interface AddTrackModalProps {
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  addTrack: (trackData: any) => void;
  playlists: PlaylistType[];
}

const AddTrackModal: React.FC<AddTrackModalProps> = ({
  showAddModal,
  setShowAddModal,
  addTrack,
  playlists,
}) => {
  const [newTrack, setNewTrack] = useState({
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trackData = {
      ...newTrack,
      id: crypto.randomUUID(),
      tempoBpm: parseInt(newTrack.tempoBpm),
      playlistId: newTrack.playlistId || null,
    };
    addTrack(trackData);
    setNewTrack({
      title: '',
      artist: '',
      tempoBpm: '',
      camelotKey: '',
      playlistId: '',
    });
    setShowAddModal(false);
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Card className="p-6 shadow-xl w-full max-w-md relative">
        <button
          onClick={() => setShowAddModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>
        <CardTitle className="text-xl">Add New Track</CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm">Track Title *</Label>
              <Input
                type="text"
                value={newTrack.title}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, title: e.target.value })
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
                value={newTrack.artist}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, artist: e.target.value })
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
                value={newTrack.tempoBpm}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, tempoBpm: e.target.value })
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
                value={newTrack.camelotKey}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, camelotKey: e.target.value })
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
              <Label className="text-sm">Add to Playlist (Optional)</Label>
              <select
                value={newTrack.playlistId}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, playlistId: e.target.value })
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
            <Button type="submit" className="w-full">
              Add Track
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTrackModal; 