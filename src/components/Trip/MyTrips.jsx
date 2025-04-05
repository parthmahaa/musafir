import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { ArrowLeft, IndianRupee } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

const MyTrips = () => {
  const [suggestedTrips, setSuggestedTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchSuggestedTrips();
  }, []);

  const fetchSuggestedTrips = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/suggest-trips');
      if (data.success) {
        setSuggestedTrips(data.trips);
      } else {
        throw new Error(data.error || 'Failed to fetch suggested trips');
      }
    } catch (error) {
      console.error('Error fetching suggested trips:', error);
      toast.error(error.message || 'Failed to fetch suggested trips');
    } finally {
      setIsLoading(false);
    }
  };

  const addTripToUserTrips = async (trip) => {
    try {
      const userEmail = user.email;
      const { data } = await api.post('/trip/create', {
        ...trip,
        userEmail,
        isPublic: false,
      });

      if (data.success) {
        toast.success('Added to your trips successfully!');
      } else {
        throw new Error(data.error || 'Failed to add trip');
      }
    } catch (error) {
      console.error('Error adding trip:', error);
      toast.error(error.message || 'Failed to add trip');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5 mt-0 text-orange-600">Suggested Trips</h1>
      {suggestedTrips.length === 0 ? (
        <p className="text-gray-600 text-center">No suggested trips available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedTrips.map((trip) => (
            <div key={trip._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{trip.title}</h2>
                <p className="text-gray-600 mt-2">{trip.description}</p>
                <p className="text-gray-600 mt-2 font-medium">Budget: ₹{trip.budget}</p>
                <button
                  onClick={() => addTripToUserTrips(trip)}
                  className="mt-4 w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Add to My Trips
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
