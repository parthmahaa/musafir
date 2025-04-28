import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { uploadToCloudinary } from '../../services/cloudinary';
import api from '../../services/api';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation } from 'react-router-dom';

const defaultCoords = { lat: 21.1824, lng: 72.8283 }; // Center of India

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          setPosition(e.target.getLatLng());
        },
      }}
      icon={L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })}
    />
  ) : null;
}

const Reviews = () => {
  const postRef = useRef(null);
  const reviewsRef = useRef(null);
  const [activeTab, setActiveTab] = useState('reviews');
  const locationRoute = useLocation();

  const handleScrollToPost = () => {
    setActiveTab('post');
    if (postRef.current) postRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToReviews = () => {
    setActiveTab('reviews');
    if (reviewsRef.current)
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newReview, setNewReview] = useState({
    placeName: '',
    landmark: '',
    location: '',
    rating: 5,
    reviewText: '',
    imageUrl: '',
  });
  const [locationCoords, setLocationCoords] = useState(defaultCoords);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      setLocationLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${locationCoords.lat}&lon=${locationCoords.lng}&format=json`
        );
        const data = await res.json();
        setNewReview((prev) => ({
          ...prev,
          location: data.display_name || '',
        }));
      } catch {
        setNewReview((prev) => ({
          ...prev,
          location: '',
        }));
      } finally {
        setLocationLoading(false);
      }
    };
    if (locationCoords) fetchAddress();
  }, [locationCoords]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get('/review/all');
      if (response.data.success) {
        setReviews(response.data.reviews);
      } else {
        toast.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      toast.error('Failed to fetch reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setNewReview((prevReview) => ({
      ...prevReview,
      rating: newRating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUploading(true);

    if (
      !newReview.placeName ||
      !newReview.reviewText ||
      !newReview.rating ||
      !locationCoords
    ) {
      setError(
        'Please fill in all required fields and select a location on the map.'
      );
      setUploading(false);
      return;
    }

    try {
      let imageUrl = '';
      if (selectedFile) {
        try {
          imageUrl = await uploadToCloudinary(selectedFile);
        } catch (error) {
          toast.error('Failed to upload image');
          setUploading(false);
          return;
        }
      }

      const response = await api.post('/review/create', {
        ...newReview,
        imageUrl,
        userId: user.id,
        userName: user.name,
        locationCoords,
      });

      if (response.data.success) {
        fetchReviews();
        setNewReview({
          placeName: '',
          landmark: '',
          location: '',
          rating: 5,
          reviewText: '',
          imageUrl: '',
        });
        setSelectedFile(null);
        setLocationCoords(defaultCoords);
        setSuccess('Your review has been submitted successfully!');
        setTimeout(() => {
          toast.success('Review Submitted!');
        }, 1000);

      } else {
        setError(response.data.error || 'Failed to submit your review');
      }
    } catch (error) {
      setError('Failed to submit your review. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 fill-orange-500 text-orange-500"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      } else if (i - 0.5 === roundedRating) {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 fill-orange-500 text-orange-500 opacity-50"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-orange-500 opacity-25"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-8">
            Travel Reviews
          </h1>

          <div className="flex gap-8 mb-8 border-b border-gray-200">
            <button
              onClick={handleScrollToReviews}
              className={`pb-2 px-2 transition-all font-semibold rounded-md ${
                activeTab === 'reviews'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-600 hover:text-orange-500 hover:border-b-2 hover:border-gray-400'
              }`}
              style={{ background: 'none', border: 'none', outline: 'none' }}
            >
              Reviews
            </button>

            <button
              onClick={handleScrollToPost}
              className={`pb-2 px-2 transition-all font-semibold rounded-md ${
                activeTab === 'post'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-600 hover:text-orange-500 hover:border-b-2 hover:border-gray-400'
              }`}
              style={{ background: 'none', border: 'none', outline: 'none' }}
            >
              Post Review
            </button>
          </div>

          {activeTab === 'post' ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <section
                ref={postRef}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12 flex-1 transition-all duration-200"
                style={{ minHeight: 500 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Share Your Experience
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="placeName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Place Name*
                      </label>
                      <input
                        type="text"
                        id="placeName"
                        name="placeName"
                        value={newReview.placeName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <label
                        htmlFor="landmark"
                        className="block text-sm font-medium text-gray-700 mb-1 mt-4"
                      >
                        Landmark
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={newReview.landmark}
                        onChange={(event) =>
                          setNewReview((prev) => ({
                            ...prev,
                            landmark: event.target.value,
                          }))
                        }
                        required
                        placeholder="e.g. Near VR Mall"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Location on Map*
                      </label>
                      <div className="h-48 rounded-md overflow-hidden border border-gray-300">
                        <MapContainer
                          center={locationCoords}
                          zoom={5}
                          style={{ height: '100%', width: '100%' }}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                          />
                          <LocationPicker
                            position={locationCoords}
                            setPosition={setLocationCoords}
                          />
                        </MapContainer>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {locationLoading
                          ? 'Fetching address...'
                          : newReview.location
                          ? `Selected: ${newReview.location}`
                          : 'Click on the map to select a location.'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    {selectedFile && (
                      <p className="mt-1 text-sm text-gray-500">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <div className="flex gap-1 text-3xl">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <span
                          key={starValue}
                          onClick={() => handleRatingChange(starValue)}
                          className={`cursor-pointer ${
                            starValue <= newReview.rating
                              ? 'text-amber-400'
                              : 'text-gray-400'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reviewText"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Review*
                    </label>
                    <textarea
                      id="reviewText"
                      name="reviewText"
                      value={newReview.reviewText}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={uploading}
                      className={`bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition-colors ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {uploading ? 'Uploading...' : 'Submit Review'}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          ) : (
            <section
              ref={reviewsRef}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex-1 transition-all duration-200"
              style={{ minHeight: 500 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                All Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.length === 0 && !isLoading ? (
                  <div className="col-span-full text-center text-gray-500 text-lg py-16">
                    No reviews available.
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative h-48">
                        <img
                          src={
                            review.imageUrl ||
                            'https://via.placeholder.com/400x300'
                          }
                          alt={review.placeName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-lg font-semibold">
                            {review.placeName}
                          </h3>
                          {review.landmark && (
                            <p className="text-xs font-semibold opacity-90">
                              {review.landmark}
                            </p>
                          )}
                          <p className="text-xs opacity-90">{review.location}</p>
                        </div>
                      </div>
                      <div className="p-5">
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
                        <p className="text-gray-700 mb-2">
                          {review.reviewText}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(review.createdAt).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit',
                            }
                          )}
                        </p>
                        {review.locationCoords &&
                          review.locationCoords.lat &&
                          review.locationCoords.lng && (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${review.locationCoords.lat},${review.locationCoords.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-2 text-xs text-blue-600 hover:underline"
                            >
                              Directions
                              <svg
                                className="ml-1 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14 3h7m0 0v7m0-7L10 14"
                                ></path>
                              </svg>
                            </a>
                          )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
