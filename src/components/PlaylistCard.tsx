import { Link } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';
import { Card, CardTitle, CardDescription, CardContent } from './UI/card';

const PlaylistCard = ({
  playlist,
  setPlaylistToDelete,
  setShowDeleteModal,
}: any) => {
  return (
    <Card className="p-4 flex-row justify-between cursor-pointer hover:shadow-md hover:p-6 transition-all delay-70 duration-100">
      <Link to={`/playlists/${playlist.id}`}>
        <CardTitle className="mb-1">{playlist.name}</CardTitle>
        <CardDescription>{playlist.description}</CardDescription>
      </Link>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => {
            setPlaylistToDelete(playlist);
            setShowDeleteModal(true);
          }}
        >
          <FaTrash />
        </button>
      </div>
    </Card>
  );
};

export default PlaylistCard;
