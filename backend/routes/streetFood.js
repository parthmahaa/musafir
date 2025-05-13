import client from '../config/redisClient.js'
import Router from 'express'
import StreetFood from '../models/StreetFood.js'
const router = Router()

router.get('' , [] ,  async (req,res) => {
    try{
        const cacheKey = 'street-food'

        const cachedData = await client.get(cacheKey)

        if(cachedData){
            return res.status(200).json({msg: JSON.parse(cachedData), cached: true})
        }

        const response = await StreetFood.find().sort({ rating: -1 })
        if(!response) res.status(404).json({msg : "No data found"})
        
        await client.setEx(cacheKey, 86400, JSON.stringify(response))
                res.status(200).json({msg: response ,cached: false})
    }
    catch(err){
        console.log(err);
    }
})

export default router