import { NextResponse } from "next/server";

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

    // TODO: Integrate with your booking system
    // For now, this is a placeholder that accepts the request
    // In production, you would:
    // 1. Send a confirmation email
    // 2. Store in database
    // 3. Send notification to admin
    // 4. Integrate with calendar system

    console.log("New booking request:", {
      name: `${booking.firstName} ${booking.lastName}`,
      email: booking.email,
      type: booking.appointmentType,
      date: booking.date,
      time: booking.time,
      notes: booking.notes,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Booking request received. We'll confirm within 24 hours.",
        booking: {
          id: Math.random().toString(36).substr(2, 9),
          ...booking,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Failed to process booking request" }, { status: 500 });
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
