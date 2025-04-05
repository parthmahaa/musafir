import Router from 'express';
import Attractions from '../models/Attractions.js';
const router = Router();

router.get('', async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Search term is required' });
    }

    const searchPattern = new RegExp(name, 'i');
    
    try {
        const attractions = await Attractions.find({ name: {$regex: searchPattern} });   
        res.status(200).json({
            success: true, 
            count: attractions.length, 
            data: attractions
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message 
        });
    }
});

export default router;
