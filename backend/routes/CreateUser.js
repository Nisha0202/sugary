const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.SECRET_TOKEN;
const sendVerificationEmail = require('../emailService'); // import the email service

router.post("/createuser",
    [
        body('name', 'Invalid name').isLength({ min: 3 }),
        body('email', 'Invalid email').isEmail(),
        body('password', 'minimum password length is 5').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }  

        //check if user exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User account already exists please Login.' });
        }

        const salt = await bcrypt.genSalt(6);
        let secpassWord = await bcrypt.hash(req.body.password, salt); // hashed password

        try {
            const user = {
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secpassWord
            };

            // create token
            const token = jwt.sign({ username: user.name, email: user.email,
                isAdmin: user.isAdmin  
             }, jwtSecret, { expiresIn: '7d' },);

            // send verification email
            await sendVerificationEmail(user, token);

            res.json({ success: true, token });

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false });
        }
    }
);

module.exports = router;
