import { NextResponse } from "next/server";

interface MessageRequest {
  type: "inquiry" | "booking-follow-up" | "support";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source: "contact-form" | "calendly-follow-up" | "booking-form";
}

function validateMessageRequest(data: unknown): { valid: boolean; error?: string } {
  const message = data as MessageRequest;

  // Type validation
  if (!message.type || !["inquiry", "booking-follow-up", "support"].includes(message.type)) {
    return { valid: false, error: "Invalid message type" };
  }

  // Source validation
  if (!message.source || !["contact-form", "calendly-follow-up", "booking-form"].includes(message.source)) {
    return { valid: false, error: "Invalid message source" };
  }

  // Name validation
  if (!message.firstName?.trim()) {
    return { valid: false, error: "First name is required" };
  }

  if (!message.lastName?.trim()) {
    return { valid: false, error: "Last name is required" };
  }

  // Email validation
  if (!message.email?.trim()) {
    return { valid: false, error: "Email is required" };
  }

  // Safe email validation regex - avoids ReDoS vulnerability
  // Pattern: local-part@domain.extension with realistic character constraints
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(message.email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Phone validation (optional, but if provided must be valid)
  if (message.phone) {
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
    if (!phoneRegex.test(message.phone) || message.phone.replace(/\D/g, "").length < 10) {
      return { valid: false, error: "Invalid phone number format" };
    }
  }

  // Subject validation
  if (!message.subject?.trim()) {
    return { valid: false, error: "Subject is required" };
  }

  if (message.subject.length < 3 || message.subject.length > 200) {
    return { valid: false, error: "Subject must be between 3 and 200 characters" };
  }

  // Message validation
  if (!message.message?.trim()) {
    return { valid: false, error: "Message is required" };
  }

  if (message.message.length < 10 || message.message.length > 5000) {
    return { valid: false, error: "Message must be between 10 and 5000 characters" };
  }

  return { valid: true };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the message request
    const validation = validateMessageRequest(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const message = body as MessageRequest;

    // Log message (in production, this would be stored in database and/or sent to email service)
    console.log("New message received:", {
      type: message.type,
      source: message.source,
      name: `${message.firstName} ${message.lastName}`,
      email: message.email,
      phone: message.phone,
      company: message.company,
      subject: message.subject,
      messageLength: message.message.length,
      timestamp: new Date().toISOString(),
    });

    // TODO: Production integrations
    // 1. Send confirmation email to customer
    // 2. Store in database (Prisma)
    // 3. Send notification to admin/sales team
    // 4. Integrate with CRM (if applicable)
    // 5. Create ticket in support system

    return NextResponse.json(
      {
        success: true,
        message: "Message received. We'll respond within 24-48 hours.",
        messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Message API error:", error);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Messages API",
      endpoint: "/api/messages",
      method: "POST",
      acceptedTypes: ["inquiry", "booking-follow-up", "support"],
      acceptedSources: ["contact-form", "calendly-follow-up", "booking-form"],
    },
    { status: 200 }
  );
}
