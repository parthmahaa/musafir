
import Router from 'express'
import News from '../models/Newsletter.js'
import {body,validationResult} from 'express-validator'
const router = Router()

let success = false
router.post('/' ,[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
], async(req,res)=>{
    let success = false 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

    try{
        let user = await News.findOne({ email: req.body.email });
        if (user) {
            console.log("Sorry user with this email already exists");
            return res.status(400).json({ success, message: "User with this email already exists" });

        }

        await News.create({
            name: req.body.name,
            email : req.body.email
        })
        success=true
        res.status(201).json({ success, message: "Data sent to MongoDB" });

    }
    catch(err){
        console.error("Error while saving to MongoDB:", err);
        res.status(500).send("Internal server error occured");
    }
})

export default router