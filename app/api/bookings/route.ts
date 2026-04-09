import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getBookingConfirmationEmail, getAdminNotificationEmail } from "@/lib/email/templates";
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/email/service";

const prisma = new PrismaClient();

interface BookingRequest {
  appointmentType: "virtual" | "in-person";
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  time: string;
  notes: string;
}

// Federal holidays to exclude
const FEDERAL_HOLIDAYS = [
  "2024-01-01", "2024-01-15", "2024-02-19", "2024-03-29", "2024-05-27", "2024-06-19",
  "2024-07-04", "2024-09-02", "2024-10-14", "2024-11-11", "2024-11-28", "2024-12-25",
  "2025-01-01", "2025-01-20", "2025-02-17", "2025-04-18", "2025-05-26", "2025-06-19",
  "2025-07-04", "2025-09-01", "2025-10-13", "2025-11-11", "2025-11-27", "2025-12-25",
];

function isFederalHoliday(date: string): boolean {
  return FEDERAL_HOLIDAYS.includes(date);
}

function isBusinessDay(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek !== 0 && dayOfWeek !== 6;
}

function validateBookingRequest(data: unknown): { valid: boolean; error?: string } {
  const booking = data as BookingRequest;

  // Check required fields
  if (!booking.firstName?.trim()) {
    return { valid: false, error: "First name is required" };
  }

  if (!booking.lastName?.trim()) {
    return { valid: false, error: "Last name is required" };
  }

  if (!booking.email?.trim()) {
    return { valid: false, error: "Email is required" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
    return { valid: false, error: "Invalid email format" };
  }

  if (!booking.appointmentType || !["virtual", "in-person"].includes(booking.appointmentType)) {
    return { valid: false, error: "Invalid appointment type" };
  }

  if (!booking.date) {
    return { valid: false, error: "Date is required" };
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(booking.date)) {
    return { valid: false, error: "Invalid date format" };
  }

  // Validate date is valid and in the future
  const appointmentDate = new Date(booking.date);
  if (isNaN(appointmentDate.getTime())) {
    return { valid: false, error: "Invalid date" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (appointmentDate < today) {
    return { valid: false, error: "Date must be in the future" };
  }

  // Check if it's a business day
  if (!isBusinessDay(appointmentDate)) {
    return { valid: false, error: "Please select a weekday (Monday-Friday)" };
  }

  // Check if it's a federal holiday
  if (isFederalHoliday(booking.date)) {
    return { valid: false, error: "This date is a federal holiday" };
  }

  // Validate date is within 90 days
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  if (appointmentDate > maxDate) {
    return { valid: false, error: "Please select a date within 90 days" };
  }

  if (!booking.time) {
    return { valid: false, error: "Time is required" };
  }

  // Validate time format
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(booking.time)) {
    return { valid: false, error: "Invalid time format" };
  }

  // Validate business hours (11:00 AM - 6:00 PM)
  const [hours] = booking.time.split(":").map(Number);
  if (hours < 11 || hours >= 18) {
    return { valid: false, error: "Time must be between 11:00 AM and 6:00 PM" };
  }

  return { valid: true };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the booking request
    const validation = validateBookingRequest(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const booking = body as BookingRequest;

    // Get client IP and user agent for security/tracking
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || undefined;

    // Parse date and time to create DateTime
    const appointmentDate = new Date(booking.date + "T" + booking.time);

    // Store booking in database
    const storedBooking = await prisma.booking.create({
      data: {
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        appointmentType: booking.appointmentType === "virtual" ? "VIRTUAL" : "IN_PERSON",
        date: appointmentDate,
        time: booking.time,
        notes: booking.notes || null,
        source: "contact-form",
        ipAddress: ip,
        userAgent: userAgent,
      },
    });

    // Generate and send confirmation email to customer
    const { html: confirmationHtml, plainText: confirmationPlain } = getBookingConfirmationEmail(
      booking
    );
    const confirmationSent = await sendBookingConfirmation(booking.email, confirmationHtml, confirmationPlain);

    // Generate and send admin notification
    const { html: adminHtml, plainText: adminPlain } = getAdminNotificationEmail(booking);
    const adminNotificationSent = await sendAdminNotification(adminHtml, adminPlain, booking.email);

    // Update booking to track email delivery
    if (confirmationSent) {
      await prisma.booking.update({
        where: { id: storedBooking.id },
        data: { confirmationEmailSent: true },
      });
    }

    console.log("Booking created successfully:", {
      id: storedBooking.id,
      name: `${booking.firstName} ${booking.lastName}`,
      email: booking.email,
      date: booking.date,
      time: booking.time,
      confirmationSent,
      adminNotificationSent,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Booking request received. Confirmation email sent.",
        booking: {
          id: storedBooking.id,
          ...booking,
          createdAt: storedBooking.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Failed to process booking request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Bookings API",
      endpoint: "/api/bookings",
      method: "POST",
      availableHours: "11:00 AM - 6:00 PM PT",
      businessDays: "Monday - Friday",
      excludedDates: "Federal holidays",
    },
    { status: 200 }
  );
}
