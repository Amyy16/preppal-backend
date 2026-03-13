// const { Resend } = require("resend");
// const  verifyEmailTemplate  = require('../../Template/emailVerification.js');

// const resend = new Resend(process.env.RESEND_API_KEY);


// async function sendEmail(to, subject, html) {
//   try {
//     await resend.emails.send({
//       from: "onboarding@resend.dev", 
//       to,
//       subject,
//       html,
//     });
//     console.log(`Email sent to ${to} with subject "${subject}"`);
//     return true;
//   } catch (error) {
//     console.error('Email sending error:', error);
//     throw new Error('Email could not be sent');
//   }
// }


// async function sendVerifymail(to, token) {
//   const html = verifyEmailTemplate(token);
//   return sendEmail(to, 'Verify Your Email', html);
// };

// module.exports = sendVerifymail;

