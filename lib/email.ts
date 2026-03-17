/**
 * Email Service Module
 * Resend integration for transactional emails
 */

import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@vln.gg';
const SUPPORT_EMAIL = process.env.EMAIL_SUPPORT || 'support@vln.gg';

// Initialize Resend only if API key is available
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send email via Resend
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    if (!resend) {
      console.warn('[Email Service] Resend API key not configured. Email not sent.');
      return;
    }

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || SUPPORT_EMAIL,
    });

    if (result.error) {
      console.error('[Email Error]', result.error);
      throw new Error(`Email send failed: ${result.error.message}`);
    }

    console.log(`[Email Sent] to=${options.to} subject=${options.subject}`);
  } catch (error) {
    console.error('[Email Service Error]', error);
    throw error;
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(
  email: string,
  name?: string
): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f0f0f; color: #a6c3a7; padding: 30px; text-align: center; border-radius: 12px; }
          .content { margin: 30px 0; line-height: 1.6; }
          .cta { display: inline-block; background: #a6c3a7; color: #0f0f0f; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .footer { color: #666; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to VLN</h1>
            <p>Security & Smart Contract Vulnerability Lab</p>
          </div>

          <div class="content">
            <p>Hi ${name || 'there'},</p>

            <p>Thank you for joining VLN.gg! We're excited to have you on board.</p>

            <p>VLN provides advanced security auditing, RNG analysis, and risk modeling for high-throughput systems. Whether you're looking to audit smart contracts or assess your platform security, our expert team is ready to help.</p>

            <h3>Getting Started</h3>
            <ul>
              <li><strong>Request an Audit:</strong> Submit your project for comprehensive security review</li>
              <li><strong>View Results:</strong> Track your audit requests in real-time</li>
              <li><strong>Team Collaboration:</strong> Work with our security experts</li>
            </ul>

            <p><a href="${process.env.NEXTAUTH_URL}/audits/request" class="cta">Request Your First Audit</a></p>

            <p>If you have any questions, feel free to reach out to our support team.</p>

            <p>Best regards,<br>The VLN Team</p>
          </div>

          <div class="footer">
            <p>VLN.gg | Security & Smart Contract Auditing</p>
            <p><a href="${process.env.NEXTAUTH_URL}/privacy">Privacy Policy</a> | <a href="${process.env.NEXTAUTH_URL}/terms">Terms of Service</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: 'Welcome to VLN.gg',
    html,
  });
}

/**
 * Send email verification link
 */
export async function sendVerificationEmail(
  email: string,
  verificationUrl: string
): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f0f0f; color: #a6c3a7; padding: 30px; text-align: center; border-radius: 12px; }
          .content { margin: 30px 0; line-height: 1.6; }
          .cta { display: inline-block; background: #a6c3a7; color: #0f0f0f; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .code { background: #f5f5f5; padding: 15px; border-radius: 8px; font-family: monospace; word-break: break-all; }
          .footer { color: #666; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verify Your Email</h1>
          </div>

          <div class="content">
            <p>Thank you for signing up with VLN.gg!</p>

            <p>Please verify your email address by clicking the button below:</p>

            <p><a href="${verificationUrl}" class="cta">Verify Email Address</a></p>

            <p>Or copy and paste this link in your browser:</p>
            <div class="code">${verificationUrl}</div>

            <p>This link will expire in 24 hours.</p>

            <p>If you didn't create this account, please ignore this email.</p>
          </div>

          <div class="footer">
            <p>VLN.gg | Security & Smart Contract Auditing</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: 'Verify your VLN.gg email address',
    html,
  });
}

/**
 * Send audit confirmation email to user
 */
