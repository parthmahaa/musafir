import React, { useContext } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { WishlistContext } from '../../Context/WishlistContext';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../services/api';

function SearchResult({ results, isLoading, handleLikeToggle: parentHandleLikeToggle }) {
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { isAuthenticated, user } = useContext(AuthContext);

  const handleWishlistUpdate = async (place, isLiking) => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return false;
    }

    try {
      const response = await api.post('/wishlist', {
        Name: place.name,
        Location: place.location,
        Rating: place.rating,
        Image: place.images,
        userEmail: user.email,
      });

      if (response.status === 200) {
        if (isLiking) {
          setWishlistItems((prev) => [...prev, {
            Name: place.name,
            Location: place.location,
            Rating: place.rating,
            Image: place.images,
            userEmail: user.email,
          }]);
        } else {
          setWishlistItems((prev) =>
            prev.filter((item) => item.Name !== place.name)
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

  const handleLocalLikeToggle = async (index) => {
    if (!isAuthenticated) {
      toast.error("Please login");
      return;
    }

    const place = results[index];
    const isCurrentlyInWishlist = wishlistItems.some(item => item.Name === place.name);
    const isLiking = !isCurrentlyInWishlist;

    try {
      const success = await handleWishlistUpdate(place, isLiking);
      if (success) {
        // Update parent component's state if needed
        if (parentHandleLikeToggle) {
          parentHandleLikeToggle(index);
        }
      } else {
        toast.error('Failed to update wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  if (isLoading) {
    return (
      <div className="col-span-full flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-gray-600 text-lg">No results found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((place, index) => (
        <div
          key={index}
          className="w-full bg-white p-4 rounded-xl border-2 border-gray-300 overflow-hidden text-black"
        >
          <img
            src={place.images}
            className="object-cover w-full h-48 rounded-lg"
            alt={place.name}
          />
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between items-center">
              <p className="text-black text-base font-small">#{place.tags}</p>
              <button
                className="text-xl flex items-center justify-center rounded-full p-2 transition-colors duration-300"
                onClick={() => handleLocalLikeToggle(index)}
              >
                {wishlistItems.some(item => item.Name === place.name) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-500" />
                )}
              </button>
            </div>
            <h2 className="text-black text-xl font-bold">{place.name}</h2>
            <p className="text-gray-600 text-sm">{place.description}</p>
            {place.rating && (
              <div className="flex items-center mt-1">
                <span className="text-sm font-semibold text-orange-800">
                  {place.rating}⭐
                </span>
              </div>
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
      ))}
    </div>
  );
}

export default SearchResult;
