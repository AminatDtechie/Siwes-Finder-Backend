import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, body: string) => {
  try {
    const data = await resend.emails.send({
      from: "Siwes Finder <no-reply@siwesfinder.com>",
      to,
      subject,
      html: body,
    });
    return { success: true, data };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: err };
  }
};
