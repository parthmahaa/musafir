import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    images:{
        type:String
    },
    tags:{
        type:String
    }
} ,{ timestamps: true });

const Attractions = mongoose.model("Attractions", attractionSchema);

export default Attractions;