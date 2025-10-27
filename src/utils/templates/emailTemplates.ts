export const verificationEmail = (
  firstname: string,
  verificationLink: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #0d1117 !important;
        color: #e6edf3 !important;
      }
      .email-container {
        background-color: #161b22 !important;
        color: #e6edf3 !important;
      }
      .email-header {
        background-color: #1f6feb !important;
        display: flex;
        justify-content:center;
        align-items: center;
      }
      .email-title {
        color: #ffffff !important;
      }
      .email-text {
        color: #d0d7de !important;
      }
    }
  </style>
</head>
<body style="font-family: Inter, Helvetica, Arial, sans-serif; background-color: #f4f6f8; color: #2d2d2d; margin:0; padding:40px;">
  <div class="email-container" style="max-width:600px;margin:auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div class="email-header" style="background-color:#eef5ff;padding:30px;text-align:center;">
      <img src="https://res.cloudinary.com/dsvrgnilh/image/upload/v1761571059/logo-blue_q3z1nu.png" alt="SIWES Finder" width="40" style="vertical-align:middle;margin-bottom:10px;" />
      <h2 class="email-title" style="font-size:22px;color:#0d6efd;font-weight:700;margin:0;">SIWES Finder</h2>
    </div>

    <!-- Body -->
    <div style="padding:40px 30px;">
      <p class="email-text" style="font-size:18px;margin-bottom:16px;">Hi <strong>${firstname}</strong>,</p>
      <p class="email-text" style="font-size:16px;line-height:1.6;">
        Thank you for joining <strong>SIWES Finder</strong>! Please verify your email address to activate your account and start exploring verified SIWES opportunities.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a href="${verificationLink}" style="display:inline-block;padding:14px 28px;font-size:16px;color:#fff;background-color:#0d6efd;text-decoration:none;border-radius:8px;font-weight:600;">
          Verify Email
        </a>
      </div>

      <p class="email-text" style="font-size:14px;line-height:1.6;">
        If the button above doesn’t work, copy and paste this link into your browser:
      </p>
      <p style="font-size:14px;word-break:break-all;color:#0d6efd;">${verificationLink}</p>

      <p style="font-size:14px;color:#999;text-align:center;margin-top:40px;">
        – The SIWES Finder Team 💡
      </p>
    </div>
  </div>

  <p style="font-size:12px;color:#999;text-align:center;margin-top:25px;">
    If you did not create an account on SIWES Finder, please ignore this email.
  </p>
</body>
</html>
`;

export const loginRedirectEmail = (firstname: string, loginLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #0d1117 !important;
        color: #e6edf3 !important;
      }
      .email-container {
        background-color: #161b22 !important;
        color: #e6edf3 !important;
      }
      .email-header {
        background-color: #1f6feb !important;
        display: flex;
        justify-content:center;
        align-items: center;
      }
      .email-title {
        color: #ffffff !important;
      }
      .email-text {
        color: #d0d7de !important;
      }
    }
  </style>
</head>
<body style="font-family: Inter, Helvetica, Arial, sans-serif; background-color: #f4f6f8; color: #2d2d2d; margin:0; padding:40px;">
  <div class="email-container" style="max-width:600px;margin:auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div class="email-header" style="background-color:#eef5ff;padding:30px;text-align:center;">
      <img src="https://res.cloudinary.com/dsvrgnilh/image/upload/v1761571059/logo-blue_q3z1nu.png" alt="SIWES Finder" width="40" style="vertical-align:middle;margin-bottom:10px;" />
      <h2 class="email-title" style="font-size:22px;color:#0d6efd;font-weight:700;margin:0;">SIWES Finder</h2>
    </div>

    <!-- Body -->
    <div style="padding:40px 30px;">
      <p class="email-text" style="font-size:18px;margin-bottom:16px;">Hi <strong>${firstname}</strong>,</p>
      <p class="email-text" style="font-size:16px;line-height:1.6;">
        Your email has been verified successfully! You can now log in to your account and start exploring verified internship listings and SIWES opportunities.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a href="${loginLink}" style="display:inline-block;padding:14px 28px;font-size:16px;color:#fff;background-color:#0d6efd;text-decoration:none;border-radius:8px;font-weight:600;">
          Log In
        </a>
      </div>

      <p class="email-text" style="font-size:14px;line-height:1.6;">
        If the button above doesn’t work, copy and paste this link into your browser:
      </p>
      <p style="font-size:14px;word-break:break-all;color:#0d6efd;">${loginLink}</p>

      <p style="font-size:14px;color:#999;text-align:center;margin-top:40px;">
        – The SIWES Finder Team 💡
      </p>
    </div>
  </div>

  <p style="font-size:12px;color:#999;text-align:center;margin-top:25px;">
    If you did not verify your account, please ignore this email.
  </p>
</body>
</html>
`;

