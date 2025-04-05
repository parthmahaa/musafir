import mongoose, {Schema} from "mongoose"

const StreetSchema= new Schema(
    {
      name:{
        type: String,
        required: true,
        trim: true
      },
      img:{
        type: String,
        unique: true,
        lowercase: true
      },
      tag: {
        type: String,
      },
      recommendation: {
        type: String,
        required: true
      },
      location :{
        type : String,
        required : true,
      },
      rating:{
        type: Number
      }
    },
    {timestamps: true}
)

const StreetFood = mongoose.model("streetFood" , StreetSchema)

export default StreetFood
