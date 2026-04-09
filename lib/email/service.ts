/**
 * Email service for sending booking confirmations and notifications
 * Supports multiple providers: Nodemailer, SendGrid, Console (development)
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  plainText: string;
  replyTo?: string;
}

type EmailProvider = "console" | "nodemailer" | "sendgrid";

const PROVIDER: EmailProvider = (process.env.EMAIL_PROVIDER as EmailProvider) || "console";
const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@vln.gg";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@vln.gg";

/**
 * Send email via console (development)
 */
async function sendViaConsole(options: EmailOptions): Promise<boolean> {
  console.log("📧 Email (Console Mode):", {
    to: options.to,
    subject: options.subject,
    from: FROM_EMAIL,
    replyTo: options.replyTo,
  });
  console.log("📝 HTML Preview:", options.html.substring(0, 200) + "...");
  return true;
}

/**
 * Send email via Nodemailer
 * Requires: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
 */
async function sendViaNodemailer(options: EmailOptions): Promise<boolean> {
  try {
    // Dynamic import to avoid requiring nodemailer when not used
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.default.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.plainText,
      replyTo: options.replyTo || FROM_EMAIL,
    });

    return true;
  } catch (error) {
    console.error("Nodemailer error:", error);
    throw error;
  }
}

/**
 * Send email via SendGrid
 * Requires: SENDGRID_API_KEY
 */
async function sendViaSendGrid(options: EmailOptions): Promise<boolean> {
  try {
    const sendgridMail = await import("@sendgrid/mail");

    sendgridMail.default.setApiKey(process.env.SENDGRID_API_KEY || "");

    await sendgridMail.default.send({
      to: options.to,
      from: FROM_EMAIL,
      subject: options.subject,
      html: options.html,
      text: options.plainText,
      replyTo: options.replyTo || FROM_EMAIL,
    });

    return true;
  } catch (error) {
    console.error("SendGrid error:", error);
    throw error;
  }
}

/**
 * Main send function - routes to appropriate provider
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    switch (PROVIDER) {
      case "nodemailer":
        return await sendViaNodemailer(options);
      case "sendgrid":
        return await sendViaSendGrid(options);
      case "console":
      default:
        return await sendViaConsole(options);
    }
  } catch (error) {
    console.error("Email service error:", error);
    return false;
  }
}

/**
 * Send booking confirmation to customer
 */
export async function sendBookingConfirmation(
  to: string,
  html: string,
  plainText: string
): Promise<boolean> {
  return sendEmail({
    to,
    subject: "✓ VLN Booking Confirmation – Your Appointment is Scheduled",
    html,
    plainText,
  });
}

/**
 * Send admin notification of new booking
 */
export async function sendAdminNotification(
  html: string,
  plainText: string,
  customerEmail: string
): Promise<boolean> {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[VLN] New Booking Request from ${customerEmail}`,
    html,
    plainText,
    replyTo: customerEmail,
  });
}

/**
 * Get current email provider configuration status
 */
export function getEmailProviderStatus() {
  return {
    provider: PROVIDER,
    from: FROM_EMAIL,
    adminEmail: ADMIN_EMAIL,
    configured: PROVIDER !== "console",
  };
}
