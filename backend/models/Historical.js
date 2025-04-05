import mongoose, {Schema} from "mongoose"

const historicalSchema= new Schema(
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

const H = mongoose.model("historicalPlaces" , historicalSchema)

export default H
