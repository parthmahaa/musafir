import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
import newsletter from './routes/newsletter.js'
import {body,validationResult} from 'express-validator'
const app = express()
const port= 5000

import cors from 'cors'
app.use(cors())
app.use(express.json())

//DB connection
mongoose.connect("mongodb://127.0.0.1:27017/cityGuide" ,{})
.then(()=>{
    console.log("mongoDb connceted");
})
.catch((err) => {console.log("Connection failed")})
import User from './models/User.js'
import News from './models/Newsletter.js'
import Wishlist from './models/Wishlist.js'


//ROUTES
app.use('/auth' ,auth)
app.use('/contact-us' ,newsletter)


app.listen(port, () => {
    console.log(`APP is listening on PORT: ${port}`);
});