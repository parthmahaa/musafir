import mongoose, {Schema} from "mongoose"

const cafeSchema= new Schema(
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
      },
      rating:{
        type: Number
      }
    },
    {timestamps: true}
)

const Cafe = mongoose.model("Outing" , cafeSchema)

export default Cafe