/**
 * Message type definitions for VLN inquiry and messaging system
 */

export type MessageType = "inquiry" | "booking-follow-up" | "support";
export type MessageSource = "contact-form" | "calendly-follow-up" | "booking-form";

export interface MessageRequest {
  type: MessageType;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source: MessageSource;
}

export interface MessageResponse {
  success: boolean;
  message: string;
  messageId: string;
  timestamp: string;
}

export interface MessageError {
  error: string;
  status: number;
}

export const MESSAGE_TYPES: Record<MessageType, string> = {
  inquiry: "General Inquiry",
  "booking-follow-up": "Booking Follow-up",
  support: "Support Request",
};

export const MESSAGE_SOURCES: Record<MessageSource, string> = {
  "contact-form": "Contact Form",
  "calendly-follow-up": "Calendly Follow-up",
  "booking-form": "Booking Form",
};

/**
 * Validation constraints for messages
 */
export const MESSAGE_CONSTRAINTS = {
  firstName: {
    minLength: 1,
    maxLength: 50,
  },
  lastName: {
    minLength: 1,
    maxLength: 50,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    minLength: 10,
    pattern: /^[\d\s+()-]+$/,
  },
  company: {
    minLength: 1,
    maxLength: 100,
  },
  subject: {
    minLength: 3,
    maxLength: 200,
  },
  message: {
    minLength: 10,
    maxLength: 5000,
  },
};
