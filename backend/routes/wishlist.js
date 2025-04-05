import Router from 'express';
import Wishlist from '../models/Wishlist.js';
const router = Router();

router.get('/user-wishlist', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({
            success: false,
            error: "Email parameter is required"
        });
    }

    try {
        const wishlistItems = await Wishlist.find({ Email: email })
            .select('Name Location -_id'); // Only select Name and Location, exclude _id
        
            console.log(wishlistItems);
        return res.status(200).json({
            success: true,
            wishlistItems
        });
    } catch (error) {
        console.error("Error fetching user wishlist:", error);
        return res.status(500).json({
            success: false,
            error: "Error fetching wishlist items"
        });
    }
});

router.get('', async (req, res) => {

    try {
        const data = await Wishlist.find({});
        if (!data) {
            return res.status(200).json("no data found");
        }

        return res.status(200).json(data);
    } catch (e) {
        console.error("Error fetching wishlist:", e);
        return res.status(501).json({ msg: "Error fetching wishlist" });
    }
});

router.post('', async (req, res) => {
    const { Name, Location, Rating, Image, userEmail } = req.body;

    try {
        const existingItem = await Wishlist.findOne({ Name: Name, Email: userEmail });

        if (existingItem) {
            // If the cafe already exists in the wishlist, remove it (toggle functionality)
            await Wishlist.deleteOne({ Name: Name, Email: userEmail });
            res.status(200).json({ msg: 'Removed from wishlist' });
        } else {
            // Otherwise, add it to the wishlist
            const newItem = await Wishlist.create({
                Name: Name,
                Location: Location,
                Rating: Rating,
                Image: Image,
                Email: userEmail,
            })
            console.log("Added wishlist to database ");
            res.status(200).json({ msg: 'Added to wishlist' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating wishlist' });
    }
});

router.delete('', async (req, res) => {
    const { userEmail,itemName } = req.body;
    console.log("Deleting item with:", { userEmail, itemName });

    try {
        const deletedItem = await Wishlist.deleteOne({
            Name:itemName,
            Email: userEmail    
        });

        if (!deletedItem) {
            console.log("no item found");
        }
        if(deletedItem) console.log(deletedItem);
        return res.status(200).json({ msg: "Item deleted successfully" });
    } catch (e) {
        console.error("Error deleting item:", e);
        return res.status(500).json({ msg: "Failed to delete item" });
    }
});

export default router;
