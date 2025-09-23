// src/templates/emailTemplates.ts

export const verificationEmail = (
  firstname: string,
  verificationLink: string
) => `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 30px; color: #333;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h1 style="color: #0d6efd; font-size: 24px; margin-bottom: 20px;">Hello ${firstname}, Welcome to Siwes Finder!</h1>
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
      Thank you for joining our platform. To get started and secure your account, please verify your email address by clicking the button below.
    </p>
    <a href="${verificationLink}" style="display: inline-block; padding: 14px 28px; font-size: 16px; color: #ffffff; background-color: #0d6efd; text-decoration: none; border-radius: 6px; font-weight: bold;">
      Verify Your Email
    </a>
    <p style="font-size: 14px; color: #555; margin-top: 20px;">
      If the button doesn’t work, copy and paste the following link into your browser:
    </p>
    <p style="font-size: 14px; word-break: break-all; color: #0d6efd;">
      ${verificationLink}
    </p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 12px; color: #999;">
      If you did not create an account on Siwes Finder, please ignore this email. This message was sent automatically; please do not reply.
    </p>
  </div>
</div>
`;

export const loginRedirectEmail = (firstname: string, loginLink: string) => `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 30px; color: #333;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h1 style="color: #0d6efd; font-size: 24px; margin-bottom: 20px;">Hello ${firstname},</h1>
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
      Your email has been verified successfully! You can now log in to your account by clicking the button below.
    </p>
    <a href="${loginLink}" style="display: inline-block; padding: 14px 28px; font-size: 16px; color: #ffffff; background-color: #0d6efd; text-decoration: none; border-radius: 6px; font-weight: bold;">
      Log In
    </a>
    <p style="font-size: 14px; color: #555; margin-top: 20px;">
      If the button doesn’t work, copy and paste the following link into your browser:
    </p>
    <p style="font-size: 14px; word-break: break-all; color: #0d6efd;">
      ${loginLink}
    </p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 12px; color: #999;">
      If you did not verify your account, please ignore this email. This message was sent automatically; please do not reply.
    </p>
  </div>
</div>
`;
