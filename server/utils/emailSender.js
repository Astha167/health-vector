const nodemailer = require('nodemailer');

const createTransporter = () => {
  // If SMTP credentials exist, use real transport; else log to console
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('\n📧 [DEV EMAIL LOG] ===========================');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${html.replace(/<[^>]+>/g, '')}`);
    console.log('=============================================\n');
    return { success: true, dev: true };
  }

  const info = await transporter.sendMail({
    from: `"VitaMetrics" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });

  console.log(`✉️  Email sent: ${info.messageId}`);
  return { success: true, messageId: info.messageId };
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
  return sendEmail({
    to: email,
    subject: 'VitaMetrics – Reset Your Password',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f9f9f9;">
        <div style="background:#0A0F1E;padding:30px;border-radius:12px;text-align:center;">
          <h1 style="color:#06B6D4;margin:0;">VitaMetrics</h1>
          <p style="color:#94a3b8;margin:8px 0 0;">Your Wellness Intelligence Platform</p>
        </div>
        <div style="background:#fff;padding:30px;border-radius:12px;margin-top:16px;">
          <h2 style="color:#0A0F1E;">Password Reset Request</h2>
          <p style="color:#64748b;">Click the button below to reset your password. This link expires in 1 hour.</p>
          <div style="text-align:center;margin:30px 0;">
            <a href="${resetUrl}" style="background:#06B6D4;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">Reset Password</a>
          </div>
          <p style="color:#94a3b8;font-size:14px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      </div>
    `,
  });
};

const sendBookingConfirmationEmail = async (email, booking) => {
  return sendEmail({
    to: email,
    subject: 'VitaMetrics – Booking Confirmed!',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f9f9f9;">
        <div style="background:#0A0F1E;padding:30px;border-radius:12px;text-align:center;">
          <h1 style="color:#06B6D4;margin:0;">VitaMetrics</h1>
        </div>
        <div style="background:#fff;padding:30px;border-radius:12px;margin-top:16px;">
          <h2 style="color:#0A0F1E;">Booking Confirmed ✅</h2>
          <p style="color:#64748b;">Your appointment has been successfully booked.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;color:#64748b;">Type</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;color:#0A0F1E;font-weight:bold;">${booking.assessmentType}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;color:#64748b;">Date</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;color:#0A0F1E;font-weight:bold;">${new Date(booking.date).toDateString()}</td></tr>
            <tr><td style="padding:10px;color:#64748b;">Time</td><td style="padding:10px;color:#0A0F1E;font-weight:bold;">${booking.timeSlot}</td></tr>
          </table>
          <p style="color:#94a3b8;font-size:14px;">Booking ID: ${booking._id}</p>
        </div>
      </div>
    `,
  });
};

const sendOrgInviteEmail = async (email, orgName, orgId) => {
  const registerUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/register?orgId=${orgId}`;
  return sendEmail({
    to: email,
    subject: `${orgName} has invited you to VitaMetrics`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f9f9f9;">
        <div style="background:#0A0F1E;padding:30px;border-radius:12px;text-align:center;">
          <h1 style="color:#06B6D4;margin:0;">VitaMetrics</h1>
        </div>
        <div style="background:#fff;padding:30px;border-radius:12px;margin-top:16px;">
          <h2 style="color:#0A0F1E;">You're Invited!</h2>
          <p style="color:#64748b;"><strong>${orgName}</strong> has invited you to complete a wellness assessment on VitaMetrics.</p>
          <div style="text-align:center;margin:30px 0;">
            <a href="${registerUrl}" style="background:#06B6D4;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">Join VitaMetrics</a>
          </div>
        </div>
      </div>
    `,
  });
};

module.exports = { sendEmail, sendPasswordResetEmail, sendBookingConfirmationEmail, sendOrgInviteEmail };
