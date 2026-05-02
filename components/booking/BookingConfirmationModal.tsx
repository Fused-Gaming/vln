"use client";

import { Calendar, Clock, MapPin, Mail, CheckCircle, X } from "lucide-react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingConfirmation {
  firstName: string;
  lastName: string;
  email: string;
  appointmentType: "virtual" | "in-person";
  date: string;
  time: string;
  notes?: string;
}

interface BookingConfirmationModalProps {
  booking: BookingConfirmation | null;
  onClose: () => void;
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

export default function BookingConfirmationModal({
  booking,
  onClose,
}: BookingConfirmationModalProps) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-vln-bg-light border-vln-sage/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-vln-sage/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-vln-sage/10 rounded-vln">
              <CheckCircle className="w-6 h-6 text-vln-sage" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-vln-white">Booking Confirmed!</h2>
              <p className="text-sm text-vln-gray">Confirmation email sent</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-vln-gray hover:text-vln-white transition-colors"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Details */}
        <div className="space-y-4 mb-6">
          {/* Contact Info */}
          <div>
            <p className="text-xs font-semibold text-vln-sage uppercase tracking-wide mb-2">
              Contact Information
            </p>
            <div className="space-y-2">
              <p className="text-vln-white font-medium">
                {booking.firstName} {booking.lastName}
              </p>
              <div className="flex items-center gap-2 text-vln-gray text-sm">
                <Mail className="w-4 h-4 text-vln-sage flex-shrink-0" />
                {booking.email}
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-vln-bg/50 p-4 rounded-vln border border-vln-sage/10">
            <p className="text-xs font-semibold text-vln-sage uppercase tracking-wide mb-3">
              Appointment Details
            </p>
            <div className="space-y-3">
              {/* Type */}
              <div className="flex items-center gap-3">
                <MapPin
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    booking.appointmentType === "virtual"
                      ? "text-vln-bluegray"
                      : "text-vln-sage"
                  )}
                />
                <div>
                  <p className="text-xs text-vln-gray">Type</p>
                  <p className="text-vln-white font-medium capitalize">
                    {booking.appointmentType === "virtual"
                      ? "Virtual Meeting"
                      : "In-Person (Oakland, CA)"}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-vln-sage flex-shrink-0" />
                <div>
                  <p className="text-xs text-vln-gray">Date</p>
                  <p className="text-vln-white font-medium">
                    {formatDate(booking.date)}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-vln-sage flex-shrink-0" />
                <div>
                  <p className="text-xs text-vln-gray">Time</p>
                  <p className="text-vln-white font-medium">
                    {formatTime(booking.time)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes if present */}
          {booking.notes && (
            <div>
              <p className="text-xs font-semibold text-vln-sage uppercase tracking-wide mb-2">
                Additional Notes
              </p>
              <p className="text-sm text-vln-gray p-3 bg-vln-bg/50 rounded-vln border border-vln-sage/10">
                {booking.notes}
              </p>
            </div>
          )}
        </div>

        {/* Info Message */}
        <div className="bg-vln-bluegray/5 border border-vln-bluegray/20 rounded-vln p-4 mb-6">
          <p className="text-sm text-vln-gray">
            📧 A confirmation email has been sent to <strong>{booking.email}</strong>. Our team will reach out within 24 hours to confirm your appointment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => window.location.href = "mailto:info@vln.gg"}
            className="flex-1"
          >
            Contact Us
          </Button>
        </div>
      </Card>
    </div>
  );
}
