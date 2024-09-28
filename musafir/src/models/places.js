// name string 
import { mongoose } from 'mongoose';
//     description string 
//     tag string 
//     location url
//     rating number
//     photos photos
//     recommendation string

const placeSchema = new Schema(
    {
        place_name:{
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        tag:{
            type: String,
            required: true,
        },
        location:{
            type: String,//url
            required: true
        },
        rating: {
            type: Number,
            required: true,
        },
        recommendation :{
            type: String
        }
        
    }
)

export const Places= mongoose.model("Places" ,placeSchema)
