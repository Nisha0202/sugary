// passwordResetService.js
const nodemailer = require('nodemailer');

// Create a transport object using Gmail SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: '2020-3-60-066@std.ewubd.edu',
        pass: process.env.GMAIL_API
    }
});

// Function to send password reset email
const sendPasswordResetEmail = async (user, token) => {
    const resetUrl = `https://sugaryy.netlify.app/reset-password?token=${token}`;
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












// // passwordResetService.js
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//         user: '3f906593a75218',
//         pass: process.env.MAIL_PASS
//     }
// });

// // Function to send password reset email
// const sendPasswordResetEmail = async (user, token) => {
//     const resetUrl = `https://sugaryy.netlify.app/reset-password?token=${token}`;
//     const mailOptions = {
//         from: 'no-reply@yourapp.com',
//         to: user.email,
//         subject: 'Password Reset Request for Sugary',
//         html: `<p>Hello ${user.name},</p>
//                <p>Click on the following link to reset your password:</p>
//                <a href="${resetUrl}">Reset Password</a>
//                <p>Thank you!</p>`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Password reset email sent successfully.');
//     } catch (error) {
//         console.error('Error sending password reset email:', error);
//         throw new Error('Error sending password reset email');
//     }
// };

// module.exports = { sendPasswordResetEmail };
