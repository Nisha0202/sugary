// emailService.js
const nodemailer = require('nodemailer');
const User = require('./models/User.js');

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

// Function to send verification email
const sendVerificationEmail = async (user, token) => {
    const verificationUrl = `https://sugary-backend.vercel.app/api/verify-email?token=${token}`;
    await User.create({
        name: user.name,
        location: user.location,
        email: user.email,
        password: user.password
    });

    const mailOptions = {
        from: 'no-reply@yourapp.com',
        to: user.email,
        subject: 'Email Verification for Sugary',
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












// // emailService.js
// const nodemailer = require('nodemailer');
// const User = require('./models/User.js');

// // Create a transport object using Mailtrap SMTP settings
// const transporter = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//         user: "3f906593a75218",
//         pass: process.env.MAIL_PASS
//     }
// });

// // Function to send verification email
// const sendVerificationEmail = async (user, token) => {
//     const verificationUrl = `https://sugary-backend.vercel.app/api/verify-email?token=${token}`;
//     await User.create({
//         name: user.name,
//         location: user.location,
//         email: user.email,
//         password: user.password
//     });

//     const mailOptions = {
//         from: 'no-reply@yourapp.com',
//         to: user.email,
//         subject: 'Email Verification',
//         html: `<p>Hello ${user.name},</p>
//                <p>Please verify your email by clicking on the following link or paste it in your browser:</p>
//                <a href="${verificationUrl}">Verify Email</a>
//                <p>Thank you!</p>`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Verification email sent successfully.');
//     } catch (error) {
//         console.error('Error sending verification email:', error);
//         throw new Error('Error sending verification email');
//     }
// };

// module.exports = sendVerificationEmail;


// const axios = require('axios');

// const sendVerificationEmail = async (user, token) => {
//   const verificationUrl = `http://localhost:5000/api/verify-email?token=${token}`;

//   const recipients = [{ name: user.name, email: user.email }];

//   const emailParams = {
//     from: {
//       email: "nishajabatunnessa@gmail.com",
//       name: "Nisha",
//     },
//     to: recipients,
//     subject: "Email Verification",
//     html: `<p>Hello ${user.name},</p>
//            <p>Please verify your email by clicking on the following link or paste it in your browser:</p>
//            <a href="${verificationUrl}">Verify Email</a>
//            <p>Thank you!</p>`,
//     text: `Hello ${user.name},\n\nPlease verify your email by clicking on the following link or paste it in your browser:\n\n${verificationUrl}\n\nThank you!`,
//   };

//   try {
//     const response = await axios.post(
//       'https://api.mailersend.com/v1/email',
//       {
//         from: emailParams.from,
//         to: emailParams.to,
//         subject: emailParams.subject,
//         html: emailParams.html,
//         text: emailParams.text,
//       },
//       {
//         headers: {
//           'Authorization': 'Bearer 5d66',
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     console.log('Verification email sent successfully:', response);
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//     throw new Error('Error sending verification email');
//   }
// };

// module.exports = sendVerificationEmail;
