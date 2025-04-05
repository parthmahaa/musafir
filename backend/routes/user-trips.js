import express from 'express';
import Trip from '../models/Trip.js';
import fetchUser from "../middlewares/fetchUser.js";

const router = express.Router();

// Get user's trips
router.get('/user-trips', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const trips = await Trip.find({ userEmail: email })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      trips
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

router.put('/edit/:tripId', fetchUser, async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const { title, description, startDate, endDate, destinations, budget } = req.body;
    const userEmail = req.user.email;

    // Find trip and verify ownership
    let trip = await Trip.findOne({ _id: tripId, userEmail });
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: "Trip not found or unauthorized"
      });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      { ...req.body },
      { new: true }
    );

    await trip.save();

    res.json({
      success: true,
      trip: updatedTrip
    });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({
      success: false,
      error: "Failed to update trip"
    });
  }
});

// Create new trip
router.post('/create', async (req, res) => {
  try {
    const { 
      title, 
      description,
      userEmail, 
      startDate, 
      endDate, 
      destinations,
      budget,
      isPublic 
    } = req.body;

    // Validate required fields
    if (!title || !startDate || !endDate || !budget) {
      return res.status(400).json({
        success: false,
        error: 'Required fields are missing'
      });
    }

    const trip = new Trip({
      title,
      description,
      userEmail,
      startDate,
      endDate,
      destinations: destinations.map(dest => ({
        name: dest.name,
        location: dest.location || '',
        activities: dest.activities || [],
        notes: dest.notes || ''
      })),
      budget,
      isPublic: isPublic || false
    });

    await trip.save();

    res.status(201).json({
      success: true,
      trip
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
      const trip = await Trip.findByIdAndDelete(req.params.id);
      
      if (!trip) {
        return res.status(404).json({
          success: false,
          error: "Trip not found"
        });
      }
  
      res.json({
        success: true,
        message: "Trip deleted successfully"
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