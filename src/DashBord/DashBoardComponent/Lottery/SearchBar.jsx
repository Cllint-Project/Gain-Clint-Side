
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchText, onSearchChange }) => {
  return (
    <div className="relative flex-1 max-w-xs">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <FaSearch />
      </span>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search by Lottery Number..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;