//ForgotPass.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../passwordResetService');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_TOKEN;

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (!user.isVerified) {
        return res.status(403).json({ error: 'User not verified' });
    }

    try {
   
        const token = jwt.sign({
            userId: user._id,
            username: user.name,
            email: user.email,
            isAdmin: user.isAdmin  
        }, jwtSecret, { expiresIn: '1h' });

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        await sendPasswordResetEmail(user, token);

        res.json({ success: true, message: 'Password reset email sent' }); 

    } catch (error) {
        console.error('Error handling forgot password:', error);
        res.status(500).json({ error: 'Error handling forgot password' });
    }
});

module.exports = router;

