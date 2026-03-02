"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface DestinationCard {
  title: string;
  distance: string;
  travelTime: string;
  bestSeason: string;
  description: string;
  imageUrl: string;
}

interface DestinationSection {
  sectionHeading: string;
  bgColor: string;
  cards: DestinationCard[];
}

interface NearbyDestinationsData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: { url: string } | null;
  mainHeading: string;
  mainDescription: string;
  destinations: DestinationSection[];
}

const FALLBACK_DATA: NearbyDestinationsData = {
  heroTitle: "Nature, Views & Hidden Escapes",
  heroSubtitle:
    "Explore waterfalls, valleys, hilltops, and lakeside locations just a short drive away.",
  mainHeading: "Discover Nearby Destinations",
  mainDescription:
    "Explore scenic hill stations, tranquil lakes, dramatic viewpoints, and hidden natural spots around Malankara, all within easy reach for relaxed day trips and slow exploration.",
  destinations: [
    {
      sectionHeading:
        "Local Attractions (Stay <span class='text-black'>&amp;</span> Visit <span class='text-black'>|</span> Within 5-10 km)",
      bgColor: "bg-white",
      cards: [
        {
          title: "Malankara Dam & Reservoir",
          distance: "~2 km",
          travelTime: "5–10 minutes",
          bestSeason: "September to March",
          description:
            "A vast reservoir offering calm lake views, cool breezes, and scenic surroundings. Perfect for photography, evening walks, and relaxed sightseeing.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Sree Devi Temple, Adoormala, Saramkuthi",
          distance: "~4 km",
          travelTime: "10–15 minutes",
          bestSeason: "October to March",
          description:
            "A serene hilltop temple surrounded by greenery, known for its peaceful atmosphere and local spiritual significance. Ideal for quiet morning or evening visits.",
          imageUrl:
            "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Ilaveezhapoonchira",
          distance: "~8 km",
          travelTime: "20–25 minutes",
          bestSeason: "September to March",
          description:
            "A stunning hill valley without trees, famous for wide open landscapes, dramatic skies, and breathtaking viewpoints. Popular for trekking and sunset views.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Kudayathoor Vayanakkavu",
          distance: "~1.5 km",
          travelTime: "10–15 minutes",
          bestSeason: "September to March",
          description:
            "A forest-surrounded sacred spot known for its natural setting and traditional rituals, featuring a scenic bridge across the reservoir that adds to its calm blend of spirituality and nature.",
          imageUrl:
            "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "St. Augustine Church, Kudayathoor",
          distance: "~5 km",
          travelTime: "10–15 minutes",
          bestSeason: "All year round",
          description:
            "A historic church set in a peaceful village backdrop, reflecting local culture and heritage. A quiet stop for those interested in history and architecture.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Thriveni Sangamam, Moolamattom",
          distance: "~7 km",
          travelTime: "15–20 minutes",
          bestSeason: "September to March",
          description:
            "A sacred confluence of three rivers, surrounded by lush scenery. Known for spiritual importance and calm riverside views.",
          imageUrl:
            "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2070&auto=format&fit=crop",
        },
      ],
    },
    {
      sectionHeading:
        "Nearby Tourist Destinations (Easy Day Trips <span class='text-[#a0a0a0]'>|</span> 15 km &amp; Above)",
      bgColor: "bg-bg-1",
      cards: [
        {
          title: "Illikkal Kallu",
          distance: "~20 km",
          travelTime: "50 - 60 minutes",
          bestSeason: "September to March",
          description:
            "A dramatic rock formation atop the Western Ghats offering panoramic views, misty landscapes, and adventurous trekking routes.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Vagamon Meadows",
          distance: "~30 km",
          travelTime: "50 - 60 minutes",
          bestSeason: "September to March",
          description:
            "Rolling green meadows, pine forests, and cool climate make Vagamon perfect for nature walks, paragliding, and relaxed hill experiences.",
          imageUrl:
            "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Cheruthoni Dam",
          distance: "~33 km",
          travelTime: "1 hr",
          bestSeason: "September to March",
          description:
            "One of the key dams of Idukki, surrounded by scenic hills and viewpoints, ideal for short sightseeing stops.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Idukki Arch Dam",
          distance: "~50 km",
          travelTime: "1 hr 20 min",
          bestSeason: "September to March",
          description:
            "An engineering marvel nestled between forested hills, offering impressive views and photo opportunities.",
          imageUrl:
            "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Thommankuthu Waterfalls",
          distance: "~25 km",
          travelTime: "45 min",
          bestSeason: "September to January",
          description:
            "A series of beautiful cascades set inside forests, popular for trekking, swimming spots, and eco-tourism activities.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Palkulamedu",
          distance: "~30 km",
          travelTime: "1 hr",
          bestSeason: "September to March",
          description:
            "A peaceful hill viewpoint known for misty mornings, cool winds, and expansive valley views.",
          imageUrl:
            "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Munnar",
          distance: "~85 km",
          travelTime: "2.5 hrs",
          bestSeason: "September to May",
          description:
            "A popular hill destination known for tea plantations, misty hills, waterfalls, and cool climate.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Thekkadi",
          distance: "~70 km",
          travelTime: "2.5 hrs",
          bestSeason: "September to May",
          description:
            "Home to Periyar Wildlife Sanctuary, offering boat safaris, spice plantations, and forest experiences.",
          imageUrl:
            "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Kumarakom Backwaters",
          distance: "~65 km",
          travelTime: "2 hr",
          bestSeason: "August to May",
          description:
            "Famous for serene backwaters, houseboat cruises, bird sanctuary visits, and village life experiences.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Alleppey",
          distance: "~90 km",
          travelTime: "2.5 hrs",
          bestSeason: "August to May",
          description:
            "Known for houseboats, canals, and relaxed backwater cruises showcasing Kerala&apos;s water life.",
          imageUrl:
            "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Kochi",
          distance: "~75 km",
          travelTime: "2.3 hrs",
          bestSeason: "All year round",
          description:
            "A vibrant coastal city blending heritage sites, cultural experiences, shopping, and dining.",
          imageUrl:
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        },
      ],
    },
  ],
};

