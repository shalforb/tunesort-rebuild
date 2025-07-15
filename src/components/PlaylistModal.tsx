import { FaTimes } from 'react-icons/fa';
import { Button } from './UI/button';
import { Card, CardTitle, CardContent } from './UI/card';
import { Label } from './UI/label';
import { Input } from './UI/input';
import { Textarea } from './UI/textarea';

const PlaylistModal = ({
  showModal,
  setShowModal,
  addPlaylist,
  newPlaylist,
  setNewPlaylist,
}: any) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Card className="p-6 shadow-xl w-full max-w-md relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>
        <CardTitle className="text-xl">Create New Playlist</CardTitle>
        <CardContent>
          <form onSubmit={addPlaylist} className="space-y-4">
            <div>
              <Label className="text-sm">Playlist Name</Label>
              <Input
                type="text"
                value={newPlaylist.name}
                onChange={(e) =>
                  setNewPlaylist({ ...newPlaylist, name: e.target.value })
                }
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">Description</Label>
              <Textarea
                value={newPlaylist.description}
                onChange={(e) =>
                  setNewPlaylist({
                    ...newPlaylist,
                    description: e.target.value,
                  })
                }
                className="mt-1"
                rows={3}
              ></Textarea>
            </div>
            <Button type="submit" className="w-full">
              Add Playlist
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaylistModal;
