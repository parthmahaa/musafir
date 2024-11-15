import mongoose, {Schema} from "mongoose"

const trendingSchema= new Schema(
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
      description: {
        type: String
      },
      location :{
        type : String,
        required : true,
      }
    },
    {timestamps: true}
)

const Trending = mongoose.model("Trending" , trendingSchema)

export default Trending