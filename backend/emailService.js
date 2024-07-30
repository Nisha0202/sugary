// emailService.js
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL, // your email address
//     pass: process.env.EMAIL_PASSWORD // your email password
//   }
// });

// const sendVerificationEmail = async (user, token) => {
//   const verificationUrl = `http://localhost:5000/api/verify?token=${token}`;

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: user.email,
//     subject: 'Email Verification for Sugary',
//     html: `
//       <h1>Email Verification</h1>
//       <p>Hi ${user.name},</p>
//       <p>Welcome! Please verify your email by clicking on the link below:</p>
//       <a href="${verificationUrl}">${verificationUrl}</a>
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Verification email sent');
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//   }
// };

// module.exports = sendVerificationEmail;


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
