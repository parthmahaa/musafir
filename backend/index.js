import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
const app = express()
const port= 5000

import cors from 'cors'
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/cityGuide")
.then(()=>{
    console.log("mongoDb connceted");
})
.catch((err) => console.log("Connection failed"))

//ROUTES
app.use('/auth' ,auth)



app.listen(port, () => {
    console.log(`APP is listening on PORT: ${port}`);
});