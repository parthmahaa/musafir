import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { WishlistContext } from '../../../Context/WishlistContext';
import { AuthContext } from "../../../Context/AuthContext";
import SearchBar from '../../Search/SearchBar';
import SearchResult from '../../Search/SearchResult';
import FadeInAnimation from '../../utils/FadeInAnimation';
import api from '../../../services/api';
import { ArrowLeft } from 'lucide-react';

function Cafe() {
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [cafes, setCafes] = useState('');
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const navItems = ['Trending', 'Cafe', 'Street Food', 'Historical Places'];
  
  const getData = async () => {
    try {
      const response = await api.get('/cafe');
      const cafesWithLikedStatus = response.data.msg.map((cafe) => ({
        ...cafe,
        liked: wishlistItems.some((item) => item.Name === cafe.name),
      }));
      setCafes(cafesWithLikedStatus);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  useEffect(() => {
    getData();
  }, [wishlistItems]);

  const handleWishlistUpdate = async (cafe, isLiking) => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return false;
    }

    try {
      await api.post('/wishlist', {
        Name: cafe.name,
        Location: cafe.location,
        Rating: cafe.rating,
        Image: cafe.img,
        userEmail: user.email,
      });

      if (isLiking) {
        setWishlistItems((prev) => [...prev, {
          Name: cafe.name,
          Location: cafe.location,
          Rating: cafe.rating,
          Image: cafe.img,
          userEmail: user.email,
        }]);
      } else {
        setWishlistItems((prev) =>
          prev.filter((item) => item.Name !== cafe.name)
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

    const cafe = cafes[index];
    const isLiking = !cafe.liked;

    const success = await handleWishlistUpdate(cafe, isLiking);

    if (success) {
      setCafes((prev) =>
        prev.map((place, i) =>
          i === index ? { ...place, liked: isLiking } : place
        )
        
      );
      setTimeout(() => 
                toast.success(isLiking ? 'Added to wishlist!' : 'Removed from wishlist'), 
              100);
    }
    else{
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
            <FadeInAnimation>
              <div className="flex flex-col space-y-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
                  Cafe
                </h1>
                <p className="max-w-4xl text-base sm:text-lg font-semibold text-gray-600">
                  Cafés across the city offer diverse experiences, from cozy
                  neighborhood spots with artisanal brews to bustling downtown cafés
                  perfect for people-watching. Each place has its own vibe, whether
                  it's rustic charm or sleek modern design, catering to both quiet
                  work sessions and social gatherings. With unique menus and
                  specialty drinks, every visit feels like a new discovery.
                </p>
                <SearchBar onSearch={handleSearch} />
              </div>
            </FadeInAnimation>

            <FadeInAnimation delay={100}>
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
            </FadeInAnimation>
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
            <FadeInAnimation delay={400}>
              <SearchResult 
                results={searchResults} 
                isLoading={isSearching} 
                handleLikeToggle={handleLikeToggle} 
              />
            </FadeInAnimation>
          </div>
        ) : (
          <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {cafes.length > 0 ? (
              cafes.map((cafe, index) => (
                <FadeInAnimation key={index} delay={400 + index * 100}>
                  <div
                    className="w-full bg-white p-4 rounded-xl border-2 border-gray-300 overflow-hidden text-black"
                  >
                    <img
                      src={cafe.img}
                      className="object-cover w-full h-48 rounded-lg"
                      alt={cafe.name}
                    />
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex justify-between items-center">
                        <p className="text-black text-lg font-medium">{cafe.tag}</p>
                        <button
                          className="text-xl flex items-center justify-center rounded-full p-2 transition-colors duration-300"
                          onClick={() => handleLikeToggle(index)}
                        >
                          {cafe.liked ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart className="text-gray-500" />
                          )}
                        </button>
                      </div>
                      <h2 className="text-black text-xl font-bold">{cafe.name}</h2>
                      <p className="text-gray-600 text-sm">{cafe.description}</p>
                      <p className="text-sm font-semibold">Rating: {cafe.rating}⭐</p>
                      <a
                        className="text-blue-600 underline mt-2 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={cafe.location}
                      >
                        Directions
                      </a>
                    </div>
                  </div>
                </FadeInAnimation>
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

export default Cafe;
