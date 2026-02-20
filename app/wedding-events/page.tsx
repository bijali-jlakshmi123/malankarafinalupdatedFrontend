"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";

interface WeddingEvent {
  id: number;
  title: string;
  description: string;
  image: { url: string };
  order: number;
}

interface WeddingEventsPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: { url: string } | null;
  introTitle: string;
  introSubtitle: string;
  introDescription1: string;
  introDescription2: string;
  parallaxImage: { url: string } | null;
  parallaxTitle: string;
  settingsTitle: string;
  settingsDescription: string;
}

const FALLBACK_EVENTS: WeddingEvent[] = [
  {
    id: 1,
    title: "Banquet Hall – Up to 60 Guests",
    description:
      "Our elegantly designed banquet hall offers a refined indoor setting for intimate weddings, receptions, and pre-wedding celebrations. With tasteful interiors and a calm ambience, the space can be customised to suit different themes and functions.",
    image: {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    },
    order: 1,
  },
  {
    id: 2,
    title: "Outdoor Lakeside Lawn",
    description:
      "A spacious open-air lawn by the lake, perfect for customised wedding décor, mandaps, floral arrangements, and evening celebrations under open skies. The lakeside setting creates a naturally stunning backdrop for ceremonies and photo moments.",
    image: {
      url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
    },
    order: 2,
  },
  {
    id: 3,
    title: "Open Lounge & Event Space – 250 Guests",
    description:
      "A spacious open event area suited for larger gatherings, receptions, and celebration parties with flexible seating and open dining arrangements.",
    image: {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    },
    order: 3,
  },
  {
    id: 4,
    title: "Food & Beverages",
    description:
      "Thoughtfully curated food and beverage services offering a range of flavours to suit your celebration. From traditional favourites to customised menus, our culinary team ensures every meal is memorable and served with care.",
    image: {
      url: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
    },
    order: 4,
  },
  {
    id: 5,
    title: "Destination Wedding Arrangements",
    description:
      "End-to-end support for destination weddings, including venue coordination, décor planning, guest arrangements, food and beverage management, and personalised assistance for a seamless experience.",
    image: {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    },
    order: 5,
  },
  {
    id: 6,
    title: "Event Planning",
    description:
      "Our experienced hospitality team works closely with you to understand your vision and ensure smooth coordination throughout the event. From planning and setup to guest comfort and service, every detail is handled with care, allowing you to enjoy your celebration without stress.",
    image: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    },
    order: 6,
  },
  {
    id: 7,
    title: "Bespoke Décor & Design",
    description:
      "Décor and styling are thoughtfully customised to suit each event and celebration. From floral arrangements to lighting and themed setups, every detail is planned to complement the venue and the occasion.",
    image: {
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop",
    },
    order: 7,
  },
];

const FALLBACK_PAGE: WeddingEventsPageData = {
  heroTitle: "Where Moments Become Memories",
  heroSubtitle:
    "A serene lakeside venue for destination weddings, celebrations, and special gatherings.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop",
  },
  introTitle: "Weddings & Events",
  introSubtitle: "Celebrate Life’s Most Important Moments by the Lake",
  introDescription1:
    "Host your special occasions in a scenic lakeside setting where open skies, calm waters, and elegant spaces create a naturally memorable backdrop. From intimate wedding ceremonies to grand social celebrations and private gatherings, every event here is shaped with thoughtful planning and personalised attention.",
  introDescription2:
    "With flexible indoor and outdoor venues, custom décor options, and curated dining experiences, each celebration is designed to reflect your style while ensuring guest comfort and seamless coordination.",
  parallaxImage: {
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
  },
  parallaxTitle: "A celebration of love in nature’s paradise",
  settingsTitle: "A Setting Made for Celebrations",
  settingsDescription:
    "Whether you envision a lakeside ceremony adorned with floral décor or an elegant indoor gathering with close family and friends, our venues provide the perfect backdrop for your special day. Surrounded by peaceful views and scenic natural beauty, every celebration feels elevated and memorable. We host a wide range of occasions including destination weddings, pre-wedding functions, haldi and engagement ceremonies, wedding receptions, and anniversary celebrations – each thoughtfully supported to ensure a seamless and meaningful event experience.",
};

export default function WeddingEventsPage() {
  const [pageData, setPageData] =
    useState<WeddingEventsPageData>(FALLBACK_PAGE);
  const [events, setEvents] = useState<WeddingEvent[]>(FALLBACK_EVENTS);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pageRes, eventsRes] = await Promise.all([
          fetch("/api/wedding-events-page"),
          fetch("/api/wedding-events"),
        ]);

        if (pageRes.ok) {
          const data = await pageRes.json();
          if (data) setPageData(data);
        }

        if (eventsRes.ok) {
          const data = await eventsRes.json();
          if (Array.isArray(data) && data.length > 0) setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching wedding data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-white font-sans">
      <MetaSEO slug="wedding-events" />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end">
        <Image
          src={
            pageData.heroImage?.url ||
            "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop"
          }
          alt={pageData.heroTitle}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
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
            <h2 className="text-3xl md:text-4xl font-serif text-black-500 mb-6 font-medium">
              {pageData.introTitle}
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-10 font-medium italic">
              {pageData.introSubtitle}
            </h3>
            <div className="space-y-6 text-gray-600 text-[17px] md:text-lg font-light leading-relaxed">
              <p>{pageData.introDescription1}</p>
              <p>{pageData.introDescription2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('${
              pageData.parallaxImage?.url ||
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
            }')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
            {pageData.parallaxTitle}
          </h2>
        </div>
      </section>

      {/* Setting for Celebrations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 font-medium">
              {pageData.settingsTitle}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
              {pageData.settingsDescription}
            </p>
          </div>

          {/* Event Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
            {events.map((service) => (
              <div key={service.id} className="flex flex-col">
                <div className="relative h-[250px] w-full mb-6">
                  <Image
                    src={service.image.url}
                    alt={service.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-4 font-medium">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-justify">
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
