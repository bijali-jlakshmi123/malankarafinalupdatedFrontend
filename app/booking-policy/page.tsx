"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";

interface Policy {
  title: string;
  content: string[];
}

interface BookingPolicyData {
  title: string;
  policies: Policy[];
  image: { url: string } | null;
}

const FALLBACK_POLICIES: Policy[] = [
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

export default function BookingPolicyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [pageData, setPageData] = useState<BookingPolicyData>({
    title: "Booking Policies & Stay Information",
    policies: FALLBACK_POLICIES,
    image: {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/booking-policy");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setPageData({
              title: data.title || pageData.title,
              policies: data.policies || FALLBACK_POLICIES,
              image: data.image || pageData.image,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching booking policy:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-white font-sarabun">
      <MetaSEO slug="booking-policy" />

      <Header transparent />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] w-full flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
          alt="Malankara Palace Reception"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-7xl font-prata text-white mb-6 drop-shadow-lg">
              A Tranquil Lakeside Escape at Malankara Palace
            </h1>

            <p className="text-lg md:text-2xl text-white/95 font-light drop-shadow-md">
              Wake up to calm waters, gentle breezes, and unforgettable moments
              by Malankara Dam.
            </p>
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
                {pageData.title}
              </h2>

              <div className="divide-y bg-[#fbfbfa] border-t border-b border-gray-200 ">
                {pageData.policies.map((policy, index) => (
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
                src={
                  pageData.image?.url ||
                  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
                }
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
