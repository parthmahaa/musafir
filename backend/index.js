import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
import historical from './routes/historical.js'
import newsletter from './routes/newsletter.js'
import streetFood from './routes/streetFood.js'
import trending from './routes/trending.js'
import cafe from './routes/cafe.js'
import wishlist  from './routes/wishlist.js'
const app = express()
const port= 5000

import cors from 'cors'
app.use(cors())
app.use(express.json())

//DB connection
mongoose.connect("mongodb+srv://parthmaha9:secret2564@musafir.gft0t.mongodb.net/cityGuide" ,{})
.then(()=>{
    console.log("mongoDb connceted");
})
.catch((err) => {console.log("Connection failed")})
import User from './models/User.js'
import News from './models/Newsletter.js'
import Wishlist from './models/Wishlist.js'
import Cafe from './models/Cafe.js'
import Historical from './models/Historical.js'
import StreetFood from './models/StreetFood.js'
import Trending from './models/Trending.js'
import Wishlist from './models/Wishlist.js'


//ROUTES
app.use('/auth' ,auth)
app.use('/contact-us' ,newsletter)
app.use('/historical' ,historical)
app.use('/cafe' ,cafe)
app.use('/street_food' ,streetFood)
app.use('/explore' ,trending)
app.use('/wishlist' ,wishlist)


app.listen(port, () => {
    console.log(`APP is listening on PORT: ${port}`);
});