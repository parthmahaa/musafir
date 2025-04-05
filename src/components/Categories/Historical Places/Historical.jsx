import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { WishlistContext } from '../../../Context/WishlistContext';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import SearchBar from '../../Search/SearchBar';
import SearchResult from '../../Search/SearchResult';
import api from '../../../services/api';
import { ArrowLeft } from 'lucide-react';

function Historical() {
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [historical, setHistorical] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const navItems = ['Trending', 'Cafe', 'Street Food', 'Historical Places'];

  const getData = async () => {
    try {
      const response = await api.get('/historical');
      const placesWithLikedStatus = response.data.msg.map((place) => ({
        ...place,
        liked: wishlistItems.some((item) => item.Name === place.name),
      }));
      setHistorical(placesWithLikedStatus);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  useEffect(() => {
    getData();
  }, [wishlistItems]);

  const handleWishlistUpdate = async (h, isLiking) => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return false;
    }

    try {
      await api.post('/wishlist', {
        Name: h.name,
        Location: h.location,
        Rating: h.rating,
        Image: h.img,
        userEmail: user.email,
      });

      if (isLiking) {
        setWishlistItems((prev) => [...prev, {
          Name: h.name,
          Location: h.location,
          Rating: h.rating,
          Image: h.img,
          userEmail: user.email,
        }]);
      } else {
        setWishlistItems((prev) =>
          prev.filter((item) => item.Name !== h.name)
        );
      }
      return true;
    } catch (error) {
      console.log('Error updating wishlist:', error);
      return false;
    }
  };

  const handleLikeToggle = async (index) => {
    if (!isAuthenticated) {
      toast.error("Please login");
      return;
    }

    const h = historical[index];
    const isLiking = !h.liked;

    const success = await handleWishlistUpdate(h, isLiking);

    if (success) {
      setHistorical((prev) =>
        prev.map((place, i) =>
          i === index ? { ...place, liked: isLiking } : place
        )
      );
    }
  };

  const handleSearch = (results) => {
    setIsSearching(false);
    setSearchResults(results);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {searchResults && (
          <div className="flex items-center mb-4">
          </div>
        )}

        {!searchResults && (
          <>
            <div className="flex flex-col space-y-6 py-8">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
                Historical Places
              </h1>
              <p className="max-w-4xl text-base sm:text-lg font-semibold text-gray-600">
                Surat is steeped in history, with several sites that offer a glimpse into its rich past, including colonial influences, trade history, and ancient architecture.
              </p>
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="mt-8 border-b border-gray-300 overflow-x-auto">
              <nav className="flex whitespace-nowrap">
                {navItems.map((item) => {
                  const itemPath = `/${item.toLowerCase().replace(' ', '_')}`;
                  const isActive = location.pathname === itemPath;
                  return (
                    <Link
                      key={item}
                      to={item === 'Trending' ? '/explore' : itemPath}
                      className={`px-4 py-2 text-sm sm:text-base font-semibold leading-normal text-gray-700 flex-shrink-0 relative ${
                        isActive
                          ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black'
                          : ''
                      }`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </>
        )}

        {searchResults ? (
          <div className="flex">
            <div className="mr-4">
              <button
                onClick={() => setSearchResults(null)}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2" />
              </button>
            </div>
            <SearchResult
              results={searchResults}
              isLoading={isSearching}
              handleLikeToggle={handleLikeToggle}
            />
          </div>
        ) : (
          <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {historical.length > 0 ? (
              historical.map((place, index) => (
                <div
                  key={index}
                  className="w-full bg-white p-4 rounded-xl border-2 border-gray-300 overflow-hidden text-black"
                >
                  <img
                    src={place.img}
                    className="object-cover w-full h-48 rounded-lg"
                    alt={place.name}
                  />
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-black text-lg font-medium">{place.tag}</p>
                      <button
                        className="text-xl flex items-center justify-center rounded-full p-2 transition-colors duration-300"
                        onClick={() => handleLikeToggle(index)}
                      >
                        {place.liked ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-500" />
                        )}
                      </button>
                    </div>
                    <h2 className="text-black text-xl font-bold">{place.name}</h2>
                    <p className="text-gray-600 text-sm">{place.description}</p>
                    {place.rating ? (
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-semibold text-orange-800">
                          {place.rating}⭐
                        </span>
                      </div>
                    ) : (
                      <div className="mt-0 pt-o">&nbsp;</div> // Empty space for alignment
                    )}
                    <a
                      className="text-blue-600 underline mt-2 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={place.location}
                    >
                      Directions
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Historical;