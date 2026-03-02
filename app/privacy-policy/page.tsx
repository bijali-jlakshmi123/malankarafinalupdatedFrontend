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

interface PrivacyData {
  title: string;
  heroTitle?: string;
  heroSubtitle?: string;
  content?: string;
  sections?: Section[];
  image?: { url: string } | null;
  updatedAt?: string;
}

const FALLBACK_SECTIONS: Section[] = [
  {
    title: "Information Collection",
    content:
      "We collect information you provide directly to us, such as when you make a reservation, sign up for our newsletter, or contact us for support. This personal information may include your name, email address, phone number, and payment information.",
  },
  {
    title: "Use of Information",
    content:
      "We use the information we collect to provide, maintain, and improve our services, including processing your reservations, sending you confirmations and invoices, and communicating with you about your stay.",
  },
  {
    title: "Data Security",
    content:
      "We implement robust security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet is 100% secure.",
  },
  {
    title: "Cookies and Tracking",
    content:
      "Our website uses cookies and similar tracking technologies to enhance your browsing experience, personalize content, and analyze our site traffic. You can choose to disable cookies through your browser settings, though this may affect site functionality.",
  },
  {
    title: "Third-Party Disclosure",
    content:
      "We do not sell or trade your personal information to outside parties. We may share information with trusted third-party service providers who assist us in operating our resort and website, so long as those parties agree to keep this information confidential.",
  },
  {
    title: "Updates to This Policy",
    content:
      "Malankara Palace reserves the right to update this privacy policy at any time. We will notify you of any significant changes by posting the new policy on this page and updating the modification date above.",
  },
];

export default function PrivacyPolicyPage() {
  const [pageData, setPageData] = useState<PrivacyData>({
    title: "Privacy Policy",
    heroTitle: "Privacy Policy",
    heroSubtitle:
      "Your privacy and security are our top priorities at Malankara Palace",
    sections: FALLBACK_SECTIONS,
    image: { url: "/images/hero-1.jpg" },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/privacy-policy");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setPageData({
              title: data.title || "Privacy Policy",
              heroTitle: data.heroTitle || "Privacy Policy",
              heroSubtitle:
                data.heroSubtitle ||
                "Your privacy and security are our top priorities at Malankara Palace",
              sections: data.sections || FALLBACK_SECTIONS,
              content: data.content,
              image: data.image || { url: "/images/hero-1.jpg" },
              updatedAt: data.updatedAt,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "March 2026";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="relative min-h-screen bg-white font-body selection:bg-primary/10 selection:text-primary">
      <MetaSEO slug="privacy-policy" />

      {/* HEADER */}
      <Header transparent />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] w-full flex items-end">
        <Image
          src={pageData.image?.url || "/images/hero-1.jpg"}
          alt="Malankara Palace Privacy Policy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-[56px] font-primary text-white mb-6 drop-shadow-lg leading-tight uppercase">
              {pageData.heroTitle}
            </h1>
            <p className="text-lg md:text-2xl text-white/95 font-light drop-shadow-md">
              {pageData.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-[40px] font-primary text-secondary mb-4">
              {pageData.title}
            </h2>
            <p className="text-text/60 text-sm mb-12">
              Last Modified: {formatDate(pageData.updatedAt)}
            </p>
          </div>

          {pageData.content && (
            <div className="max-w-4xl mb-12">
              <div
                className="prose prose-lg max-w-none text-text/80"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            </div>
          )}

          <div className="space-y-12 text-text/80 text-lg leading-relaxed">
            {pageData.sections?.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-3xl font-primary text-secondary">
                  {section.title}
                </h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
