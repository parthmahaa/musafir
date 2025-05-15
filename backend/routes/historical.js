import Router from 'express'
import H from '../models/Historical.js'
const router = Router()

router.get('' , [] ,  async (req,res) => {
    try{
        const response = await H.find()
        if(!response) res.status(404).json({msg : "No data found"})

        res.status(200).json({msg: response})
    }
    catch(err){
        console.log(err);
    }
})

export default router