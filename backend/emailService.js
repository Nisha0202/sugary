// emailService.js
const nodemailer = require('nodemailer');
const User = require('../backend/models/User');

// Create a transport object using Mailtrap SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: "3f906593a75218",
        pass: process.env.MAIL_PASS
    }
});

// Function to send verification email
const sendVerificationEmail = async (user, token) => {
    const verificationUrl = `http://localhost:5000/api/verify-email?token=${token}`;
    await User.create({
        name: user.name,
        location: user.location,
        email: user.email,
        password: user.password
    });

    const mailOptions = {
        from: 'no-reply@yourapp.com',
        to: user.email,
        subject: 'Email Verification',
        html: `<p>Hello ${user.name},</p>
               <p>Please verify your email by clicking on the following link or paste it in your browser:</p>
               <a href="${verificationUrl}">Verify Email</a>
               <p>Thank you!</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully.');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Error sending verification email');
    }
};

module.exports = sendVerificationEmail;
