"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Video, Mail, User, AlertCircle, CheckCircle } from "lucide-react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Federal holidays in 2024-2025
const FEDERAL_HOLIDAYS = [
  "2024-01-01", // New Year's Day
  "2024-01-15", // MLK Day
  "2024-02-19", // Presidents Day
  "2024-03-29", // Good Friday
  "2024-05-27", // Memorial Day
  "2024-06-19", // Juneteenth
  "2024-07-04", // Independence Day
  "2024-09-02", // Labor Day
  "2024-10-14", // Columbus Day
  "2024-11-11", // Veterans Day
  "2024-11-28", // Thanksgiving
  "2024-12-25", // Christmas
  "2025-01-01", // New Year's Day
  "2025-01-20", // MLK Day (observed)
  "2025-02-17", // Presidents Day
  "2025-04-18", // Good Friday
  "2025-05-26", // Memorial Day
  "2025-06-19", // Juneteenth
  "2025-07-04", // Independence Day
  "2025-09-01", // Labor Day
  "2025-10-13", // Columbus Day
  "2025-11-11", // Veterans Day
  "2025-11-27", // Thanksgiving
  "2025-12-25", // Christmas
];

interface FormData {
  appointmentType: "virtual" | "in-person";
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  time: string;
  notes: string;
}

interface FormError {
  field: string;
  message: string;
}

function isFederalHoliday(date: string): boolean {
  return FEDERAL_HOLIDAYS.includes(date);
}

function isBusinessDay(date: Date): boolean {
  const dayOfWeek = date.getDay();
  // 0 = Sunday, 6 = Saturday
  return dayOfWeek !== 0 && dayOfWeek !== 6;
}

