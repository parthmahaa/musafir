import mongoose, {Schema} from "mongoose"

const userSchema= new Schema(
    {
      full_name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
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
        required: [true, "password is require"],
        minlength: 5,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        default: '',
        unique: true,
    },
    address: {
        type: String,
        default: ''
    },
    },
    {timestamps: true}
)

const User = mongoose.model("user" , userSchema)

export default User
