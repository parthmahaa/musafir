import express from 'express';
import Review from '../models/Review.js';
import User from '../models/User.js';

const router = express.Router();

// Get all reviews
router.get('/all', async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Create a new review
router.post('/create', async (req, res) => {
  try {
    const { placeName, landmark ,locationCoords, rating, reviewText, imageUrl, userId, userName } = req.body;

    // Validate required fields,
    if (!placeName || !landmark || !locationCoords || !locationCoords.lat || !locationCoords.lng || !rating || !reviewText || !userId) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields"
      });
    }

    // Find user to get their name
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const review = new Review({
      placeName,
      landmark,
      locationCoords,
      rating,
      reviewText,
      imageUrl: imageUrl || "",
      userId: user._id,
      userName: user.full_name || user.userName
    });

    await review.save();

    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: "Review not found"
      });
    }

    res.json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

export default router;