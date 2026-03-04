import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/destinations?search=${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-white/20 backdrop-blur-md 
                 border border-white/30 rounded-full px-3 py-1 
                 shadow-lg transition-all duration-300"
    >
      <Search size={18} className="text-white/80 mr-2" />

      <input
        type="text"
        placeholder="Cari destinasi..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          bg-transparent
          outline-none
          text-gray-800
          placeholder-gray-500
          dark:text-white
          dark:placeholder-white/70
          w-40 md:w-56
        "
      />

      <button
        type="submit"
        className="ml-3 bg-purple-600/80 hover:bg-purple-700 
                   text-white px-4 py-1 rounded-full 
                   transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;