export const waitlistConfirmationEmail = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #0d1117 !important;
        color: #e6edf3 !important;
      }
      .email-container {
        background-color: #161b22 !important;
        color: #e6edf3 !important;
      }
      .email-header {
        background-color: #1f6feb !important;
        display: flex;
        justify-content:center;
        align-items: center;
      }
      .email-title {
        color: #ffffff !important;
      }
      .email-text {
        color: #d0d7de !important;
      }
    }
  </style>
</head>
<body style="font-family: Inter, Helvetica, Arial, sans-serif; background-color: #f4f6f8; color: #2d2d2d; margin:0; padding:40px;">
  <div class="email-container" style="max-width:600px;margin:auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div class="email-header" style="background-color:#eef5ff;padding:30px;text-align:center;">
      <img src="https://res.cloudinary.com/dsvrgnilh/image/upload/v1761571059/logo-blue_q3z1nu.png" alt="SIWES Finder" width="40" style="vertical-align:middle;margin-bottom:10px;" />
      <h2 class="email-title" style="font-size:22px;color:#0d6efd;font-weight:700;margin:0;">SIWES Finder</h2>
    </div>

    <!-- Body -->
    <div style="padding:40px 30px;">
      <p style="font-size:18px;margin-bottom:16px;">🎉 You’re officially on the waitlist!</p>
      <p class="email-text" style="font-size:16px;line-height:1.6;">Hi <strong>${
        name || "there"
      }</strong>,</p>
      <p class="email-text" style="font-size:16px;line-height:1.6;">
        Thank you for joining <strong>SIWES Finder</strong>! We’re thrilled to have you as part of the next generation of innovators shaping the future of industrial training across Nigeria.
      </p>
      <p class="email-text" style="font-size:16px;line-height:1.6;">
        You’ll be among the first to explore verified SIWES opportunities, connect with employers, and access top internship listings once we launch.
      </p>
      <p class="email-text" style="font-size:16px;line-height:1.6;">
        Stay tuned — we’ll keep you posted on updates and early access!
      </p>

      <div style="margin-top:35px;text-align:center;">
        <p style="font-size:15px;color:#555;margin-bottom:10px;">Follow us for updates:</p>
        <a href="https://x.com/SiwesfinderHQ" style="margin:0 8px;display:inline-block;">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" alt="Twitter" />
        </a>
        <a href="https://www.linkedin.com/company/siwes-finder/" style="margin:0 8px;display:inline-block;">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" width="24" alt="LinkedIn" />
        </a>
        <a href="https://www.instagram.com/siwesfinder" style="margin:0 8px;display:inline-block;">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="24" alt="Instagram" />
        </a>
      </div>

      <p style="font-size:14px;color:#999;text-align:center;margin-top:40px;">
        – The SIWES Finder Team 💡
      </p>
    </div>
  </div>

  <p style="font-size:12px;color:#999;text-align:center;margin-top:25px;">
    If you didn’t request this, please ignore this email. This message was sent automatically; please do not reply.
  </p>
</body>
</html>
`;
