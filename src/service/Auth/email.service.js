// const nodemailer = require('nodemailer');
// const { MAIL_HOST, MAIL_PASSWORD, MAIL_USER, MAIL_PORT } = require('../../_config/env.config.js');
// const  verifyEmailTemplate  = require('../../Template/emailVerification.js');
// const  passwordResetTemplate  = require('../../Template/passwordReset.js');

// const transporter = nodemailer.createTransport({
//   host: MAIL_HOST,
//   port: MAIL_PORT,
//   secure: true, 
//   auth: {
//     user: MAIL_USER,
//     pass: MAIL_PASSWORD,
//   },
// });

// transporter.verify((error) => {
//   if (error) {
//     console.error('Mail server connection failed:', error.message);
//   } else {
//     console.log('Mail server is ready');
//   }
// });

// // Send email verification
// async function sendEmail(to, subject, html) {
//   try {
//     await transporter.sendMail({
//       from: `Prepal <${MAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     return true;
//   } catch (error) {
//     console.error('Email sending error:', error);
//     throw new Error('Email could not be sent');
//   }
// }


// async function sendVerificationEmail(to, token) {
//   const html = verifyEmailTemplate(token);
//   return sendEmail(to, 'Verify Your Email', html);
// };

// async function sendPasswordResetEmail(to, token) {
//   const html = passwordResetTemplate(token);
//   return sendEmail(to, 'Reset Your Password', html);
// };


// // Export functions and templates
// module.exports = {
//   sendVerificationEmail,
//   sendPasswordResetEmail,
//   emailTemplates: {
//     EMAIL_VERIFICATION: verifyEmailTemplate,
//     PASSWORD_RESET: passwordResetTemplate,
//   },
// };