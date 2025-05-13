import client from '../config/redisClient.js';
import Router from 'express'
import Cafe from '../models/Cafe.js'
const router = Router()

router.get('' , [] ,  async (req,res) => {
    try{
        const cacheKey = 'cafe'

         console.time('redis-get');
        const cachedData = await client.get(cacheKey)
        console.timeEnd('redis-get')
        
        if(cachedData){
            console.log("cache hit");
            return res.status(200).json({msg: JSON.parse(cachedData) ,cached: true})
        }

        console.log("no cahed data");

        const response = await Cafe.find().sort({ rating: -1 })
        if(!response) res.status(404).json({msg : "No data found"})

        await client.setEx(cacheKey, 86400, JSON.stringify(response))
        console.log("Data cached");
        res.status(200).json({msg: response ,cached: false})
    }
    catch(err){
        console.log(err);
    }
})

export default router