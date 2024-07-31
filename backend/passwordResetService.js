// passwordResetService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '3f906593a75218',
        pass: process.env.MAIL_PASS
    }
});

// Function to send password reset email
const sendPasswordResetEmail = async (user, token) => {
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
    const mailOptions = {
        from: 'no-reply@yourapp.com',
        to: user.email,
        subject: 'Password Reset Request for Sugary',
        html: `<p>Hello ${user.name},</p>
               <p>Click on the following link to reset your password:</p>
               <a href="${resetUrl}">Reset Password</a>
               <p>Thank you!</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully.');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email');
    }
};

module.exports = { sendPasswordResetEmail };
