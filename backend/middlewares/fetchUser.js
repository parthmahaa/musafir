import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const fetchUser = (req, res, next) => {
    // Get the token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            error: "Please authenticate using a valid token" 
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            error: "Please authenticate using a valid token" 
        });
    }
};

export default fetchUser;