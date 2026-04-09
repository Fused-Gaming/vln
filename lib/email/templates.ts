/**
 * Email templates for booking system
 * Exports both HTML and plain text versions
 */

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  appointmentType: "virtual" | "in-person";
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  notes?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm} PT`;
}

/**
 * Customer confirmation email
 */
export function getBookingConfirmationEmail(booking: BookingData) {
  const plainText = `
VLN – Booking Confirmation

Dear ${booking.firstName},

Thank you for scheduling a consultation with VLN. Your booking has been confirmed with the following details:

APPOINTMENT DETAILS
═══════════════════
Contact: ${booking.firstName} ${booking.lastName}
Email: ${booking.email}
Type: ${booking.appointmentType === "virtual" ? "Virtual Meeting" : "In-Person (Oakland, CA)"}
Date: ${formatDate(booking.date)}
Time: ${formatTime(booking.time)}

${booking.notes ? `ADDITIONAL NOTES:\n${booking.notes}\n` : ""}

NEXT STEPS
═════════
Our security team will review your request and reach out within 24 hours to confirm the appointment and discuss any preparation needed.

If you need to reschedule or have questions, please reply to this email or contact us at info@vln.gg.

Best regards,
The VLN Security Team
https://vln.gg
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #cbd5e1; background: #0a0e0f; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #86d993 0%, #7dd3fc 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .section { margin: 20px 0; }
    .section-title { font-size: 12px; font-weight: 600; color: #86d993; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    .details { background: #151a1c; padding: 20px; border-radius: 12px; border: 1px solid rgba(134, 217, 147, 0.2); }
    .detail-row { display: flex; margin: 10px 0; }
    .detail-label { color: #94a3b8; width: 140px; font-weight: 500; }
    .detail-value { color: #f8f9fa; flex: 1; }
    .notes { background: #151a1c; padding: 15px; border-radius: 12px; border-left: 3px solid #86d993; margin: 15px 0; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(134, 217, 147, 0.2); font-size: 12px; color: #94a3b8; }
    .link { color: #86d993; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Booking Confirmed</h1>
    </div>

    <p>Dear <strong>${booking.firstName}</strong>,</p>

    <p>Thank you for scheduling a consultation with VLN. Your booking has been confirmed with the following details:</p>

    <div class="section">
      <h3 class="section-title">Appointment Details</h3>
      <div class="details">
        <div class="detail-row">
          <div class="detail-label">Name:</div>
          <div class="detail-value">${booking.firstName} ${booking.lastName}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Email:</div>
          <div class="detail-value"><a href="mailto:${booking.email}" class="link">${booking.email}</a></div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Type:</div>
          <div class="detail-value">${booking.appointmentType === "virtual" ? "Virtual Meeting" : "In-Person (Oakland, CA)"}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Date:</div>
          <div class="detail-value">${formatDate(booking.date)}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Time:</div>
          <div class="detail-value">${formatTime(booking.time)} PT</div>
        </div>
      </div>
    </div>

    ${
      booking.notes
        ? `
    <div class="section">
      <h3 class="section-title">Your Notes</h3>
      <div class="notes">${booking.notes.replace(/\n/g, "<br>")}</div>
    </div>
    `
        : ""
    }

    <div class="section">
      <h3 class="section-title">What's Next</h3>
      <p>Our security team will review your request and reach out within 24 hours to confirm the appointment and discuss any preparation needed.</p>
      <p>If you need to reschedule or have questions, please reply to this email or contact us at <a href="mailto:info@vln.gg" class="link">info@vln.gg</a>.</p>
    </div>

    <div class="footer">
      <p>© 2026 VLN – Vulnerability Lab Network<br>
      <a href="https://vln.gg" class="link">vln.gg</a> | <a href="mailto:info@vln.gg" class="link">info@vln.gg</a></p>
    </div>
  </div>
</body>
</html>
`;

  return { plainText, html };
}

/**
 * Admin notification email
 */
export function getAdminNotificationEmail(booking: BookingData) {
  const plainText = `
NEW BOOKING REQUEST
═══════════════════

Name: ${booking.firstName} ${booking.lastName}
Email: ${booking.email}
Phone: [Not provided]
Type: ${booking.appointmentType === "virtual" ? "Virtual" : "In-Person"}
Date: ${formatDate(booking.date)}
Time: ${formatTime(booking.time)} PT

${booking.notes ? `NOTES:\n${booking.notes}\n` : ""}

ACTION: Review and confirm appointment within 24 hours.
Contact: ${booking.email}
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Courier New', monospace; color: #333; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; }
    .header { background: #86d993; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .details { background: #f9f9f9; padding: 15px; border-left: 3px solid #86d993; margin: 15px 0; }
    .row { margin: 8px 0; }
    .label { font-weight: bold; width: 120px; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">📅 New Booking Request</h1>
    </div>

    <div class="details">
      <div class="row"><span class="label">Name:</span> ${booking.firstName} ${booking.lastName}</div>
      <div class="row"><span class="label">Email:</span> <a href="mailto:${booking.email}">${booking.email}</a></div>
      <div class="row"><span class="label">Type:</span> ${booking.appointmentType === "virtual" ? "Virtual" : "In-Person"}</div>
      <div class="row"><span class="label">Date:</span> ${formatDate(booking.date)}</div>
      <div class="row"><span class="label">Time:</span> ${formatTime(booking.time)} PT</div>
    </div>

    ${
      booking.notes
        ? `
    <div class="details">
      <strong>Notes:</strong><br>
      ${booking.notes.replace(/\n/g, "<br>")}
    </div>
    `
        : ""
    }

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
      <p><strong>Action Required:</strong> Confirm appointment within 24 hours</p>
      <p>Reply to this email or contact: <strong>${booking.email}</strong></p>
    </div>
  </div>
</body>
</html>
`;

  return { plainText, html };
}
