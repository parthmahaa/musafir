import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { WishlistContext } from '../../../Context/WishlistContext';

function Cafe() {
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const email = localStorage.getItem('email');
  const [cafes, setCafes] = useState('');
  const [searchText, setSearchText] =useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navItems = ['Trending', 'Cafe', 'Street Food', 'Historical Places'];
  
  const getData = async () => {
    try {
      const response = await fetch('https://musafir-4lbu.onrender.com/cafe', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        const cafesWithLikedStatus = data.msg.map((cafe) => ({
          ...cafe,
          liked: wishlistItems.some((item) => item.Name === cafe.name),
        }));
        setCafes(cafesWithLikedStatus);
      } else {
        console.log('object');
      }
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleWishlistUpdate = async (cafe, isLiking) => {
    if (!email) {
      alert('Please login to add items to wishlist');
      return;
    }

    try {
      const response = await fetch('https://musafir-4lbu.onrender.com/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
            Name: cafe.name,
            Location: cafe.location,
            Rating: cafe.rating,
            Image: cafe.img,
            userEmail: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(
          isLiking ? 'Added to wishlist' : 'Removed from wishlist',
          data
        );

        // Update wishlist context
        if (isLiking) {
          setWishlistItems((prev) => [...prev, cafe]);
        } else {
          setWishlistItems((prev) =>
            prev.filter((item) => item._id !== cafe._id)
          );
        }
      } else {
        console.log('Failed to update wishlist');
      }
    } catch (error) {
      console.log('Error updating wishlist:', error);
    }
  };

  const handleLikeToggle = async (index) => {
    const cafe = cafes[index];
    const isLiking = !cafe.liked;

    // Optimistically update UI
    setCafes((prev) =>
      prev.map((place, i) =>
        i === index ? { ...place, liked: isLiking } : place
      )
    );

    // Make API call
    await handleWishlistUpdate(cafe, isLiking);
  };
  const searchWeb = async (text)=>{
    toast.info("This feature is still under development")
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            onClick={() => searchWeb(searchText)}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-8 border-b border-gray-300 overflow-x-auto">
        <nav className="flex whitespace-nowrap">
          {navItems.map((item) => {
            const itemPath = `/${item.toLowerCase().replace(' ', '_')}`;
            const isActive = location.pathname === itemPath;
            return (
              <Link
                key={item}
                to={item=='Trending' ? '/explore' :itemPath}
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

      <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {cafes.length > 0 ? (
          cafes.map((cafe, index) => (
            <div
              key={index}
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
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Cafe;
