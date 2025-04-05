import React, {useContext} from 'react';
import { Calendar, MapPin, Trash, ArrowRight, Edit } from 'lucide-react';
import {AuthContext} from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; // Added import

const TripList = ({ trips, onEdit,onDelete, isLoading }) => {
  const { user } = useContext(AuthContext);
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate trip duration
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mb-4">
          <Calendar className="h-12 w-12 text-orange-500 mx-auto" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">No trips planned yet</h3>
        <p className="text-gray-600 mb-6">
          Create your first trip by clicking on the "Create New Trip" tab.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">Back to Home</Link> {/* Added navigation link */}
      <div className="space-y-6">
        {trips.map((trip) => (
          <div key={trip._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{trip.title}</h2>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      <span className="ml-2 text-orange-600 font-medium">
                        ({calculateDuration(trip.startDate, trip.endDate)} days)
                      </span>
                    </span>
                  </div>
                  {trip.description && (
                    <p className="mt-3 text-gray-600">{trip.description}</p>
                  )}
                </div>
                
                <div className="flex mt-4 md:mt-0 space-x-2">
                  <button 
                  onClick={()=> onEdit(trip)}
                    className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(trip._id)}
                    className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center"
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
              
              {/* Destinations */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Destinations</h3>
                
                <div className="space-y-4">
                  {trip.destinations.map((destination, idx) => (
                    <div key={`${trip._id}-dest-${idx}`} className="bg-gray-50 p-4 rounded-md">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800 flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                            {destination.name}
                            <span className="ml-2 text-gray-500 text-sm">{destination.location}</span>
                          </h4>
                          
                          {(destination.startDate && destination.endDate) && (
                            <div className="text-sm text-gray-600 mt-1 flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {formatDate(destination.startDate)} 
                              <ArrowRight className="h-3 w-3 mx-1" />
                              {formatDate(destination.endDate)}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-2 md:mt-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {destination.activities.length} Activities
                          </span>
                        </div>
                      </div>
                      
                      {/* Activities Preview */}
                      {destination.activities.length > 0 && (
                        <div className="mt-3 pl-5 border-l-2 border-orange-200">
                          <p className="text-xs text-gray-500 mb-2">Top activities:</p>
                          <ul className="space-y-1">
                            {destination.activities.slice(0, 3).map((activity, actIdx) => (
                              <li key={`${trip._id}-dest-${idx}-act-${actIdx}`} className="text-sm text-gray-700">
                                • {activity.name}
                                {activity.date && (
                                  <span className="text-gray-500 ml-1">
                                    ({formatDate(activity.date)})
                                  </span>
                                )}
                              </li>
                            ))}
                            {destination.activities.length > 3 && (
                              <li key={`${trip._id}-dest-${idx}-more`} className="text-xs text-orange-600">
                                +{destination.activities.length - 3} more activities
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripList;
