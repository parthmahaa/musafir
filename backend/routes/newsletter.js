import Router from 'express'
import News from '../models/Newsletter.js'
import {body, validationResult} from 'express-validator'
import nodemailer from 'nodemailer'
import path from 'path'
import ejs from 'ejs'

const router = Router()

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.musafir@gmail.com',
        pass: 'ibkpvwvuudrbpxri'
    }
});

router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
], async(req,res)=>{
    let success = false 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await News.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, message: "User with this email already exists" });
        }

        // Create new subscriber
        await News.create({
            name: req.body.name,
            email: req.body.email
        })

        // Render email template
        const templatePath = path.join(process.cwd(), 'backend', 'views', 'newsletter.ejs');
        const htmlContent = await ejs.renderFile(templatePath, {
            name: req.body.name
        });

        // Send email
        await transporter.sendMail({
            from: 'noreply.musafir@gmail.com',
            to: req.body.email,
            subject: 'Welcome to Musafir!',
            html: htmlContent
        });

        success = true
        console.log("Email sent successfully");
        res.status(201).json({ success, message: "Subscribed successfully" });
    }
    catch(err){
        console.error("Error:", err);
        res.status(500).send("Internal server error occurred");
    }
})

export default router