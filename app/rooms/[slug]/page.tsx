"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";
import Link from "next/link";

interface RoomImage {
  url: string;
}

interface Room {
  id: number;
  title: string;
  slug: string;
  heroSlogan: string;
  heroSubtext: string;
  description: string;
  image: RoomImage;
  gallery?: RoomImage[];
}

const FALLBACK_ROOMS: Room[] = [
  {
    id: 1,
    title: "The Lakeview Royal Suite",
    slug: "the-lakeview-royal-suite",
    heroSlogan: "Luxury living with a breathtaking 180° panoramic lake view.",
    heroSubtext:
      "A spacious luxury suite with a large private balcony offering uninterrupted 180° panoramic lake views and serene comfort.",
    description: "Luxury description...",
    image: {
      url: "https://images.unsplash.com/photo-1591088398332-6177805c7460?q=80&w=2070&auto=format&fit=crop",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
];

const POLICIES = [
  {
    title: "Reservation & Confirmation",
    content: [
      "All reservations are subject to availability at the time of booking.",
      "Bookings are confirmed only after receipt of advance payment or successful online payment confirmation.",
      "Guests must carry a valid government-issued photo ID at check-in.",
    ],
  },
  {
    title: "Check-In & Check-Out",
    content: [
      "Standard check-in time is 02:00 PM and check-out time is 11:00 AM.",
      "Early check-in or late check-out is subject to availability and may incur additional charges.",
      "The resort reserves the right to charge for late check-outs at its discretion.",
    ],
  },
  {
    title: "Occupancy Policy",
    content: [
      "Standard occupancy is two persons per room.",
      "Maximum of one extra bed can be provided in selected room categories at an additional cost.",
      "Children below 6 years stay complimentary without an extra bed.",
    ],
  },
  {
    title: "Payment Policy",
    content: [
      "Advance payment is required to guarantee the reservation.",
      "The resort accepts all major credit/debit cards, UPI, and bank transfers.",
      "Full payment must be settled at the time of check-in or as per the booking terms.",
    ],
  },
  {
    title: "Cancellation Policy",
    content: [
      "Cancellations made 15 days prior to arrival will receive a 100% refund.",
      "Cancellations made 7–14 days prior to arrival will receive a 50% refund.",
      "No refund will be provided for cancellations made less than 7 days prior to arrival.",
    ],
  },
  {
    title: "No-Show Policy",
    content: [
      "In case of a no-show, the full amount for the entire stay will be charged.",
      "The reservation will be held until 06:00 PM on the day of arrival, after which it may be released.",
    ],
  },
  {
    title: "Amendment Policy",
    content: [
      "Amendments to stay dates are subject to availability and rate differences.",
      "Amendments made close to the arrival date may be treated as cancellations.",
    ],
  },
  {
    title: "Force Majeure",
    content: [
      "The resort is not liable for failures to perform obligations due to events beyond its control (natural disasters, government restrictions, etc.).",
    ],
  },
  {
    title: "Management Rights",
    content: [
      "The management reserves the right of admission and the right to ask any guest to leave if they violate resort rules.",
      "Management reserves the right to amend policies without prior notice.",
    ],
  },
];

export default function RoomDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    async function fetchRoom() {
      const foundRoom = FALLBACK_ROOMS.find((r) => r.slug === slug);

      if (foundRoom) setRoom(foundRoom);

      setLoading(false);
    }

    fetchRoom();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!room) return null;

  return (
    <main className="relative min-h-screen bg-white font-sarabun">
      <MetaSEO slug={`rooms/${room.slug}`} />
      <Header transparent />
      {/* HERO SECTION (UNCHANGED) */}
      <section className="relative h-screen w-full flex items-end justify-start overflow-hidden">
        <Image
          src={room.image.url}
          alt={room.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-[68px] font-prata text-white mb-6 leading-[1.05] tracking-tight">
              {room.heroSlogan}
            </h1>

            <p className="text-base md:text-[20px] text-white/95 leading-relaxed max-w-2xl">
              {room.heroSubtext}
            </p>
          </div>
        </div>
      </section>
      {/* MAIN SECTION (LEFT & RIGHT SPACE ADDED HERE) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-6 md:mx-12 lg:mx-24">
            {/* LEFT SIDE */}

            <div className="flex flex-col">
              <h1 className="text-[48px] font-prata text-[#234958] mb-3 leading-tight tracking-tight">
                {room.title}
              </h1>

              <p className="text-[24px] font-prata font-medium text-black mb-10">
                A Panoramic Lakeview Luxury Experience
              </p>

              <div className="relative">
                <RoomImageSlider images={room.gallery || [room.image]} />
              </div>

              <div className="mt-12 space-y-8">
                <p className="text-[18px] text-[#4A4A4A] leading-[1.8] font-sarabun text-justify">
                  The Lakeview Royal Suite offers a refined luxury stay with a
                  breathtaking 180-degree panoramic view of the Illavizha
                  Poonchira Hills and the serene Malankara Lake. Designed for
                  guests who seek privacy, elegance, and uninterrupted scenic
                  beauty, this suite blends spacious interiors with nature-led
                  comfort.
                </p>

                <p className="text-[18px] text-[#4A4A4A] leading-[1.8] font-sarabun text-justify">
                  A huge private balcony overlooks the swimming pool and
                  landscaped gardens, creating the perfect setting to unwind
                  while staying connected to the surroundings. Large windows
                  allow abundant natural light throughout the day, while
                  evenings unfold with stunning sunset views that reflect
                  beautifully across the lake.
                </p>

                <p className="text-[18px] text-[#4A4A4A] leading-[1.8] font-sarabun text-justify">
                  Ideal for couples and luxury travellers, The Lakeview Royal
                  Suite is a space where calm mornings, golden evenings, and
                  thoughtful details define the stay experience.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col lg:pl-12">
              <div className="bg-[#f8f3d7] p-8 md:p-12 rounded-[4px] border border-[#F3E8C5]/30">
                {/* Room Details */}
                <h2 className="text-[32px] font-prata text-[#234958] mb-8">
                  Room Details
                </h2>
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="flex items-center gap-4 text-[#234958]">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                      <path d="M4 10V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                      <path d="M12 4v6" />
                      <path d="M2 18h20" />
                    </svg>
                    <span className="text-[16px] font-sarabun font-medium">
                      1 Large King Size Bed
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[#234958]">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m21 3-6.5 6.5" />
                      <path d="M19 10.5 10.5 19" />
                      <path d="M3 21l6.5-6.5" />
                      <path d="M14 5l1.5-1.5L21 3l6 6-1.5 1.5L21 9" />
                      <path d="m3 15 1.5 1.5L9 21l6-6-1.5-1.5L9 15" />
                    </svg>
                    <span className="text-[16px] font-sarabun font-medium">
                      750 sq.ft
                    </span>
                  </div>
                </div>

                {/* Room Amenities */}
                <h2 className="text-[32px] font-prata text-[#234958] mb-8">
                  Room Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  {[
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="20"
                            height="15"
                            x="2"
                            y="3"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 18h10" />
                          <path d="M10 22h4" />
                        </svg>
                      ),
                      text: "Smart LED TV with Hotstar & Netflix",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 15V8a4 4 0 0 0-4-4 4 4 0 0 0-4 4v7" />
                          <path d="M9 20h6" />
                          <path d="M5 15h14" />
                        </svg>
                      ),
                      text: "Comfortable Seating & Table",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                          <line x1="6" y1="1" x2="6" y2="4" />
                          <line x1="10" y1="1" x2="10" y2="4" />
                          <line x1="14" y1="1" x2="14" y2="4" />
                        </svg>
                      ),
                      text: "Tea/coffee station",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="14" height="20" x="5" y="2" rx="2" />
                          <line x1="5" y1="10" x2="19" y2="10" />
                          <path d="M9 14v2" />
                        </svg>
                      ),
                      text: "Mini Refrigerator",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="12" x="3" y="6" rx="2" />
                          <circle cx="12" cy="12" r="2" />
                          <line x1="12" y1="14" x2="12" y2="14" />
                        </svg>
                      ),
                      text: "Electronic Safe",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7z" />
                          <path d="M12 18h.01" />
                        </svg>
                      ),
                      text: "Premium Toiletries",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5s-3 3.5-3 5.5a7 7 0 0 0 7 7z" />
                        </svg>
                      ),
                      text: "Hot & Cold water",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="12" x="2" y="6" rx="2" />
                          <line x1="6" y1="12" x2="18" y2="12" />
                          <line x1="6" y1="15" x2="18" y2="15" />
                        </svg>
                      ),
                      text: "Air Conditioning",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 4v4" />
                          <path d="M21 21 H3" />
                          <path d="M18 11V18a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3z" />
                        </svg>
                      ),
                      text: "Iron & Ironing Board",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 14h.01" />
                          <path d="M10 14h.01" />
                          <path d="M14 14h.01" />
                          <path d="M18 14h.01" />
                          <rect width="18" height="10" x="3" y="11" rx="2" />
                          <path d="M8 11V7l4-4 4 4v4" />
                        </svg>
                      ),
                      text: "Electric kettle",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 12h18" />
                          <path d="M12 3v18" />
                        </svg>
                      ),
                      text: "Private Balcony",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      ),
                      text: "Intercom",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 7h1v10H3z" />
                          <path d="M7 7h12a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H7" />
                          <path d="M16 17v2" />
                          <path d="M12 17v2" />
                        </svg>
                      ),
                      text: "Hair Dryer",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="1" />
                        </svg>
                      ),
                      text: "Door peephole",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 text-[#234958]"
                    >
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-[15px] font-sarabun text-[#4A4A4A] leading-tight">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Resort Amenities */}
                <h2 className="text-[32px] font-prata text-[#234958] mt-16 mb-8">
                  Resort Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-12">
                  {[
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5Z" />
                          <path d="M12 21a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6Z" />
                        </svg>
                      ),
                      text: "Infinity Pool",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 15a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6Z" />
                        </svg>
                      ),
                      text: "Kids Pool",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                          <circle cx="12" cy="20" r="1" />
                        </svg>
                      ),
                      text: "High-Speed WI-FI",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                      ),
                      text: "24/7 Front Desk",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 15h18l-2.04-1.71A4 4 0 0 0 16.3 12H7.7a4 4 0 0 0-2.66 1.29L3 15Z" />
                          <path d="M12 12V5" />
                          <path d="M9 5h6" />
                        </svg>
                      ),
                      text: "Room Service",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 10c4.42 0 8-3.58 8-8" />
                          <path d="M20 10c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8" />
                          <path d="M4 10c-4.42 0-8-3.58-8-8" />
                          <path d="M12 18c0 4.42 3.58 8 8 8s8-3.58 8-8" />
                        </svg>
                      ),
                      text: "Wellness Spa",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11.8 3.1c1.2-1.2 3.1-1.2 4.3 0s1.2 3.1 0 4.3l-8.6 8.6c-1.2 1.2-3.1 1.2-4.3 0s-1.2-3.1 0-4.3l8.6-8.6Z" />
                          <path d="M13 13h4" />
                          <path d="M13 17h4" />
                          <path d="M13 21h4" />
                        </svg>
                      ),
                      text: "Indoor Games",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2v20" />
                          <path d="M2 12h14" />
                          <path d="M2 2v10" />
                          <path d="M2 22h14" />
                          <line x1="18" y1="12" x2="22" y2="12" />
                          <line x1="18" y1="2" x2="22" y2="2" />
                        </svg>
                      ),
                      text: "Multi-Cuisine Restaurant",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7Z" />
                        </svg>
                      ),
                      text: "Outdoor Games",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                          <path d="M15 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                          <path d="M3 13v-3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3" />
                          <path d="M12 2v7" />
                          <path d="M8 5h8" />
                        </svg>
                      ),
                      text: "Kids Play Area",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="7" cy="17" r="2" />
                          <circle cx="17" cy="17" r="2" />
                          <path d="M5 17h-2v-4l2-8h11l4 7v5h-2" />
                          <path d="M15 17h-6" />
                          <path d="M13 5v8h7" />
                        </svg>
                      ),
                      text: "Pick-up & Drop",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      ),
                      text: "CCTV Surveillance",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
                      ),
                      text: "Laundry Services",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                        </svg>
                      ),
                      text: "Parking Area",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 text-[#234958]"
                    >
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-[15px] font-sarabun text-[#4A4A4A] leading-tight">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="#"
                  className="inline-flex items-center gap-3 bg-[#A43493] text-white px-8 py-4 rounded-[4px] font-sarabun font-semibold tracking-wide hover:bg-[#8e2d7f] transition-all duration-300 group"
                >
                  BOOK NOW
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* BOOKING POLICY SECTION */}
      <section className="py-24 bg-[#fbfbfa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start mx-6 md:mx-12 lg:mx-24">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-3/5">
              <h2 className="text-4xl md:text-5xl font-prata text-black mb-12">
                Booking Policies & Stay Information
              </h2>

              <div className="divide-y bg-[#fbfbfa] border-t border-b border-gray-200 ">
                {POLICIES.map((policy, index) => (
                  <div key={policy.title} className="py-5 bg-[#fbfbfa]">
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className="w-full flex items-center justify-between text-left group bg-[#fbfbfa] hover:bg-[#fbfbfa] focus:bg-[#fbfbfa] active:bg-[#fbfbfa]"
                    >
                      <span
                        className={`text-xl transition-colors ${
                          openIndex === index
                            ? "text-black font-semibold"
                            : "text-black/80 group-hover:text-black"
                        }`}
                      >
                        {policy.title}
                      </span>

                      <svg
                        className={`w-5 h-5 text-black transform transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index
                          ? "max-h-96 opacity-100 mt-6"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-4 pl-0">
                        {policy.content.map((item, i) => (
                          <li
                            key={i}
                            className="text-black/70 text-[17px] leading-relaxed flex items-start gap-3"
                          >
                            <span className="text-black mt-1.5 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="w-full lg:w-2/5 relative h-[550px] lg:h-[750px]">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
                alt="Stay Information"
                fill
                className="object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function RoomImageSlider({ images }: { images: { url: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[4/3] overflow-hidden group">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative min-w-full h-full">
              <Image src={img.url} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white text-3xl bg-black/30 hover:bg-black/50 px-3 py-2 rounded-full"
        >
          ‹
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white text-3xl bg-black/30 hover:bg-black/50 px-3 py-2 rounded-full"
        >
          ›
        </button>
      </div>

      {/* 6 Pagination DOTS */}

      <div className="flex justify-center items-center gap-2 mt-6">
        {Array.from({ length: Math.min(6, images.length) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "bg-gray-800 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
