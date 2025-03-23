import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail or any other service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send an email with a PDF attachment
export const sendEmailWithPDF = async (to, subject, text, pdfPath) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: "contact_details.pdf",
        path: pdfPath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};