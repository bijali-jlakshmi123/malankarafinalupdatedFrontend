"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ExperienceItem {
  id: number;
  title: string;
  description: string;
  image: { url: string };
  category: "In-House" | "Lake" | "Recreation" | "Nearby";
  order: number;
}

interface ExperiencesProps {
  pageData: {
    introTitle: string;
    introDescription: string;
    inHouseTitle: string;
    nearbyTitle: string;
    noteTitle: string;
    noteContent: string;
  };
}

const FALLBACK_EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    title: "Large Infinity Pool",
    description:
      "A spacious infinity pool set amidst calm surroundings, featuring a large main pool and a separate kids' pool – perfect for relaxed swims, family fun, and leisurely poolside time.",
    image: {
      url: "https://images.unsplash.com/photo-1572331165267-854da2b00ca1?q=80&w=2070&auto=format&fit=crop",
    },
    category: "In-House",
    order: 1,
  },
  {
    id: 2,
    title: "Sunset & Lake Views",
    description:
      "Relax at dedicated benches and lakeside sitting areas set on green lawns, offering peaceful lake views and beautiful sunset moments to unwind and enjoy the evening.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    },
    category: "In-House",
    order: 2,
  },
  {
    id: 3,
    title: "Live Rod Fishing",
    description:
      "You can experience live rod fishing along the calm lakeside waters, enjoying a peaceful and engaging leisure activity.",
    image: {
      url: "https://images.unsplash.com/photo-1544551763-87405234241e?q=80&w=2071&auto=format&fit=crop",
    },
    category: "In-House",
    order: 3,
  },
  {
    id: 4,
    title: "Fish Netting",
    description:
      "Take part in guided fish netting experiences inspired by local backwater traditions, offering an authentic glimpse into traditional fishing practices.",
    image: {
      url: "https://images.unsplash.com/photo-1544551763-87405234241e?q=80&w=2071&auto=format&fit=crop",
    },
    category: "Lake",
    order: 4,
  },
  {
    id: 5,
    title: "Kayaking",
    description:
      "Glide through calm waters and enjoy scenic lake views with guided kayaking sessions for a peaceful outdoor experience.",
    image: {
      url: "https://images.unsplash.com/photo-1544098485-2a2ed6da40ba?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Lake",
    order: 5,
  },
  {
    id: 6,
    title: "Boat Safari",
    description:
      "Enjoy boating and light adventure activities when conditions permit. (Seasonal Activity)",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Lake",
    order: 6,
  },
  {
    id: 7,
    title: "Indoor Games",
    description:
      "A dedicated indoor recreation area featuring snooker, table football, carrom, and chess.",
    image: {
      url: "https://images.unsplash.com/photo-1596707328639-5a1d7f4ce9d3?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Recreation",
    order: 7,
  },
  {
    id: 8,
    title: "Badminton Court & Open Activity Spaces",
    description:
      "A designated badminton court along with open spaces for outdoor games and group activities.",
    image: {
      url: "https://images.unsplash.com/photo-1626224583764-8478ab2d64d5?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Recreation",
    order: 8,
  },
  {
    id: 9,
    title: "Kids Play Area",
    description:
      "A safe and cheerful play space thoughtfully designed for children to enjoy freely.",
    image: {
      url: "https://images.unsplash.com/photo-1544766023-c901235b0b2e?q=80&w=2008&auto=format&fit=crop",
    },
    category: "Recreation",
    order: 9,
  },
  {
    id: 10,
    title: "Nature & Village Walks",
    description:
      "Guided walks through the scenic lanes of Kudayathoor, a renowned film village where over 100 movies have been shot, showcasing timeless rural charm, natural landscapes, and authentic village life.",
    image: {
      url: "https://images.unsplash.com/photo-1541367777749-8c290197d096?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Nearby",
    order: 10,
  },
  {
    id: 11,
    title: "Farm & Plantation Visit",
    description:
      "Explore nearby farms and spice plantations, experiencing the sights and aromas of cardamom, pepper, and nutmeg while learning about traditional cultivation and rural life in the region.",
    image: {
      url: "https://images.unsplash.com/photo-1596568461757-5586617a2a5e?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Nearby",
    order: 11,
  },
  {
    id: 12,
    title: "Trekking",
    description:
      "Experience scenic trekking trails across open hill landscapes, offering wide valley views, dramatic skies, and a refreshing escape into nature at Ilaveezhapoonchira.",
    image: {
      url: "https://images.unsplash.com/photo-1502391060939-feb70ad28854?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Nearby",
    order: 12,
  },
];

export default function Experiences({ pageData }: ExperiencesProps) {
  const [items, setItems] = useState<ExperienceItem[]>(FALLBACK_EXPERIENCES);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/experiences");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setItems(data);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    }
    fetchItems();
  }, []);

  const inHouse = items.filter((i) => i.category === "In-House");
  const lake = items.filter((i) => i.category === "Lake");
  const recreation = items.filter((i) => i.category === "Recreation");
  const nearby = items.filter((i) => i.category === "Nearby");

  const ExperienceCard = ({ item }: { item: ExperienceItem }) => (
    <div className="flex flex-col">
      <div className="relative h-64 w-full mb-6 overflow-hidden rounded-none group">
        <Image
          src={item.image.url}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <h4 className="text-2xl font-prata text-secondary mb-3">{item.title}</h4>
      <p className="text-text leading-relaxed text-[15px]">
        {item.description}
      </p>
    </div>
  );

  return (
    <section className="py-20 bg-bg-1 font-sarabun">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-prata text-secondary mb-6 font-medium">
            {pageData.introTitle}
          </h2>
          <p className="text-text text-lg leading-relaxed mb-12">
            {pageData.introDescription}
          </p>
          <h3 className="text-3xl md:text-4xl font-prata text-secondary font-medium italic">
            {pageData.inHouseTitle}
          </h3>
        </div>

        {/* In-House Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {inHouse.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>

        {/* Lake Activities Section */}
        {lake.length > 0 && (
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {lake.map((item) => (
                <ExperienceCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Recreation & Kids Section */}
        {recreation.length > 0 && (
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {recreation.map((item) => (
                <ExperienceCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nearby Experiences Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-prata text-secondary font-medium">
            {pageData.nearbyTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {nearby.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>

        {/* Note Section */}
        <div className="mt-20 bg-bg-3/50 p-8 md:p-12 rounded-none text-center">
          <h4 className="text-2xl font-prata text-secondary mb-4 font-medium">
            {pageData.noteTitle}
          </h4>
          <p className="text-text text-lg leading-relaxed max-w-4xl mx-auto font-light">
            {pageData.noteContent}
          </p>
        </div>
      </div>
    </section>
  );
}