function formatDateForComparison(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getAvailableTimeSlots(): string[] {
  // Business hours: 11:00 AM - 6:00 PM
  const slots: string[] = [];
  for (let hour = 11; hour < 18; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;

  // Must be in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return false;

  // Must be a business day
  if (!isBusinessDay(date)) return false;

  // Must not be a federal holiday
  if (isFederalHoliday(formatDateForComparison(date))) return false;

  return true;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    appointmentType: "virtual",
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormError[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];

    if (!formData.firstName.trim()) {
      newErrors.push({ field: "firstName", message: "First name is required" });
    }

    if (!formData.lastName.trim()) {
      newErrors.push({ field: "lastName", message: "Last name is required" });
    }

    if (!formData.email.trim()) {
      newErrors.push({ field: "email", message: "Email is required" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push({ field: "email", message: "Please enter a valid email address" });
    }

    if (!formData.date) {
      newErrors.push({ field: "date", message: "Please select a date" });
    } else if (!isValidDate(formData.date)) {
      newErrors.push({
        field: "date",
        message: "Please select a valid business day (Monday-Friday, excluding federal holidays)",
      });
    }

    if (!formData.time) {
      newErrors.push({ field: "time", message: "Please select a time" });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Connect to your booking API endpoint
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking request");
      }

      setSubmitted(true);
      setFormData({
        appointmentType: "virtual",
        firstName: "",
        lastName: "",
        email: "",
        date: "",
        time: "",
        notes: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setErrors([{ field: "submit", message: "Failed to submit booking. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (field: string): string | undefined => {
    return errors.find((e) => e.field === field)?.message;
  };

  const timeSlots = getAvailableTimeSlots();
  const today = new Date();
  today.setDate(today.getDate() + 1); // Start from tomorrow
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90); // 90 days in advance
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <div className="w-full">
      {submitted && (
        <Card className="mb-6 bg-vln-sage/10 border-vln-sage/30">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-vln-sage mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-vln-white mb-1">Booking Request Submitted</h3>
              <p className="text-sm text-vln-gray">
                We&apos;ve received your appointment request. We&apos;ll confirm your booking within 24 hours via email.
              </p>
            </div>
          </div>
        </Card>
      )}

      {errors.some((e) => e.field === "submit") && (
        <Card className="mb-6 bg-red-500/10 border-red-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-red-200">{errors.find((e) => e.field === "submit")?.message}</p>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Appointment Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-vln-white mb-3">Appointment Type</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, appointmentType: "virtual" })}
              className={cn(
                "p-4 rounded-vln border-2 transition-all",
                formData.appointmentType === "virtual"
                  ? "border-vln-sage bg-vln-sage/10"
                  : "border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <Video className={cn("w-5 h-5", formData.appointmentType === "virtual" ? "text-vln-sage" : "text-vln-gray")} />
                <span className={cn("font-semibold", formData.appointmentType === "virtual" ? "text-vln-white" : "text-vln-gray")}>
                  Virtual
                </span>
              </div>
              <p className="text-xs text-vln-gray">Video meeting</p>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, appointmentType: "in-person" })}
              className={cn(
                "p-4 rounded-vln border-2 transition-all",
                formData.appointmentType === "in-person"
                  ? "border-vln-bluegray bg-vln-bluegray/10"
                  : "border-vln-sage/20 bg-vln-bg-light hover:border-vln-sage/40"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin
                  className={cn("w-5 h-5", formData.appointmentType === "in-person" ? "text-vln-bluegray" : "text-vln-gray")}
                />
                <span className={cn("font-semibold", formData.appointmentType === "in-person" ? "text-vln-white" : "text-vln-gray")}>
                  In-Person
                </span>
              </div>
              <p className="text-xs text-vln-gray">Oakland, CA</p>
            </button>
          </div>
        </div>

        {/* In-Person Location Info */}
        {formData.appointmentType === "in-person" && (
          <Card className="bg-vln-bluegray/5 border-vln-bluegray/30">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-vln-bluegray mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-vln-white mb-1">Meeting Location</h3>
                <p className="text-sm text-vln-gray">150 4th Street, Oakland, CA</p>
              </div>
            </div>
          </Card>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-vln-white mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vln-sage pointer-events-none" />
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-vln-bg-light border-2 rounded-vln text-vln-white placeholder-vln-gray-dark transition-all",
                  getErrorMessage("firstName")
                    ? "border-red-500 focus:border-red-500"
                    : "border-vln-sage/20 focus:border-vln-sage"
                )}
                placeholder="John"
              />
            </div>
            {getErrorMessage("firstName") && <p className="text-xs text-red-500 mt-1">{getErrorMessage("firstName")}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-vln-white mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vln-sage pointer-events-none" />
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-vln-bg-light border-2 rounded-vln text-vln-white placeholder-vln-gray-dark transition-all",
                  getErrorMessage("lastName")
                    ? "border-red-500 focus:border-red-500"
                    : "border-vln-sage/20 focus:border-vln-sage"
                )}
                placeholder="Doe"
              />
            </div>
            {getErrorMessage("lastName") && <p className="text-xs text-red-500 mt-1">{getErrorMessage("lastName")}</p>}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-vln-white mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vln-sage pointer-events-none" />
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={cn(
                "w-full pl-10 pr-4 py-3 bg-vln-bg-light border-2 rounded-vln text-vln-white placeholder-vln-gray-dark transition-all",
                getErrorMessage("email")
                  ? "border-red-500 focus:border-red-500"
                  : "border-vln-sage/20 focus:border-vln-sage"
              )}
              placeholder="john@example.com"
            />
          </div>
          {getErrorMessage("email") && <p className="text-xs text-red-500 mt-1">{getErrorMessage("email")}</p>}
        </div>

        {/* Date and Time Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-vln-white mb-2">
              Preferred Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vln-sage pointer-events-none" />
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={minDate}
                max={maxDateStr}
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-vln-bg-light border-2 rounded-vln text-vln-white placeholder-vln-gray-dark transition-all",
                  getErrorMessage("date")
                    ? "border-red-500 focus:border-red-500"
                    : "border-vln-sage/20 focus:border-vln-sage"
                )}
              />
            </div>
            {getErrorMessage("date") && <p className="text-xs text-red-500 mt-1">{getErrorMessage("date")}</p>}
            <p className="text-xs text-vln-gray mt-2">Monday–Friday, excluding federal holidays</p>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-semibold text-vln-white mb-2">
              Preferred Time *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vln-sage pointer-events-none" />
              <select
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-vln-bg-light border-2 rounded-vln text-vln-white transition-all appearance-none",
                  getErrorMessage("time")
                    ? "border-red-500 focus:border-red-500"
                    : "border-vln-sage/20 focus:border-vln-sage"
                )}
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            {getErrorMessage("time") && <p className="text-xs text-red-500 mt-1">{getErrorMessage("time")}</p>}
            <p className="text-xs text-vln-gray mt-2">11:00 AM – 6:00 PM PT</p>
          </div>
        </div>

        {/* Notes Field */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-vln-white mb-2">
            Meeting Details (Optional)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Tell us about your project, security concerns, or what you'd like to discuss..."
            className="w-full px-4 py-3 bg-vln-bg-light border-2 border-vln-sage/20 rounded-vln text-vln-white placeholder-vln-gray-dark transition-all focus:border-vln-sage resize-none"
            rows={4}
          />
          <p className="text-xs text-vln-gray mt-2">Include project details to help us prepare for your consultation</p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            Schedule Appointment
          </Button>
        </div>

        {/* Form Info */}
        <p className="text-xs text-vln-gray text-center">
          We&apos;ll send a confirmation email with meeting details and any necessary links or access information.
        </p>
      </form>
    </div>
  );
}
