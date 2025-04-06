import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import api from '../../services/api';
import axios from "axios";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated ,user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch reviews
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://musafir-4lbu.onrender.com/review/all');
      if (response.data.success) {
        setReviews(response.reviews);
      } else {
        toast.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewMore = () => {
    if (isAuthenticated) {
      navigate('/reviews');
    } else {
      toast.error('Please log in to view all reviews');
    }
  };
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };
  
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-orange-500 text-orange-500" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      } else if (i - 0.5 === roundedRating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-orange-500 text-orange-500 opacity-50" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500 opacity-25" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      }
    }
    return stars;
  };

  if (isLoading) {
    return <div className="py-16 text-center text-gray-500">Loading reviews...</div>;
  }

  if (!reviews.length) {
    return <div className="py-16 text-center text-gray-500">Loading reviews...</div>;
  }
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Latest Reviews</h2>
          <button 
            onClick={handleViewMore}
            className="text-orange-500 hover:text-orange-600 font-medium transition-colors flex items-center"
          >
            View All
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" 
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {reviews.map((review) => (
              <div key={review._id} className="min-w-full px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-64 relative">
                      <img 
                        src={review.imageUrl || "https://via.placeholder.com/400x300"} 
                        alt={review.placeName} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">{review.placeName}</h3>
                        <p className="text-sm opacity-90">{review.location}</p>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-4">
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <div className="flex items-center mt-1">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm font-medium">
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-4">{review.reviewText}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentIndex === index ? "bg-orange-500" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;