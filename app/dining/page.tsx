"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";

interface DiningSection {
  id: number;
  title: string;
  description1: string;
  description2?: string;
  image: { url: string };
  imagePosition: "left" | "right";
  checklistItems?: string[];
  order: number;
}

interface DiningPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: { url: string } | null;
  introTitle: string;
  introDescription: string;
}

const FALLBACK_SECTIONS: DiningSection[] = [
  {
    id: 1,
    title: "Multi-Cuisine Restaurant",
    description1:
      "Our multi-cuisine restaurant offers a diverse selection of dishes prepared with care and balanced flavours. The menu brings together regional favourites, Indian classics, and popular international selections to suit varied tastes and preferences.",
    description2:
      "Whether it is a relaxed breakfast, a leisurely lunch, or a refined dinner, the dining space is designed to feel open, comfortable, and welcoming.",
    image: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    },
    imagePosition: "right",
    checklistItems: [
      "Multi-cuisine menu",
      "Freshly prepared dishes",
      "Regional and Indian specialities",
      "Family-friendly dining environment",
    ],
    order: 1,
  },
  {
    id: 2,
    title: "Poolside Dining Experience",
    description1:
      "Enjoy meals in a relaxed open setting beside the pool, where fresh air and scenic surroundings add to the experience. Poolside dining is ideal for slow evenings, small gatherings, and informal celebration meals.",
    description2:
      "The setting works especially well for sunset hours and post-evening relaxation.",
    image: {
      url: "https://images.unsplash.com/photo-1572331165267-854da2b00ca1?q=80&w=2070&auto=format&fit=crop",
    },
    imagePosition: "left",
    checklistItems: [
      "Open-air dining ambience",
      "Ideal for evening meals",
      "Suitable for small groups",
      "Scenic and relaxed setting",
    ],
    order: 2,
  },
  {
    id: 3,
    title: "Candle Light Dining",
    description1:
      "For special moments and intimate occasions, candle light dining experiences can be arranged in select scenic locations within the property. Soft lighting, curated menus, and personalised setup create a warm and comprehensive atmosphere.",
    description2: "Ideal for couples, anniversaries, and celebration evenings.",
    image: {
      url: "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=2070&auto=format&fit=crop",
    },
    imagePosition: "right",
    checklistItems: [
      "Romantic private setups",
      "Curated dining menus",
      "Scenic seating locations",
      "Advance request required",
    ],
    order: 3,
  },
  {
    id: 4,
    title: "Live Barbecue Experience",
    description1:
      "Live barbecue setups add a lively and interactive element to your dining experience. Freshly grilled selections prepared on-site create a casual and engaging food atmosphere for evenings and group gatherings.",
    image: {
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    },
    imagePosition: "left",
    checklistItems: [
      "Live grill stations",
      "Barbecue evenings",
      "Group-friendly format",
      "Available on request / select days",
    ],
    order: 4,
  },
  {
    id: 5,
    title: "Coffee Shop & Reading Corner",
    description1:
      "A relaxed coffee space with a quiet reading corner offers a calm setting for light bites and beverages. Ideal for slow mornings, afternoon breaks, or peaceful evening time with a book.",
    image: {
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop",
    },
    imagePosition: "right",
    checklistItems: [
      "Coffee and beverages",
      "Light snacks",
      "Library & reading corner",
      "Quiet indoor ambience",
    ],
    order: 5,
  },
  {
    id: 6,
    title: "In-Room Dining",
    description1:
      "Guests can enjoy select menu items in the comfort and privacy of their rooms. In-room dining is available based on menu and operational hours.",
    image: {
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
    },
    imagePosition: "left",
    checklistItems: [
      "Room service dining",
      "Comfort and privacy",
      "Available as per menu & timing",
    ],
    order: 6,
  },
  {
    id: 7,
    title: "Dining for Celebrations",
    description1:
      "Special dining arrangements can be created for celebrations, private gatherings, and event groups. Menus and formats can be customised based on the occasion and guest preferences.",
    image: {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    },
    imagePosition: "right",
    checklistItems: [
      "Celebration menus",
      "Group dining setups",
      "Event catering support",
      "Custom menu planning",
    ],
    order: 7,
  },
];

const FALLBACK_PAGE: DiningPageData = {
  heroTitle: "Where Taste Meets Tranquility",
  heroSubtitle: "Savour curated flavours in calm, view-filled dining spaces.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop",
  },
  introTitle: "Dining by the Lake",
  introDescription:
    "Dining here is designed to be more than just a meal — it is an experience shaped by setting, mood, and flavour. With scenic views, relaxed seating, and thoughtfully prepared dishes, every dining moment is meant to be enjoyed slowly. From casual meals to curated celebration dinners, the atmosphere blends comfort with quiet elegance.",
};

export default function DiningPage() {
  const [pageData, setPageData] = useState<DiningPageData>(FALLBACK_PAGE);
  const [sections, setSections] = useState<DiningSection[]>(FALLBACK_SECTIONS);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pageRes, sectionsRes] = await Promise.all([
          fetch("/api/dining-page"),
          fetch("/api/dining-sections"),
        ]);

        if (pageRes.ok) {
          const data = await pageRes.json();
          if (data) setPageData(data);
        }

        if (sectionsRes.ok) {
          const data = await sectionsRes.json();
          if (Array.isArray(data) && data.length > 0) setSections(data);
        }
      } catch (error) {
        console.error("Error fetching dining page data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      <MetaSEO slug="dining" />
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end font-sarabun">
        <Image
          src={
            pageData.heroImage?.url ||
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
          }
          alt="Malankara Palace Dining"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-prata text-white mb-6 leading-tight">
              {pageData.heroTitle}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed">
              {pageData.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Dining Introduction & Dining Sections */}
      <section className="py-20 bg-white font-sarabun">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-prata text-secondary mb-6 font-medium">
              {pageData.introTitle}
            </h2>
            <p className="text-text text-lg md:text-xl font-light leading-relaxed">
              {pageData.introDescription}
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {sections.map((section) => (
              <div key={section.id} className="grid grid-cols-1 lg:grid-cols-2">
                {/* Content */}
                <div
                  className={`bg-[#f9f7f2] p-10 lg:p-16 flex flex-col justify-center ${
                    section.imagePosition === "right"
                      ? "order-last lg:order-first"
                      : "order-last"
                  }`}
                >
                  <h3 className="text-3xl md:text-4xl font-prata text-secondary mb-6 font-medium">
                    {section.title}
                  </h3>
                  <p className="text-text text-lg font-light leading-relaxed mb-6">
                    {section.description1}
                  </p>
                  {section.description2 && (
                    <p className="text-text text-lg font-light leading-relaxed mb-8">
                      {section.description2}
                    </p>
                  )}

                  {section.checklistItems &&
                    section.checklistItems.length > 0 && (
                      <ul className="space-y-3">
                        {section.checklistItems.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-primary text-xl">•</span>
                            <span className="text-text text-lg font-light">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>

                {/* Image */}
                <div
                  className={`relative h-[400px] lg:h-auto w-full ${
                    section.imagePosition === "right"
                      ? "order-first lg:order-last"
                      : "order-first"
                  }`}
                >
                  <Image
                    src={section.image.url}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
