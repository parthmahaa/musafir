import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express'
import cron from 'node-cron'
import fetch from 'node-fetch'
import mongoose from 'mongoose'
import config from './config/config.js'
import auth from './routes/auth.js'
import historical from './routes/historical.js'
import newsletter from './routes/newsletter.js'
import streetFood from './routes/streetFood.js'
import trending from './routes/trending.js'
import cafe from './routes/cafe.js'
import wishlist  from './routes/wishlist.js'
import review from './routes/review.js'
import attractions from './routes/attractions.js'
// import chatbot from './routes/chatbot.js'
import trip from './routes/user-trips.js'
import announcement from './routes/announcement.js'
import suggestTripsRouter from './routes/suggest-trips.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = process.env.PORT || 5000

import cors from 'cors'
app.use(cors({
    origin: ['https://musafir-main.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(express.json())

//DB connection
mongoose.connect(config.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout
  })
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
import Newsletter from './models/Newsletter.js'
import Review from './models/Review.js'
import Trip from './models/Trip.js'
import Attractions from './models/Attractions.js';
import Announcement from './models/Announcement.js'
import SuggestTrip from './models/SuggestTrip.js';

cron.schedule('*/10 * * * *', async () => {
  try {
    await fetch('https://musafir-4lbu.onrender.com'); // Replace with your actual Render URL
    console.log('Self-ping successful - staying awake!');
  } catch (error) {
    console.error('Self-ping failed:', error);
  }
});

//ROUTES
app.use('/auth' ,auth)
app.use('/contact-us' ,newsletter)
app.use('/historical' ,historical)
app.use('/cafe' ,cafe)
app.use('/street_food' ,streetFood)
app.use('/explore' ,trending)
app.use('/wishlist' ,wishlist)
app.use('/review' ,review)
app.use('/trip' ,trip)
app.use('/announcement' ,announcement)
app.use('/attractions', attractions);
app.use('/suggest-trips', suggestTripsRouter);

app.listen(port, () => {
    console.log(`APP is listening on PORT: ${port}`);
});