import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import MyTrips from './MyTrips';
import { Link } from 'react-router-dom'; // Added import

const SuggestTrips = () => {
  const [suggestedTrips, setSuggestedTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {suggestedTrips.length === 0 ? (
        <p>No suggested trips available.</p>
      ) : (
        <ul>
          <MyTrips trips={suggestedTrips} />
        </ul>
      )}
    </div>
  );
};

export default SuggestTrips;
