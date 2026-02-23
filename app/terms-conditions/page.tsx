"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";

interface Section {
  title: string;
  content: string;
}

interface TermsData {
  title: string;
  content?: string;
  sections?: Section[];
}

const FALLBACK_SECTIONS: Section[] = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using the services of Malankara Palace Lake View Resort & Spa, you agree to be bound by these Terms & Conditions. These terms apply to all visitors, guests, and others who access or use our services.",
  },
  {
    title: "Use of the Website",
    content:
      "Our website is intended to provide information about our resort and facilitate bookings. You agree not to use this site for any unlawful purpose or any purpose prohibited by these terms.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this website, including text, graphics, logos, images, and software, is the property of Malankara Palace or its content suppliers and is protected by international copyright laws.",
  },
  {
    title: "Guest Conduct",
    content:
      "Guests are expected to conduct themselves in a respectful manner towards other guests and staff. The management reserves the right to terminate the stay of any guest whose conduct is deemed incompatible with the resort's atmosphere.",
  },
  {
    title: "Liability Disclaimer",
    content:
      "Malankara Palace shall not be held liable for any loss, damage, or injury incurred by guests during their stay, unless such loss or damage is directly caused by the resort's gross negligence.",
  },
  {
    title: "Governing Law",
    content:
      "These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Idukki, Kerala.",
  },
];

export default function TermsConditionsPage() {
  const [pageData, setPageData] = useState<TermsData>({
    title: "Terms & Conditions",
    sections: FALLBACK_SECTIONS,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/terms-conditions");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setPageData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-white font-sarabun">
      <MetaSEO slug="terms-conditions" />
      <Header transparent />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] w-full flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop"
          alt="Malankara Palace Exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

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

      {/* TERMS & CONDITIONS CONTENT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-prata text-black mb-4">
              {pageData.title}
            </h2>
            <p className="text-black/60 text-sm mb-12">Last Modified: Jan 29</p>
          </div>
          {pageData.content && (
            <div className="max-w-4xl mb-12">
              <div
                className="prose prose-lg max-w-none text-black/80"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            </div>
          )}
          <div className="space-y-12 text-black/80 text-lg leading-relaxed">
            {(pageData.sections || FALLBACK_SECTIONS).map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-2xl font-prata text-black">
                  {section.title}
                </h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
