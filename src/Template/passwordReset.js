function passwordResetTemplate(resetPasswordToken) {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
      <style>
        body, table, td, a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        body {
          margin: 0;
          padding: 0;
          width: 100% !important;
          height: 100% !important;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
        }
        .email-header {
          background-color: #0f172a;
          padding: 24px;
          text-align: center;
        }
        .email-header h1 {
          color: #ffffff;
          font-size: 20px;
          margin: 0;
        }
        .email-body {
          padding: 32px 24px;
          color: #1f2937;
          font-size: 15px;
          line-height: 1.6;
        }
        .email-body h2 {
          font-size: 18px;
          margin-bottom: 16px;
          color: #111827;
        }
        .verify-button {
          display: inline-block;
          margin: 24px 0;
          padding: 16px 32px;
          background-color: #a0522d; /* brown color */
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          font-family: monospace;
          font-size: 24px;
          letter-spacing: 4px;
          text-align: center;
        }
        .email-footer {
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          background-color: #f9fafb;
        }
      </style>
    </head>

    <body>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 24px">
            <table class="email-container" width="100%">
              <!-- Header -->
              <tr>
                <td class="email-header">
                  <h1>Password Reset Code</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td class="email-body">
                  <h2>Hello 👋</h2>

                  <p>
                    We received a request to reset your password. Use the code below to reset it:
                  </p>

                  <div class="verify-button">
                    ${resetPasswordToken}
                  </div>

                  <p style="margin-top: 24px">
                    This code will expire in <strong>1 minutes</strong> for security reasons.
                  </p>

                  <p>
                    If you did not request a password reset, please ignore this email. Your account remains secure.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td class="email-footer">
                  <p>© ${year} PrePal. All rights reserved.</p>
                  <p>
                    Need help? Contact us at
                    <a href="mailto:support@yourcompany.com">
                      support@yourcompany.com
                    </a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

module.exports = passwordResetTemplate;