import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Plus, Trash, Clock, Home, Briefcase, IndianRupee } from 'lucide-react';
import { WishlistContext } from '../../Context/WishlistContext';

const TripForm = ({ onSave, initialData, wishlistItems, isLoading }) => {
  const [newActivity, setNewActivity] = useState({ name: '', date: '', time: '', notes: '' });
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(0);
  const [trip, setTrip] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    destinations: [{
      name: '',
      location: '',
      activities: [],
      notes: ''
    }]
  });

  useEffect(() => {
    if (initialData) {
      const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
          return new Date(dateString).toISOString().split('T')[0];
        } catch (e) {
          return '';
        }
      };

      setTrip({
        ...initialData,
        startDate: formatDate(initialData.startDate),
        endDate: formatDate(initialData.endDate),
        destinations: initialData.destinations.map(dest => ({
          ...dest,
          startDate: formatDate(dest.startDate),
          endDate: formatDate(dest.endDate),
          activities: dest.activities.map(act => ({
            ...act,
            date: formatDate(act.date),
            time: act.time || ''
          })),
          accommodation: {
            name: dest.accommodation?.name || '',
            address: dest.accommodation?.address || '',
            checkIn: formatDate(dest.accommodation?.checkIn),
            checkOut: formatDate(dest.accommodation?.checkOut),
            bookingReference: dest.accommodation?.bookingReference || ''
          },
          transportation: {
            type: dest.transportation?.type || '',
            departureTime: formatDate(dest.transportation?.departureTime),
            arrivalTime: formatDate(dest.transportation?.arrivalTime),
            bookingReference: dest.transportation?.bookingReference || ''
          },
          notes: dest.notes || ''
        }))
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip(prev => {
      const updates = { [name]: value };
      
      // If start or end date changes, update activity dates
      if (name === 'startDate' && value) {
        updates.destinations = prev.destinations.map(dest => ({
          ...dest,
          activities: dest.activities.map(act => ({
            ...act,
            date: act.date || value // Set date only if it's not already set
          }))
        }));
      }
      
      return { ...prev, ...updates };
    });
    useEffect(() => {
      if (window.toast) {
        window.toast.duration = 2000;
      }
    }, []);
  };

  // Update the default toast duration for all toasts in this component
  useEffect(() => {
    if (window.toast) {
      window.toast.duration = 2000;
    }
  }, []);

  const handleDestinationChange = (index, e) => {
    const { name, value } = e.target;
    setTrip(prev => {
      const destinations = [...prev.destinations];
      destinations[index] = { ...destinations[index], [name]: value };
      return { ...prev, destinations };
    });
  };

  const handleAccommodationChange = (destIndex, e) => {
    const { name, value } = e.target;
    setTrip(prev => {
      const destinations = [...prev.destinations];
      destinations[destIndex].accommodation = {
        ...destinations[destIndex].accommodation,
        [name]: value
      };
      return { ...prev, destinations };
    });
  };

  const handleTransportationChange = (destIndex, e) => {
    const { name, value } = e.target;
    setTrip(prev => {
      const destinations = [...prev.destinations];
      destinations[destIndex].transportation = {
        ...destinations[destIndex].transportation,
        [name]: value
      };
      return { ...prev, destinations };
    });
  };

  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({ ...prev, [name]: value }));
  };

  const addActivity = () => {
    if (!newActivity.name) return;

    // Use functional update to prevent double additions
    setTrip(prevTrip => {
      const updatedDestinations = [...prevTrip.destinations];
      // Check if activity already exists to prevent duplicates
      const existingActivities = updatedDestinations[selectedDestination].activities;
      const isDuplicate = existingActivities.some(
        activity =>
          activity.name === newActivity.name &&
          activity.date === newActivity.date &&
          activity.time === newActivity.time
      );

      if (!isDuplicate) {
        updatedDestinations[selectedDestination] = {
          ...updatedDestinations[selectedDestination],
          activities: [...existingActivities, { ...newActivity }]
        };
      }

      return {
        ...prevTrip,
        destinations: updatedDestinations
      };
    });

    // Reset new activity form
    setNewActivity({ name: '', date: '', time: '', notes: '' });
  };

  const addDestination = () => {
    setTrip(prev => ({
      ...prev,
      destinations: [
        ...prev.destinations,
        {
          name: '',
          location: '',
          activities: [],
          notes: ''
        }
      ]
    }));
  };

  const removeDestination = (index) => {
    if (trip.destinations.length <= 1) return;

    setTrip(prev => ({
      ...prev,
      destinations: prev.destinations.filter((_, i) => i !== index)
    }));

    if (selectedDestination === index) {
      setSelectedDestination(Math.max(0, index - 1));
    } else if (selectedDestination > index) {
      setSelectedDestination(selectedDestination - 1);
    }
  };

  const addFromWishlist = (item) => {
    setTrip(prev => {
      const destinations = [...prev.destinations];
      const destination = destinations[selectedDestination];

      // If it's an attraction, add it as an activity
      if (item.type === 'attraction' || item.type === 'museum' || item.type === 'nature') {
        destination.activities = [
          ...destination.activities,
          {
            name: item.Name || item.name,
            location: item.Location || item.location,
            date: '',
            time: '',
            notes: ''
          }
        ];
      }
      // If it's a city/location, update the destination
      else if (destination.name === '') {
        destination.name = item.Name || item.name;
        destination.location = item.Location || item.location;
      }

      return { ...prev, destinations };
    });

    setShowWishlist(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatDate = (dateString) => {
      if (!dateString) return null;
      try {
        return new Date(dateString).toISOString();
      } catch (e) {
        return null;
      }
    };

    // Format dates for submission
    const formattedTrip = {
      ...trip,
      startDate: formatDate(trip.startDate),
      endDate: formatDate(trip.endDate),
      destinations: trip.destinations.map(dest => ({
        ...dest,
        startDate: formatDate(dest.startDate),
        endDate: formatDate(dest.endDate),
        activities: dest.activities.map(act => ({
          ...act,
          date: formatDate(act.date)
        })),
        accommodation: {
          ...dest.accommodation,
         
        },
        transportation: {
          ...dest.transportation,
        }
      }))
    };

    onSave(formattedTrip);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Required Trip Details</h2>

            {/* Basic Trip Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trip Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={trip.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Summer Vacation 2025"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget*
                </label>
                <input
                  type="number"
                  name="budget"
                  value={trip.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="5000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={trip.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date*
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={trip.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={trip.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Brief description of your trip"
              />
            </div>

            {/* Destinations Section */}
            <div className="mt-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Destinations</h2>
                <button
                  type="button"
                  onClick={addDestination}
                  className="flex items-center px-3 py-1.5 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Destination
                </button>
              </div>

              {/* Destination Tabs */}
              <div className="flex overflow-x-auto space-x-2 mb-4">
                {trip.destinations.map((dest, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedDestination(index)}
                    className={`px-4 py-2 rounded-md whitespace-nowrap flex items-center ${
                      selectedDestination === index
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    {dest.name || `Destination ${index + 1}`}
                    {trip.destinations.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDestination(index);
                        }}
                        className="ml-2 hover:text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    )}
                  </button>
                ))}
              </div>

              {/* Destination Details */}
              {trip.destinations.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destination Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={trip.destinations[selectedDestination].name}
                        onChange={(e) => handleDestinationChange(selectedDestination, e)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={trip.destinations[selectedDestination].location}
                        onChange={(e) => handleDestinationChange(selectedDestination, e)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Add from Wishlist Button */}
                  <div className="mt-4 mb-3">
                    <button
                      type="button"
                      onClick={() => setShowWishlist(true)}
                      className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add from Wishlist
                    </button>
                  </div>

                  {/* Activities Section */}
                  <div>
                    <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                      Activities
                    </h3>

                    {/* Activities List */}
                    {trip.destinations[selectedDestination].activities.length > 0 ? (
                      <div className="mb-4 space-y-2">
                        {trip.destinations[selectedDestination].activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                            <div>
                              <p className="font-medium text-gray-800">{activity.name}</p>
                              <div className="flex text-sm text-gray-500 mt-1">
                                {activity.date && (
                                  <span className="flex items-center mr-3">
                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                    {new Date(activity.date).toLocaleDateString()}
                                  </span>
                                )}
                                {activity.time && (
                                  <span className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                    {activity.time}
                                  </span>
                                )}
                              </div>
                              {activity.notes && (
                                <p className="text-sm text-gray-600 mt-1">{activity.notes}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeActivity(selectedDestination, idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic mb-4">No activities added yet.</p>
                    )}

                    {/* Add Activity Form */}
                    <div className="bg-gray-100 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Activity</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Activity Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={newActivity.name}
                            onChange={handleActivityChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder=""
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={newActivity.date}
                            onChange={handleActivityChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                          </label>
                          <input
                            type="time"
                            name="time"
                            value={newActivity.time}
                            onChange={handleActivityChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes
                          </label>
                          <input
                            type="text"
                            name="notes"
                            value={newActivity.notes}
                            onChange={handleActivityChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Bring camera, go at sunset"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={addActivity}
                        className="w-full flex justify-center items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Activity
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destination Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={trip.destinations[selectedDestination].notes}
                      onChange={(e) => handleDestinationChange(selectedDestination, e)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Any additional notes about this destination"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md"
              >
                {isLoading ? 'Saving...' : 'Save Trip'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Wishlist Drawer */}
      {showWishlist && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowWishlist(false)}></div>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Your Wishlist</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setShowWishlist(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {wishlistItems && wishlistItems.length > 0 ? (
                          <ul className="divide-y divide-gray-200">
                            {wishlistItems.map((item, index) => (
                              <li key={item.id || index} className="py-6 flex">
                                <div className="flex-1 ml-4 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.Name || item.name || 'Unnamed Item'}</h3>
                                    </div>
                                    <p className="mt-1 text-sm text-blue-600 hover:underline">
                                      <a
                                        href={item.Location || item.location}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                          // Prevent default if the URL is invalid
                                          const url = item.Location || item.location;
                                          if (!url || !url.startsWith('http')) {
                                            e.preventDefault();
                                            console.warn('Invalid URL:', url);
                                          }
                                        }}
                                      >
                                        {item.Location || item.location || 'No location'}
                                      </a>
                                    </p>
                                    {item.type && (
                                      <p className="mt-1 text-sm text-gray-500 capitalize">{item.type}</p>
                                    )}
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <button
                                      type="button"
                                      onClick={() => addFromWishlist(item)}
                                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                                    >
                                      Add to Trip
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-gray-500">Your wishlist is empty or loading...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripForm;
