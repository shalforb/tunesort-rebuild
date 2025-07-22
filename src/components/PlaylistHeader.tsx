import { useContext } from 'react';
import { PlaylistContext } from '@/context/PlaylistContext';
import { FaArrowLeft } from 'react-icons/fa';
import { Separator } from './UI/separator';
import { Link } from 'react-router-dom';

const PlaylistHeader = ({ title }: any) => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('PlaylistContext must be used within a Provider');
  }

  const { setShowAddTrackModal } = context;

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold ml-2">{title}</h1>
        </div>
        <button
          onClick={() => setShowAddTrackModal(true)}
          className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
        >
          <span className="text-lg">+</span>
          <span>Add Track</span>
        </button>
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default PlaylistHeader;
