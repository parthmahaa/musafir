import client from '../config/redisClient.js'
import Router from 'express'
import H from '../models/Historical.js'
const router = Router()

router.get('' , [] ,  async (req,res) => {
    try{
        const cacheKey = 'historical'
        
        const cachedData = await client.get(cacheKey)

        if(cachedData){
            return res.status(200).json({msg: JSON.parse(cachedData) ,cached: true})
        }

        const response = await H.find()
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