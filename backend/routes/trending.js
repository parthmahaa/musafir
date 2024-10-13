import express from 'express'
import Router from 'express'
import Trending from '../models/Trending.js'
const router = Router()

router.get('' , [] ,  async (req,res) => {
    
    try{
        const response = await Trending.find()
        if(!response) res.status(404).json({msg : "No data found"})

        res.status(200).json({msg: response})
    }
    catch(err){
        console.log(err);
    }
})

export default router