"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Experiences from "@/components/Experiences";
import MetaSEO from "@/components/MetaSEO";

interface ExperiencesPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: { url: string } | null;
  introTitle: string;
  introDescription: string;
  inHouseTitle: string;
  nearbyTitle: string;
  noteTitle: string;
  noteContent: string;
}

const FALLBACK_PAGE: ExperiencesPageData = {
  heroTitle: "Experiences Beyond the Stay",
  heroSubtitle:
    "Enjoy curated in-house activities and outdoor adventures that take you beyond the resort.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
  },
  introTitle: "Experiences by the Lake",
  introDescription:
    "Life at Malankara Palace flows gently with its surroundings, offering experiences that feel natural, peaceful, and deeply memorable.",
  inHouseTitle: "In-House Experiences",
  nearbyTitle: "Nearby Experiences",
  noteTitle: "Note:",
  noteContent:
    "Certain experiences are seasonal and subject to weather conditions. Nearby experiences like fish netting, boat safari, and cultural performances are arranged on request and offered on a prior-demand basis.",
};

export default function ExperiencesPage() {
  const [pageData, setPageData] = useState<ExperiencesPageData>(FALLBACK_PAGE);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const res = await fetch("/api/experiences-page");
        if (res.ok) {
          const data = await res.json();
          if (data) setPageData(data);
        }
      } catch (error) {
        console.error("Error fetching experiences page data:", error);
      }
    }
    fetchPageData();
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      <MetaSEO slug="experiences" />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-end font-sans">
        <Image
          src={
            pageData.heroImage?.url ||
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop"
          }
          alt={pageData.heroTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        {/* Overlay for text readability */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
              {pageData.heroTitle}
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              {pageData.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Experiences List */}
      <Experiences pageData={pageData} />

      <Footer />
    </main>
  );
}
