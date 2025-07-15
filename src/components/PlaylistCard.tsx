import { FaTrash, FaEye } from 'react-icons/fa';
import { Card, CardTitle, CardDescription, CardContent } from './UI/card';

const PlaylistCard = ({ playlist, deletePlaylist }: any) => {
  return (
    <Card className="p-4 flex-row justify-between cursor-pointer hover:shadow-md hover:bg-primary hover:text-primary-foreground transition-shadow duration-200">
      <div>
        <CardTitle className="mb-1">{playlist.name}</CardTitle>
        <CardDescription>{playlist.description}</CardDescription>
      </div>
      <div className="flex items-center space-x-3">
        <button
          className="text-blue-500 hover:text-blue-600"
          title="View"
          onClick={() => console.log('View playlist', playlist.id)}
        >
          <FaEye />
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          title="Delete"
          onClick={() => deletePlaylist(playlist.id)}
        >
          <FaTrash />
        </button>
      </div>
    </Card>
  );
};

export default PlaylistCard;
