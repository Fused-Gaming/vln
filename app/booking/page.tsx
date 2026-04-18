import type { Metadata } from "next";
import BookingContent from "./BookingContent";

export const metadata: Metadata = {
  title: "Book a Consultation | VLN Security",
  description:
    "Schedule a free 30-minute consultation with VLN security experts. Book your smart contract audit or Web3 security assessment today.",
  keywords: [
    "book consultation",
    "schedule audit",
    "security consultation booking",
    "smart contract audit appointment",
  ],
  alternates: {
    canonical: "https://vln.gg/booking",
  },
  openGraph: {
    title: "Book a Consultation | VLN Security",
    description:
      "Schedule a free 30-minute consultation with VLN security experts.",
    url: "https://vln.gg/booking",
  },
};

export default function BookingPage() {
  return <BookingContent />;
}
