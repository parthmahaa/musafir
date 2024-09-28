import { mongoose ,Schema } from 'mongoose';

const wishlistSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "place_name"
    },
    tags:{
        type: Schema.Types.ObjectId,
        ref: "tag",
    },
    rating: {
        type: Schema.Types.ObjectId,
        ref: "rating"
    },
    location:{
        type: Schema.Types.ObjectId,
        ref :"location"
    }
},{timestamps: true})


export const Wishlist = mongoose.model("Wishlist" , wishlistSchema)