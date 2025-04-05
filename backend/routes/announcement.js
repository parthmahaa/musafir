import express from 'express';
import Announcement from '../models/Announcement.js';
import fetchUser from '../middlewares/fetchUser.js';

const router = express.Router();

// Create new announcement (Admin only)
router.post('/create', fetchUser, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: "Only admins can create announcements"
      });
    }

    const { title, content, priority, date } = req.body;
    const announcement = new Announcement({
      title,
      content,
      priority,
      date: date || Date.now(),
      createdBy: req.user.email
    });

    await announcement.save();
    res.status(201).json({ success: true, announcement });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all active announcements
router.get('/all', async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
      .sort({ date: -1 });
    res.json({ success: true, announcements });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update announcement (Admin only)
router.put('/update/:id', fetchUser, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: "Only admins can update announcements"
      });
    }

    const { title, content, priority, isActive } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, priority, isActive },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        error: "Announcement not found"
      });
    }

    res.json({ success: true, announcement });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete announcement (Admin only)
router.delete('/delete/:id', fetchUser, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: "Only admins can delete announcements"
      });
    }

    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        error: "Announcement not found"
      });
    }

    res.json({ success: true, message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;