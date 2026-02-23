const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // change later when domain verified
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email error:", error);
    throw new Error("Email failed to send");
  }
};

async function sendVerifymail(to, token) {
  const html = verifyEmailTemplate(token);
  return sendEmail(to, 'Verify Your Email', html);
};

module.exports = sendVerifymail;