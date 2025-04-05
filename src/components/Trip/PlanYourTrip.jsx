import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from './TripForm';
import TripList from './TripList';
import SuggestTrips from './SuggestTrips';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { MapPin, Calendar, List, CheckCircle, AlertCircle } from 'lucide-react';
import { WishlistContext } from '../../Context/WishlistContext';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../services/api';

const PlanYourTrip = () => {
  const [editingTrip, setEditingTrip] = useState(null);
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('create'); // 'create', 'list', or 'suggest'
  const [showToast, setShowToast] = useState({ visible: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      console.log("Please login first");
      return;
    }
    fetchTrips();
    fetchWishlistItems();
  }, [user?.email]);

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const userEmail = encodeURIComponent(user.email);
      const { data } = await api.get(`/trip/user-trips?email=${userEmail}`);

      if (data.success) {
        setTrips(data.trips || []);
      } else {
        throw new Error(data.error || 'Failed to load trips');
      }
    } catch (err) {
      console.error('Fetch trips error:', err);
      setError(err.message || 'Failed to load trips');
      toast.error(err.message || 'Failed to load trips');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const userEmail = encodeURIComponent(user.email);
      const { data } = await api.get(`/wishlist/user-wishlist?email=${userEmail}`);

      if (data.success) {
        setWishlistItems(data.wishlistItems || []);
      } else {
        throw new Error(data.error || 'Failed to fetch wishlist items');
      }
    } catch (error) {
      console.error('Fetch wishlist error:', error);
      toast.error(error.message || 'Failed to fetch wishlist items');
    }
  };

  const saveTrip = async (tripData) => {
    try {
      setIsLoading(true);
      const userEmail = localStorage.getItem('email');
      const formattedTripData = {
        ...tripData,
        startDate: tripData.startDate || new Date().toISOString(),
        endDate: tripData.endDate || new Date().toISOString(),
        destinations: tripData.destinations.map(dest => ({
          ...dest,
          startDate: dest.startDate || null,
          endDate: dest.endDate || null,
          activities: dest.activities.map(act => ({
            ...act,
            date: act.date || null,
            time: act.time || ''
          })),
          accommodation: {
            ...dest.accommodation,
            checkIn: dest.accommodation?.checkIn || null,
            checkOut: dest.accommodation?.checkOut || null
          },
          transportation: {
            ...dest.transportation,
            departureTime: dest.transportation?.departureTime || null,
            arrivalTime: dest.transportation?.arrivalTime || null
          }
        }))
      };

      let response;
      if (editingTrip) {
        response = await api.put(`/trip/edit/${editingTrip._id}`, {
          ...formattedTripData,
          userEmail,
          isPublic: false
        });
      } else {
        response = await api.post('/trip/create', {
          ...formattedTripData,
          userEmail,
          isPublic: false
        });
      }

      const { data } = response;

      if (data.success) {
        if (editingTrip) {
          setTrips(prevTrips =>
            prevTrips.map(trip =>
              trip._id === editingTrip._id ? data.trip : trip
            )
          );
          toast.success('Trip updated successfully!');
        } else {
          setTrips(prevTrips => [...prevTrips, data.trip]);
          toast.success('Trip created successfully!');
        }
        setActiveTab('list');
        setEditingTrip(null);
      } else {
        throw new Error(data.error || 'Failed to save trip');
      }
    } catch (err) {
      console.error('Error saving trip:', err);
      toast.error(err.response?.data?.error || 'Failed to save trip');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setActiveTab('create');
  };

  const deleteTrip = async (tripId) => {
    try {
      setIsLoading(true);
      const { data } = await api.delete(`/trip/delete/${tripId}`);

      if (data.success) {
        setTrips(prevTrips => prevTrips.filter(trip => trip._id !== tripId));
        toast.success('Trip deleted successfully');
      } else {
        throw new Error(data.error || 'Failed to delete trip');
      }
    } catch (err) {
      console.error('Error deleting trip:', err);
      toast.error(err.response?.data?.error || 'Failed to delete trip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">Plan Your Trip</h1>
            <p className="text-gray-600">Create your perfect itinerary or choose from your wishlist</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'create'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-orange-500'}`}
              onClick={() => setActiveTab('create')}
            >
              Create New Trip
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'list'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-orange-500'}`}
              onClick={() => setActiveTab('list')}
            >
              My Trips
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'suggest'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-orange-500'}`}
              onClick={() => setActiveTab('suggest')}
            >
              Suggest Trips
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'create' && (
            <TripForm
              onSave={saveTrip}
              initialData={editingTrip}
              wishlistItems={wishlistItems}
              isLoading={isLoading}
            />
          )}
          {activeTab === 'list' && (
            <TripList
              trips={trips}
              onDelete={deleteTrip}
              onEdit={handleEdit}
              isLoading={isLoading}
            />
          )}
          {activeTab === 'suggest' && <SuggestTrips />}
          {/* Toast notification */}
          {showToast.visible && (
            <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-lg animate-fade-in
            ${showToast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              <div className="flex items-center">
                {showToast.type === 'success' ?
                  <CheckCircle className="h-5 w-5 mr-2" /> :
                  <AlertCircle className="h-5 w-5 mr-2" />
                }
                <p>{showToast.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlanYourTrip;
