import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
    Email:{
        type: String,
        required: true,
    },
    Name:{
        type: String,
        required: true,
    },
    Location:{
        type: String,
        required: true,
    },
    Rating:{
        type: String,
        required: true,
    },
    Image:{
        type: String,
        required: true,
    }
},{timestamps : true});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
export default Wishlist