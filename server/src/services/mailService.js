import { getTransporter } from "../config/mail.js";

export const sendMail = async (email, subject, text) => {
  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: "komje-app@outlook.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
