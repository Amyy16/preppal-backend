const { Resend } = require("resend");
const  verifyEmailTemplate  = require('../../Template/emailVerification.js');

const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     await resend.emails.send({
//       from: "onboarding@resend.dev", // change later when domain verified
//       to,
//       subject,
//       html,
//     });
//   } catch (error) {
//     console.error("Email error:", error);
//     throw new Error("Email failed to send");
//   }
// };

async function sendEmail(to, subject, html) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // change later when domain verified
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to} with subject "${subject}"`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Email could not be sent');
  }
}


async function sendVerifymail(to, token) {
  const html = verifyEmailTemplate(token);
  return sendEmail(to, 'Verify Your Email', html);
};

module.exports = sendVerifymail;

// module.exports = {
//   sendVerifymail,
//   emailTemplates: {
//     EMAIL_VERIFICATION: verifyEmailTemplate,
//   },
// };