"use client";

import { useState, useRef, useEffect, ReactElement } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  excludeDates?: string[];
  excludeWeekends?: boolean;
}

function formatDateForComparison(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  excludeDates = [],
  excludeWeekends = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth()));
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateStr = formatDateForComparison(date);

    // Check if date is in excluded dates
    if (excludeDates.includes(dateStr)) return true;

    // Check if weekend
    if (excludeWeekends && (date.getDay() === 0 || date.getDay() === 6)) return true;

    // Check min/max date
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;

    return false;
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(selectedDate)) {
      onChange(formatDateForComparison(selectedDate));
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: ReactElement[] = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Days of month
    const selectedDate = value ? new Date(value) : null;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate && isSameDay(selectedDate, date);
      const isDisabled = isDateDisabled(date);
      const isToday = isSameDay(date, new Date());

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={cn(
            "p-2 text-sm font-medium rounded transition-all",
            isDisabled ? "text-vln-gray-dark opacity-40 cursor-not-allowed" : "",
            isSelected
              ? "bg-vln-sage text-vln-bg hover:bg-vln-sage-light"
              : isToday
                ? "border-2 border-vln-sage text-vln-sage"
                : "text-vln-white hover:bg-vln-bg-lighter"
          )}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const selectedDate = value ? new Date(value) : null;
  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 bg-vln-bg-light border-2 rounded-vln text-vln-white text-left transition-all",
          isOpen ? "border-vln-sage" : "border-vln-sage/20 hover:border-vln-sage/40"
        )}
      >
        {selectedDate ? selectedDate.toLocaleDateString("en-US") : "Select a date"}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-vln-bg-light border-2 border-vln-sage rounded-vln p-4 z-50 shadow-lg">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-vln-bg-lighter rounded transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-vln-sage" />
            </button>
            <h3 className="text-vln-white font-semibold text-center flex-1">{monthName}</h3>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-vln-bg-lighter rounded transition-all"
            >
              <ChevronRight className="w-5 h-5 text-vln-sage" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-vln-gray uppercase">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

          {/* Helper text */}
          <p className="text-xs text-vln-gray mt-3 text-center">Monday–Friday, excluding federal holidays</p>
        </div>
      )}
    </div>
  );
}

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  startHour?: number;
  endHour?: number;
  step?: number; // in minutes
}

export function TimePicker({
  value,
  onChange,
  startHour = 11,
  endHour = 18,
  step = 30,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        slots.push(timeStr);
      }
    }
    return slots;
  };

  const formatTimeDisplay = (time: string): string => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 bg-vln-bg-light border-2 rounded-vln text-vln-white text-left transition-all flex items-center gap-2",
          isOpen ? "border-vln-sage" : "border-vln-sage/20 hover:border-vln-sage/40"
        )}
      >
        <Clock className="w-4 h-4 text-vln-sage flex-shrink-0" />
        {value ? formatTimeDisplay(value) : "Select a time"}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-vln-bg-light border-2 border-vln-sage rounded-vln z-50 shadow-lg">
          {/* Desktop: Grid, Mobile: Scrollable */}
          <div className="max-h-64 overflow-y-auto">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 p-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    onChange(time);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2 py-2 rounded text-sm font-medium transition-all",
                    value === time
                      ? "bg-vln-sage text-vln-bg"
                      : "text-vln-white hover:bg-vln-bg-lighter"
                  )}
                >
                  {formatTimeDisplay(time)}
                </button>
              ))}
            </div>
          </div>

          {/* Helper text */}
          <p className="text-xs text-vln-gray p-3 pt-0 text-center">11:00 AM – 6:00 PM PT</p>
        </div>
      )}
    </div>
  );
}
