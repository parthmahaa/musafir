import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    if (!searchText.trim()) {
      toast.warning('Please enter a search term');
      return;
    }

    try {
      const response = await api.get('/attractions', {
        params: { name: searchText }
      });
      onSearch(response.data.data);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('An error occurred while searching');
    }
  };

  return (
    <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search Places"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
