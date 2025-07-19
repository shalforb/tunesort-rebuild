import { FaSortAlphaDown, FaCalendarAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { Separator } from './UI/separator';

const HomeHeader = ({ setShowAddModal }: any) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <button title="Sort A-Z" className="text-muted-foreground hover:text-primary">
            <FaSortAlphaDown size={20} />
          </button>
          <button
            title="Sort by Date"
            className="text-muted-foreground hover:text-primary"
          >
            <FaCalendarAlt size={20} />
          </button>
          <button
            title="Edit Mode"
            className="text-muted-foreground hover:text-primary"
          >
            <FaEdit size={20} />
          </button>
          <h1 className="text-2xl font-bold ml-2">Your Playlists</h1>
        </div>
        <button
          title="Add New Playlist"
          onClick={() => setShowAddModal(true)}
          className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition"
        >
          <FaPlus />
        </button>
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default HomeHeader;
