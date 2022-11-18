import fs from "fs";
import ejs from "ejs";
import { getTransporter } from "../config/mail.js";
import { logError, logInfo } from "../util/logging.js";

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
    logInfo("email sent successfully");
  } catch (error) {
    logError("email not sent!");
    logError(error);
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
    "templates/updatePasswordTemplate.html",
    {
      encoding: "utf-8",
    }
  );

  return ejs.render(htmlTemplate, { username, url });
};
