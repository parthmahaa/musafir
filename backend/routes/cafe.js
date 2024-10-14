import express from 'express'
import Router from 'express'
import Cafe from '../models/Cafe.js'
const router = Router()

router.get('' , [] ,  async (req,res) => {
    
    try{
        const response = await Cafe.find().sort({ rating: -1 })
        if(!response) res.status(404).json({msg : "No data found"})

        res.status(200).json({msg: response})
    }
    catch(err){
        console.log(err);
    }
})

export default router