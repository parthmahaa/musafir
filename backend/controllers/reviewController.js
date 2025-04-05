import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { placeName, location, rating, reviewText, imageUrl } = req.body;
    const userId = req.user.id; // From auth middleware
    const userName = req.user.name; // From auth middleware

    const review = new Review({
      placeName,
      location,
      rating,
      reviewText,
      imageUrl,
      userId,
      userName
    });

    await review.save();
    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};