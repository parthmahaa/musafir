import express from 'express'
import ejs from 'ejs'
import path from 'path'
import {fileURLToPath} from 'url'
import Router from 'express'
import User from '../models/User.js';
import {body,validationResult} from 'express-validator'
import fetchUser from '../middlewares/fetchUser.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const router = Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    },
    debug: true 
});

//verification step
transporter.verify(function(error, success) {
    if (error) {
        console.log("Transporter verification error:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// Store OTPs temporarily (in production, use Redis or similar)
const otpStore = new Map();

router.get('/user', fetchUser, async (req, res) => {
    try {
      const email = req.query.email;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: "Email parameter is required"
        });
      }
  
      const user = await User.findOne({ email }).select("-password");
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found"
        });
      }
  
      res.json({
        success: true,
        user: {
          email: user.email,
          name: user.full_name,
          id: user._id,
          isAdmin: user.isAdmin,
          phone: user.phone || '',
          address: user.address || ''
        }
      });
  
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        error: "Internal server error occurred"
      });
    }
  });
// ROUTE 1: create a user using : POST "/auth/signup". doesn't require auth
router.post('/signup', [
    body('name', 'Minimum length should be 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters long and include a lowercase letter, uppercase letter, and number')
      .isLength({ min: 6 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'i'),
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({success, errors: error.array() });
    }
    //check if user already exist
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User already exists" });
        }
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create a new user
        user = await User.create({
            full_name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: false,
        })

        const data = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin,
                name: user.full_name,
            }
        }
        const authToken = jwt.sign(data, config.JWT_SECRET);
        success=true;

        res.json({success, authToken,isAdmin: user.isAdmin,name: user.full_name, id: user.id });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, error: "Internal server error occurred", details: error.message });
    }
});


// ROUTE 2: Authenticate a user using : POST "/auth/signin". doesn't require auth
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum length should be 5').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        //user check
        let user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({success, error: "User not found" });
        }
        // Compare password using bcrypt
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            console.log("password not matched");
            return res.status(400).json({
                success: false, 
                error: "Incorrect password."
            });
        }
        const data = {
            user: {
                email: user.email,
                id: user.id,
                isAdmin: user.isAdmin,
                name: user.full_name,
                phone: user.phone || '',
                address: user.address || ''
            }
        }
        const authToken = jwt.sign(data, config.JWT_SECRET);
        success = true;
        res.json({
            success, 
            authToken, 
            isAdmin: user.isAdmin,
            name: user.full_name, 
            id: user.id, 
            email: user.email,
            phone: user.phone || '',
            address: user.address || ''
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({success, error:"Internal server error occured" , details: error.message });
    }
});


// ROUTE 3: Get logged in user details : POST "/auth/getuser". require auth
router.post('/getuser', fetchUser , async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
});

router.put('/update-profile', fetchUser, async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const userEmail = req.user.email
        if (!userEmail) {
            return res.status(401).json({
                success: false,
                error: "Authentication failed"
            });
        }


        // Find user and update
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        // Update fields if provided
        if (name) user.full_name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        await user.save();

        res.json({
            success: true,
            user: {
                name: user.full_name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal server error occurred"
        });
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000);
        
        // Store OTP with 5 minute expiry
        otpStore.set(email, {
            otp,
            expiry: Date.now() + 300000 // 5 minutes
        });

        const emailTemplate = await ejs.renderFile(
            path.join(__dirname, '../views/emails.ejs'),
            { otp }
        )
        // Send email
        await transporter.sendMail({
            from: config.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: emailTemplate,
        });

        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        
        const storedOTP = otpStore.get(email);
        if (!storedOTP || storedOTP.otp !== parseInt(otp) || Date.now() > storedOTP.expiry) {
            return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        
        // Clear OTP
        otpStore.delete(email);

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

export default router