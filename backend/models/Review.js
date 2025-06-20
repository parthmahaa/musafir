import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
    trim: true
  },
  landmark: {
    type: String,
    required: true,
    trim: true
  },
  locationCoords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;