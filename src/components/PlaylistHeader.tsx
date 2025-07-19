import { FaArrowLeft } from 'react-icons/fa';
import { Separator } from './UI/separator';
import { Link } from 'react-router-dom';

const PlaylistHeader = ({ setShowAddModal, title }: any) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold ml-2">{title}</h1>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default PlaylistHeader;
