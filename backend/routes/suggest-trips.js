import express from 'express';
import SuggestTrip from '../models/SuggestTrip.js';

const router = express.Router();

// Fetch suggested trips
router.get('', async (req, res) => {
  try {
    const trips = await SuggestTrip.find().sort({ createdAt: -1 }); // Temporarily remove the filter
    // console.log('Fetched trips:', trips); // Log the fetched trips
    res.json({ success: true, trips });
  } catch (error) {
    console.error('Error fetching suggested trips:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch suggested trips' });
  }
});

export default router;
