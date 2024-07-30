const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_TOKEN;


router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        user.isVerified = true;
        await user.save();

        //res.json({ success: true, message: 'Email verified successfully' });

        // Customize this response to fit your needs
           res.send(`
            <html>
                <body>
                    <h1>Thank You!</h1>
                    <p>Your email has been successfully verified. You can now <a href="/login">log in</a>.</p>
                </body>
            </html>
        `);



    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Error verifying email' });
    }
});
module.exports = router;