const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.SECRET_TOKEN;

router.post("/loginuser", [
    body('email', 'Invalid email').isEmail()
], async (req, res) => {
    const { email, password } = req.body; // Destructure for better readability
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        if (email === 'admin@gmail.com' && password === '11111') {
            // Generate a different authToken for the admin user
            const data = {
                user: {
                    isAdmin: true
                }
            };
            const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });
            return res.json({ success: true, authToken });
        } else {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Wrong Credentials!" });
            }

            const pwdCompare = await bcrypt.compare(password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Wrong Credentials!" });
            } else {
                const token = jwt.sign({
                    userId: userData._id,
                    username: userData.name,
                    email: userData.email,
                    isAdmin: userData.isAdmin  
                }, jwtSecret, { expiresIn: '1h' });

                return res.json({ success: true, token });
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
