import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Button } from './UI/button';
import { Card, CardTitle, CardContent } from './UI/card';
import { Label } from './UI/label';
import { Input } from './UI/input';
import { PlaylistType, TrackType } from '../types';

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trackData: any) => void;
  initialData?: TrackType | null;
  playlists: PlaylistType[];
  mode?: 'add' | 'edit';
}

const TrackModal: React.FC<TrackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  playlists,
  mode = 'add',
}) => {
  const [trackForm, setTrackForm] = useState({
    title: '',
    artist: '',
    tempoBpm: '',
    camelotKey: '',
    playlistId: '',
  });

  const camelotKeys = [
    '1A',
    '1B',
    '2A',
    '2B',
    '3A',
    '3B',
    '4A',
    '4B',
    '5A',
    '5B',
    '6A',
    '6B',
    '7A',
    '7B',
    '8A',
    '8B',
    '9A',
    '9B',
    '10A',
    '10B',
    '11A',
    '11B',
    '12A',
    '12B',
  ];

  useEffect(() => {
    if (initialData) {
      setTrackForm({
        title: initialData.title,
        artist: initialData.artist,
        tempoBpm: initialData.tempoBpm.toString(),
        camelotKey: initialData.camelotKey,
        playlistId: initialData.playlistId || '',
      });
    } else {
      setTrackForm({
        title: '',
        artist: '',
        tempoBpm: '',
        camelotKey: '',
        playlistId: '',
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trackData: any = {
      ...(initialData || { id: crypto.randomUUID() }),
      ...trackForm,
      tempoBpm: parseInt(trackForm.tempoBpm),
      playlistId: trackForm.playlistId || '',
    };

    onSubmit(trackData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Card className="p-6 shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>
        <CardTitle className="text-xl">
          {mode === 'edit' ? 'Edit Track' : 'Add New Track'}
        </CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm">Track Title *</Label>
              <Input
                type="text"
                value={trackForm.title}
                onChange={(e) =>
                  setTrackForm({ ...trackForm, title: e.target.value })
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
                value={trackForm.artist}
                onChange={(e) =>
                  setTrackForm({ ...trackForm, artist: e.target.value })
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
                value={trackForm.tempoBpm}
                onChange={(e) =>
                  setTrackForm({ ...trackForm, tempoBpm: e.target.value })
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
                value={trackForm.camelotKey}
                onChange={(e) =>
                  setTrackForm({ ...trackForm, camelotKey: e.target.value })
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
                value={trackForm.playlistId}
                onChange={(e) =>
                  setTrackForm({ ...trackForm, playlistId: e.target.value })
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
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {mode === 'edit' ? 'Save Changes' : 'Add Track'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackModal;
