import nodemailer from "nodemailer";
export const sendVerificationMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "komje-app@outlook.com",
        pass: "ABM123456@",
      },
    });

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
