import mongoose, {Schema} from "mongoose"

const newsSchema= new Schema(
    {
      name:{
        type: String,
        required: true,
        trim: true
      },
      email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
      },
    },
    {timestamps: true}
)

const News = mongoose.model("newsletter" , newsSchema)

export default News
