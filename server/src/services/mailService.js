import fs from "fs";
import ejs from "ejs";
import { getTransporter } from "../config/mail.js";

export const sendMail = async ({ type, email, subject, username, url }) => {
  try {
    const transporter = getTransporter();
    const payload =
      type === "VERIFY_ACCOUNT"
        ? accountVerificationTemplate({ username, url })
        : passwordUpdateTemplate({ username, url });

    await transporter.sendMail({
      from: "komje-app@outlook.com",
      to: email,
      subject: subject,
      text: `Welcome to Komje! /n Please hit the link below to ${subject}`,
      html: payload,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

const accountVerificationTemplate = ({ username, url }) => {
  const htmlTemplate = fs.readFileSync(
    "templates/accountVerificationTemplate.html",
    {
      encoding: "utf-8",
    }
  );

  return ejs.render(htmlTemplate, { username, url });
};

const passwordUpdateTemplate = ({ username, url }) => {
  const htmlTemplate = fs.readFileSync(
    "templates/accountVerificationTemplate.html",
    {
      encoding: "utf-8",
    }
  );

  return ejs.render(htmlTemplate, { username, url });
};
