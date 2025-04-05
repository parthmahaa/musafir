import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { WishlistContext } from '../../Context/WishlistContext';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import SearchBar from '../Search/SearchBar';
import SearchResult from '../Search/SearchResult';
import api from '../../services/api';
import { ArrowLeft } from 'lucide-react';

function Blogs() {
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [explore, setExplore] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const navItems = ['Trending', 'Cafe', 'Street Food', 'Historical Places'];
  
  const getData = async () => {
    try {
      const response = await api.get('/explore');
      const placesWithLikedStatus = response.data.msg.map((place) => ({
        ...place,
        liked: wishlistItems.some((item) => item.Name === place.name),
      }));
      setExplore(placesWithLikedStatus);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    getData();
  }, [wishlistItems]);

  const handleWishlistUpdate = async (e, isLiking) => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return false;
    }

    try {
      const response = await api.post('/wishlist', {
        Name: e.name,
        Location: e.location,
        Rating: e.rating,
        Image: e.img,
        userEmail: user.email,
      });

      if (response.status === 200) {
        if (isLiking) {
          setWishlistItems((prev) => [...prev, {
            Name: e.name,
            Location: e.location,
            Rating: e.rating,
            Image: e.img,
            userEmail: user.email,
          }]);
        } else {
          setWishlistItems((prev) =>
            prev.filter((item) => item.Name !== e.name)
          );
        }
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error updating wishlist:', error);
      return false;
    }
  };

  const handleLikeToggle = async (index) => {
    if (!isAuthenticated) {
      setTimeout(() => toast.error("Please login"), 100);
      return;
    }

    const e = explore[index];
    const isLiking = !e.liked;

    try {
      const success = await handleWishlistUpdate(e, isLiking);
      if (success) {
        setExplore((prev) =>
          prev.map((place, i) =>
            i === index ? { ...place, liked: isLiking } : place
          )
        );
        setTimeout(() => 
          toast.success(isLiking ? 'Added to wishlist!' : 'Removed from wishlist'), 
        100);
      } else {
        setTimeout(() => toast.error('Failed to update wishlist'), 100);
      }
    } catch (error) {
      setTimeout(() => toast.error('Failed to update wishlist'), 100);
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
                Trending
              </h1>
              <p className="max-w-4xl text-base sm:text-lg font-semibold text-gray-600">
                Looking to explore and get ideas about a new place? Use our platform
                to search for key insights on top attractions and hidden gems.
                Whether you're interested in historical landmarks, outdoor
                adventures, or dining hotspots, our detailed info and user reviews
                will help you discover the best experiences. Plan your trips, and
                make your visit unforgettable.
              </p>
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="mt-8 border-b border-gray-300 overflow-x-auto">
              <nav className="flex whitespace-nowrap">
                {navItems.map((item) => {
                  const itemPath = `/${item.toLowerCase().replace(' ', '_')}`;
                  const isActive =
                    item === 'Trending'
                      ? location.pathname === '/explore'
                      : location.pathname === itemPath;
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
            {explore.length > 0 ? (
              explore.map((place, index) => (
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
                      <p className="text-black text-lg font-medium">
                        {place.tag}
                      </p>
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

export default Blogs;
