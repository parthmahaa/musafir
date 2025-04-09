import React, { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../../Context/WishlistContext';
import { toast } from 'react-toastify';
import api from '../../services/api';

function wishlist() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { setWishlistItems, wishlistItems } = useContext(WishlistContext);
  const Email = localStorage.getItem('email');
  const getWishlist = async () => {
    try {
      const response = await api.get('/user-wishlist' ,{
        params : {email :Email}
      })
      if (response.data.success) {
        setWishlistItems(response.data.wishlistItems)
      } else console.log('Error converting data to json');
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (itemName) => {
    try {
      const response = api.delete('/wishlist',{
        data:{
          userEmail: Email,
          itemName : itemName
        }
      })
      if (response.status===200) {
        console.log(`Item "${itemName}" deleted successfully`);
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.Name !== itemName)
        );
        toast.success('Removed from wishlist');
      } else {
        console.log('Error deleting item');
      }
    } catch (e) {
      console.error('Error occurred while deleting the item:', e);
    }
  };

  useEffect(() => {
    // Check if token exists, if not redirect to home page
    if (!token) {
      navigate('/');
      return;
    }
    getWishlist();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-left text-orange-800 mb-6">
          My Wishlist
        </h1>
        <div className="space-y-3">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex flex-row items-center">
                  <div className="flex-grow p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-orange-900 truncate">
                          {item.Name}
                        </h2>
                        {item.Rating ? (
                          <div className="flex items-center mt-1">
                            <FaStar className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm text-orange-800">
                              {item.Rating}
                            </span>
                          </div>
                        ) : (
                          <div className="mt-1">&nbsp;</div> // Empty space for alignment
                        )}
                        <a
                          href={item.Location}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-0 text-blue-500 text-sm"
                        >
                          Location
                        </a>
                      </div>
                      <button
                        onClick={() => handleDelete(item.Name)}
                        className="ml-2"
                      >
                        <MdDelete className="text-red-600 w-5 h-5 hover:text-red-300" />
                      </button>
                    </div>
                  </div>
                  <div className="w-px bg-orange-200 self-stretch"></div>
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.Image}
                      alt={item.Name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3 className="text-center text-gray-900">
              No items in the wishlist
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default wishlist;
