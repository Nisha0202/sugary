const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.SECRET_TOKEN;

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

        const salt = await bcrypt.genSalt(6);
        let secpassWord = await bcrypt.hash(req.body.password, salt); // hashed password

        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const user = await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secpassWord
            });

            // create token
            const token = jwt.sign({ userId: user._id, username: user.name, email: user.email }, jwtSecret, { expiresIn: '1h' });

            res.json({ success: true, token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false });
        }
    }
);

module.exports = router;
