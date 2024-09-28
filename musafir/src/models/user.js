/*
username string pk
  full_name string
  email string
  password string 
  wishlist_id ObjectId[] wishlist
*/ 

import mongoose, {Schema} from "mongoose"

const userSchema= new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
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
      },
      full_name:{
        type: String,
        required: true,
        trim: true
      },
      wishlist : [
        {
          type: Schema.Type.ObjectId,
          ref: "wishlist"
        }

      ]
    },
    {timestamps: true}
)

export const User = mongoose.model("User" ,userSchema)
