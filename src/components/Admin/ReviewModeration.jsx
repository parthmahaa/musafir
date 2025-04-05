import React, { useState, useEffect } from 'react';
import { X, Search} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get('/review/all');
      
      if (data.success) {
        setReviews(data.reviews);
      } else {
        toast.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error.response?.data?.error || error.message);
      toast.error("Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      const { data } = await api.delete(`/review/delete/${id}`);

      if (data.success) {
        setReviews(reviews.filter(review => review._id !== id));
        toast.success('Review deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error("Error deleting review:", error.response?.data?.error || error.message);
      toast.error("Failed to delete review");
    }
  };

  const filteredReviews = reviews.filter(review => {
    return (
      searchTerm === '' || 
      review.placeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading reviews...</div>;
  }

  return (
    <div className="p-6 w-full animate-fade-in">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold mb-1">Review Moderation</h1>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search reviews..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredReviews.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {filteredReviews.map((review) => (
                <li 
                  key={review._id} 
                  className="p-5 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{review.placeName}</h3>
                        <span className="text-xs text-gray-400">
                          by {review.userName}
                        </span>
                        <div className="flex">
                          {Array(5).fill(0).map((_, index) => (
                            <span key={index} className={`text-lg ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-1">{review.reviewText}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReject(review._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No reviews found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModeration;