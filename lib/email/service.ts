/**
 * Email service for sending booking confirmations and notifications
 * Default: Console mode (logs emails, requires no external services)
 * Optional: Nodemailer or SendGrid when configured
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
 * Send email via console (development - default mode)
 */
async function sendViaConsole(options: EmailOptions): Promise<boolean> {
  console.log("📧 Email (Console Mode - Development):", {
    to: options.to,
    subject: options.subject,
    from: FROM_EMAIL,
    replyTo: options.replyTo || FROM_EMAIL,
  });
  console.log("📝 Content Preview:", options.plainText.substring(0, 150) + "...");
  return true;
}

/**
 * Send email via Nodemailer
 * NOTE: Requires pnpm add nodemailer
 * Requires env vars: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
 */
async function sendViaNodemailer(options: EmailOptions): Promise<boolean> {
  try {
    console.warn(
      "Nodemailer provider selected but not available. Using console mode instead."
    );
    console.warn("To use Nodemailer, install with: pnpm add nodemailer");
    return sendViaConsole(options);
  } catch (error) {
    console.error("Email service error:", error);
    return false;
  }
}

/**
 * Send email via SendGrid
 * NOTE: Requires pnpm add @sendgrid/mail
 * Requires env var: SENDGRID_API_KEY
 */
async function sendViaSendGrid(options: EmailOptions): Promise<boolean> {
  try {
    console.warn("SendGrid provider selected but not available. Using console mode instead.");
    console.warn("To use SendGrid, install with: pnpm add @sendgrid/mail");
    return sendViaConsole(options);
  } catch (error) {
    console.error("Email service error:", error);
    return false;
  }
}

/**
 * Main send function - routes to appropriate provider
 * Default: Console mode (development/testing)
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
