export default function createResetPasswordEmail(link, name, email) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
        color: #000;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #4F8A8B;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content h2 {
        margin-top: 0;
      }
      .reset-button {
        display: inline-block;
        margin: 20px 0;
        padding: 10px 20px;
        background-color: #4F8A8B;
        color: #ffffff !important; /* Add !important to enforce the white color */
        text-decoration: none; /* Remove underline */
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }

      .reset-button:hover {
        background-color: #3A6D6E;
        text-decoration: none; /* Ensure underline doesn't appear on hover */
      }

      .instructions {
        margin-top: 20px;
        font-size: 14px;
        color: #555;
      }
      .instructions p {
        margin: 0;
        padding: 5px 0;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #f1f1f1;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <h2>Hi ${name},</h2>
        <p>We received a request to reset your password for your account. Click the button below to reset your password:</p>
        <a href="${link}" class="reset-button">Reset Your Password</a>
        <p>If the button above doesn’t work, click or copy and paste the following link into your browser:</p>
        <p><a href="${link}">${link}</a></p>
        <div class="instructions">
          <p>This link will expire shortly. If it is expired, request a new one.</p>
          <p>If you did not request a password reset, you can safely ignore this email. Rest assured, your account is safe.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
        </div>
      </div>
      <div class="footer">
        <p>&copy; 2025 Habitize. All rights reserved.</p>
        <p>This email was sent to ${email}. If you no longer want to receive emails from us, please contact our support team.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
