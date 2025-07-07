const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // You can also use other providers like Outlook, Yahoo
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your app password (not your email password)
  },
});

const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Khaijos Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP for Password Reset",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>Reset Password - OTP Verification</h2>
        <p>Hello,</p>
        <p>Use the OTP below to reset your password. This code is valid for 10 minutes:</p>
        <h3 style="color: #2e7d32;">${otp}</h3>
        <p>If you did not request this, please ignore this email.</p>
        <br/>
        <p>Thanks,<br/>Khaijos Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTPEmail;
