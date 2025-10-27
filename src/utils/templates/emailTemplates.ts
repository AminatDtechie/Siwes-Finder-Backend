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

export const waitlistConfirmationEmail = (name: string) => `
  <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; padding: 40px; color: #2d2d2d;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background-color: #eef5ff; padding: 30px; text-align: center;">
        <img src="${
          process.env.BACKEND_URL
        }/public/logo-white.png" alt="SIWES Finder" width="40" style="vertical-align: middle; margin-bottom: 10px;" />
        <h2 style="font-size: 22px; color: #0d6efd; font-weight: 700; margin: 0;">SIWES Finder</h2>
      </div>

      <!-- Body -->
      <div style="padding: 40px 30px;">
        <p style="font-size: 18px; margin-bottom: 16px;">🎉 You’re officially on the waitlist!</p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">Hi <strong>${
          name || "there"
        }</strong>,</p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Thank you for joining the <strong>SIWES Finder</strong> waitlist! We’re thrilled to have you as part of the next generation of innovators shaping the future of industrial training across Nigeria.
        </p>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          You’ll be among the first to explore verified SIWES opportunities, connect with employers, and access the best internship listings once we launch.
        </p>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Stay tuned — we’ll keep you posted on updates and early access!
        </p>

        <div style="margin-top: 35px; text-align: center;">
          <p style="font-size: 15px; color: #555; margin-bottom: 10px;">Follow us for updates:</p>
          <a href="https://x.com/SiwesfinderHQ" style="margin: 0 8px; display: inline-block;">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" alt="Twitter" />
          </a>
          <a href="https://www.linkedin.com/company/siwes-finder/" style="margin: 0 8px; display: inline-block;">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" width="24" alt="LinkedIn" />
          </a>
          <a href="https://www.instagram.com/siwesfinder" style="margin: 0 8px; display: inline-block;">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="24" alt="Instagram" />
          </a>
        </div>

        <p style="font-size: 14px; color: #999; text-align: center; margin-top: 40px;">
          – The SIWES Finder Team 💡
        </p>
      </div>
    </div>

    <p style="font-size: 12px; color: #999; text-align: center; margin-top: 25px;">
      If you didn’t request this, please ignore this email. This message was sent automatically; please do not reply.
    </p>
  </div>
`;
