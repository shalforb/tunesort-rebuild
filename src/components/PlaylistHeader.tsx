import { FaSortAlphaDown, FaCalendarAlt, FaEdit, FaPlus } from 'react-icons/fa';

const PlaylistHeader = ({ setShowModal }: any) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <button title="Sort A-Z" className="text-gray-600 hover:text-primary">
          <FaSortAlphaDown size={20} />
        </button>
        <button
          title="Sort by Date"
          className="text-gray-600 hover:text-primary"
        >
          <FaCalendarAlt size={20} />
        </button>
        <button title="Edit Mode" className="text-gray-600 hover:text-primary">
          <FaEdit size={20} />
        </button>
        <h1 className="text-2xl font-bold ml-2">Your Playlists</h1>
      </div>
      <button
        title="Add New Playlist"
        onClick={() => setShowModal(true)}
        className="p-2 bg-primary text-white rounded-full hover:bg-indigo-700 transition"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default PlaylistHeader;