export async function sendAuditConfirmationEmail(
  email: string,
  projectName: string,
  auditId: string,
  estimatedCost: number
): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f0f0f; color: #a6c3a7; padding: 30px; text-align: center; border-radius: 12px; }
          .content { margin: 30px 0; line-height: 1.6; }
          .details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .cta { display: inline-block; background: #a6c3a7; color: #0f0f0f; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .footer { color: #666; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Audit Request Received</h1>
          </div>

          <div class="content">
            <p>Thank you for submitting your audit request!</p>

            <p>Your request has been successfully received and assigned an ID for tracking. Our team will review your submission and provide a detailed assessment shortly.</p>

            <div class="details">
              <p><strong>Project Name:</strong> ${projectName}</p>
              <p><strong>Audit ID:</strong> ${auditId}</p>
              <p><strong>Estimated Cost:</strong> $${estimatedCost.toLocaleString()}</p>
              <p><strong>Status:</strong> Pending Review</p>
            </div>

            <p><a href="${process.env.NEXTAUTH_URL}/audits/${auditId}" class="cta">View Audit Details</a></p>

            <h3>What's Next?</h3>
            <ol>
              <li>Our team will review your project scope and requirements</li>
              <li>We'll provide a detailed quote and timeline within 24 hours</li>
              <li>Upon agreement, we'll begin the security assessment</li>
              <li>You'll receive regular updates throughout the audit process</li>
            </ol>

            <p>If you have any questions, please don't hesitate to reach out.</p>
          </div>

          <div class="footer">
            <p>VLN.gg | Security & Smart Contract Auditing</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: `Audit Request Received - ${projectName}`,
    html,
  });
}

/**
 * Send audit status update email
 */
export async function sendAuditStatusEmail(
  email: string,
  projectName: string,
  auditId: string,
  status: string,
  message: string
): Promise<void> {
  const statusColorMap: Record<string, string> = {
    PENDING: '#FFA500',
    IN_PROGRESS: '#4169E1',
    REVIEW: '#9370DB',
    COMPLETED: '#228B22',
    ISSUE: '#DC143C',
  };

  const statusColor = statusColorMap[status] || '#666';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f0f0f; color: #a6c3a7; padding: 30px; text-align: center; border-radius: 12px; }
          .status-badge { background: ${statusColor}; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 20px 0; font-weight: bold; }
          .content { margin: 30px 0; line-height: 1.6; }
          .cta { display: inline-block; background: #a6c3a7; color: #0f0f0f; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .footer { color: #666; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Audit Status Update</h1>
          </div>

          <div class="content">
            <p><strong>${projectName}</strong></p>

            <div class="status-badge">${status}</div>

            <p>${message}</p>

            <p><a href="${process.env.NEXTAUTH_URL}/audits/${auditId}" class="cta">View Full Details</a></p>
          </div>

          <div class="footer">
            <p>VLN.gg | Security & Smart Contract Auditing</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: `Audit Status: ${status} - ${projectName}`,
    html,
  });
}

/**
 * Send magic link email
 */
export async function sendMagicLinkEmail(
  email: string,
  magicLinkUrl: string
): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f0f0f; color: #a6c3a7; padding: 30px; text-align: center; border-radius: 12px; }
          .content { margin: 30px 0; line-height: 1.6; }
          .cta { display: inline-block; background: #a6c3a7; color: #0f0f0f; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .code { background: #f5f5f5; padding: 15px; border-radius: 8px; font-family: monospace; word-break: break-all; }
          .footer { color: #666; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sign In to VLN</h1>
          </div>

          <div class="content">
            <p>Click the button below to sign in to your VLN account:</p>

            <p><a href="${magicLinkUrl}" class="cta">Sign In</a></p>

            <p>Or copy and paste this link:</p>
            <div class="code">${magicLinkUrl}</div>

            <p>This link will expire in 15 minutes.</p>

            <p>If you didn't request this email, you can safely ignore it.</p>
          </div>

          <div class="footer">
            <p>VLN.gg | Security & Smart Contract Auditing</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: 'Your VLN.gg Sign In Link',
    html,
  });
}