export default function NearbyDestinationsPage() {
  const [data, setData] = useState<NearbyDestinationsData>(FALLBACK_DATA);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/nearby-destinations");
        if (res.ok) {
          const json = await res.json();
          if (json) {
            setData({
              heroTitle: json.heroTitle || FALLBACK_DATA.heroTitle,
              heroSubtitle: json.heroSubtitle || FALLBACK_DATA.heroSubtitle,
              heroImage: json.heroImage || null,
              mainHeading: json.mainHeading || FALLBACK_DATA.mainHeading,
              mainDescription:
                json.mainDescription || FALLBACK_DATA.mainDescription,
              destinations: json.destinations || FALLBACK_DATA.destinations,
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch nearby destinations from CMS", err);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-bg-1">
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-[65vh] md:h-[75vh] w-full flex items-end">
        <Image
          src={
            data.heroImage?.url ||
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop"
          }
          alt={data.heroTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="relative z-10 container-custom pb-10 md:pb-16 text-white">
          <div className="max-w-[900px]">
            <h1
              className="mb-3 text-white"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {data.heroTitle}
            </h1>
            <p
              className="font-primary text-white max-w-[580px] text-[18px] md:text-[20px]"
              style={{
                lineHeight: "1.35",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              {data.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Discover Section Heading */}
      <section className="bg-white pt-20 md:pt-28 pb-10 text-center">
        <div className="container-custom max-w-[1000px] mx-auto">
          <h2 className="mb-6">{data.mainHeading}</h2>
          <p className="max-w-[850px] mx-auto mb-20 md:mb-24">
            {data.mainDescription}
          </p>
        </div>
      </section>

      {/* Render CMS Driven Destination Sections */}
      {data.destinations.map((section, sectionIdx) => (
        <section
          key={sectionIdx}
          className={`pb-24 pt-0 ${section.bgColor || "bg-white"}`}
        >
          {section.bgColor && section.bgColor !== "bg-white" && (
            <div className="pt-20 md:pt-24"></div>
          )}

          <div className="container-custom mx-auto">
            {section.sectionHeading && (
              <div className="text-center mb-14 md:mb-16">
                <h3
                  className={`${
                    section.bgColor === "bg-white" || !section.bgColor
                      ? "mt-0"
                      : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: section.sectionHeading }}
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              {section.cards.map((card, cardIdx) => (
                <div key={cardIdx} className="flex flex-col text-left">
                  <div className="relative w-full aspect-[16/10] mb-6 overflow-hidden bg-gray-100">
                    <Image
                      src={card.imageUrl}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mb-3">{card.title}</h4>
                  <div className="flex flex-col gap-1.5 mb-5 font-primary text-text">
                    <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                      <span className="flex items-center">
                        <i className="las la-check-circle text-primary text-[20px] mr-2"></i>
                        Distance: {card.distance}
                      </span>
                      <span className="flex items-center">
                        <i className="las la-check-circle text-primary text-[20px] mr-2"></i>
                        Travel Time: {card.travelTime}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <i className="las la-check-circle text-primary text-[20px] mr-2"></i>
                      Best Season to Visit: {card.bestSeason}
                    </span>
                  </div>
                  <p className="mt-2">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
