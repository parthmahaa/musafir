

import mongoose, {Schema} from "mongoose"

const userSchema= new Schema(
    {
      full_name:{
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
      password: {
        type: String,
        required: [true, "password is require"]
      }
    },
    {timestamps: true}
)

const User = mongoose.model("user" , userSchema)

export default User
