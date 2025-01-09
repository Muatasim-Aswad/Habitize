import nodemailer from "nodemailer";
import AppError from "./AppError.js";
import dotenv from "dotenv";
dotenv.config();

const transporterSettings = {
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(transporterSettings);

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new AppError(500, "Internal Server Error", error.message);
  }
};

export default sendEmail;
