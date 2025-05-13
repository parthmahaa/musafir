import client from '../config/redisClient.js'
import Router from 'express'
import Trending from '../models/Trending.js'
const router = Router()

router.get('' , [] ,  async (req,res) => {
    try{
        const cacheKey = 'trending'
        const cachedData = await client.get(cacheKey)

        if(cachedData){
            res.status(200).json({msg: cachedData ,cached: true})
        }
        const response = await Trending.find()
        if(!response) res.status(404).json({msg : "No data found"})
        
        await client.setEx(cacheKey, 86400, JSON.stringify(response))
        res.status(200).json({msg: response, cached: false})
    }
    catch(err){
        console.log(err);
    }
})

export default router