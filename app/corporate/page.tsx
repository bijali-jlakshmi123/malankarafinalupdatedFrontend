"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";

interface CorporateService {
  id: number;
  title: string;
  description: string;
  image: { url: string };
  order: number;
}

interface CorporatePageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: { url: string } | null;
  introTitle: string;
  introDescription: string;
}

const FALLBACK_SERVICES: CorporateService[] = [
  {
    id: 1,
    title: "Banquet Hall – Up to 60 Guests",
    description:
      "A well-appointed indoor hall suitable for meetings, conferences, presentations, and workshops. The space can be arranged in different seating styles to suit the nature and scale of the event.",
    image: {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    },
    order: 1,
  },
  {
    id: 2,
    title: "Outdoor Lakeside Lawn",
    description:
      "A scenic open-air venue by the lake, ideal for networking sessions, team activities, informal gatherings, and corporate get-togethers in a relaxed environment.",
    image: {
      url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
    },
    order: 2,
  },
  {
    id: 3,
    title: "Food & Beverages",
    description:
      "Thoughtfully curated food and beverage services offering a range of flavours to suit your celebration. From traditional favourites to customised menus, our culinary team ensures every meal is memorable and served with care.",
    image: {
      url: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
    },
    order: 3,
  },
  {
    id: 4,
    title: "Event Arrangements & Support",
    description:
      "End-to-end support for your corporate gatherings, including venue coordination, décor planning, guest arrangements, food and beverage management, and personalised assistance for a seamless experience.",
    image: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    },
    order: 4,
  },
];

const FALLBACK_PAGE: CorporatePageData = {
  heroTitle: "Business Gatherings by Nature",
  heroSubtitle:
    "A scenic setting for professional meetings and team engagements.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd058a54d?q=80&w=2069&auto=format&fit=crop",
  },
  introTitle: "A refreshing alternative to conventional meeting spaces.",
  introDescription:
    "A peaceful lakeside setting for focused meetings and meaningful corporate gatherings. At Malankara Palace Lake View Resort & Spa, corporate events move beyond conventional boardrooms. Surrounded by calm waters and open skies, the resort offers an environment that encourages clarity, collaboration, and fresh thinking – ideal for meetings, workshops, and corporate getaways.",
};

export default function CorporatePage() {
  const [pageData, setPageData] = useState<CorporatePageData>(FALLBACK_PAGE);
  const [services, setServices] =
    useState<CorporateService[]>(FALLBACK_SERVICES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pageRes, servicesRes] = await Promise.all([
          fetch("/api/corporate-page"),
          fetch("/api/corporate-services"),
        ]);

        if (pageRes.ok) {
          const data = await pageRes.json();
          if (data) setPageData(data);
        }

        if (servicesRes.ok) {
          const data = await servicesRes.json();
          if (Array.isArray(data) && data.length > 0) setServices(data);
        }
      } catch (error) {
        console.error("Error fetching corporate data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      <MetaSEO slug="corporate" />
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-end">
        <Image
          src={pageData.heroImage?.url || FALLBACK_PAGE.heroImage!.url}
          alt={pageData.heroTitle}
          fill
          className="object-cover"
          priority
        />
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
      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-prata text-secondary mb-8 leading-tight">
              {pageData.introTitle}
            </h2>
            <p className="text-text text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
              {pageData.introDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Venue Grid Section */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col">
                <div className="relative h-[400px] w-full mb-8 group overflow-hidden">
                  <Image
                    src={service.image.url}
                    alt={service.title}
                    fill
                    className="object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-3xl font-prata text-secondary mb-6 font-medium">
                  {service.title}
                </h3>
                <p className="text-text text-lg font-light leading-relaxed text-justify">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
