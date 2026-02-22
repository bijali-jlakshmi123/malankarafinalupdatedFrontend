"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

// ── Fallback data (matches original hardcoded design) ──

const FALLBACK_PAGE = {
  heroTitle: "Resort Facilities",
  heroSubtitle:
    "Everything you need for a comfortable, connected, and relaxing stay by the lake.",
  heroImage: null as { url: string } | null,
  amenitiesSectionTitle: "Comfort, Convenience & Infrastructure",
  amenitiesSectionDescription:
    "Our facilities are designed to make every stay smooth, comfortable, and well-supported. From essential guest services to leisure infrastructure and family-friendly spaces, each facility is planned to enhance your time by the lake while keeping the experience relaxed and effortless.",
};

interface AmenityIcon {
  id: number;
  name: string;
  iconClass?: string; // Change from svgIcon to iconClass
  svgIcon?: string | null;
  iconImage?: { url: string } | null;
  order: number;
}

const FALLBACK_AMENITY_ICONS: AmenityIcon[] = [
  {
    id: 1,
    name: "High-Speed Wi-Fi",
    iconClass: "las la-wifi",
    order: 1,
  },
  {
    id: 2,
    name: "Large Infinity Pool",
    iconClass: "las la-swimming-pool",
    order: 2,
  },
  {
    id: 3,
    name: "Multi-Cuisine Restaurant",
    iconClass: "las la-utensils",
    order: 3,
  },
  {
    id: 4,
    name: "24/7 Front Desk",
    iconClass: "las la-concierge-bell",
    order: 4,
  },
  {
    id: 5,
    name: "Free Parking",
    iconClass: "las la-parking",
    order: 5,
  },
  {
    id: 6,
    name: "BBQ",
    iconClass: "las la-fire",
    order: 6,
  },
  {
    id: 7,
    name: "Room Service",
    iconClass: "las la-concierge-bell",
    order: 7,
  },
  {
    id: 8,
    name: "Indoor & Outdoor Games Lounge",
    iconClass: "las la-gamepad",
    order: 8,
  },
  {
    id: 9,
    name: "Laundry Services",
    iconClass: "las la-tshirt",
    order: 9,
  },
  {
    id: 10,
    name: "Banquet Hall",
    iconClass: "las la-glass-cheers",
    order: 10,
  },
];

interface FacilitySection {
  id: number;
  title: string;
  description: string;
  image: { url: string } | null;
  imagePosition: "left" | "right";
  checklistItems: string[];
  checklistColumns: number;
  order: number;
}

const FALLBACK_SECTIONS: FacilitySection[] = [
  {
    id: 1,
    title: "Pool & Leisure Spaces",
    description:
      "Open water and relaxation zones designed for calm leisure, family time, and scenic unwinding throughout the day.",
    image: {
      url: "https://images.unsplash.com/photo-1572331165267-854da2b00ca1?q=80&w=2070&auto=format&fit=crop",
    },
    imagePosition: "left",
    checklistItems: [
      "Infinity-style large pool",
      "Kids pool",
      "Poolside loungers",
      "Relaxation deck",
      "Sunset sit-outs",
    ],
    checklistColumns: 1,
    order: 1,
  },
  {
    id: 2,
    title: "Guest Services & Stay Support",
    description:
      "Core hospitality services that ensure a smooth, comfortable, and well-supported stay from arrival to departure.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    },
    imagePosition: "right",
    checklistItems: [
      "24-hour front desk",
      "Housekeeping",
      "Room service",
      "Laundry service",
      "Travel desk",
      "Luggage assistance",
      "Doctor on call",
    ],
    checklistColumns: 2,
    order: 2,
  },
  {
    id: 3,
    title: "Recreation & Family Facilities",
    description:
      "Dedicated indoor and outdoor spaces for recreation, family time, and relaxed engagement.",
    image: {
      url: "https://images.unsplash.com/photo-1596707328639-5a1d7f4ce9d3?q=80&w=2070&auto=format&fit=crop",
    },
    imagePosition: "left",
    checklistItems: [
      "Indoor games area",
      "Snooker & football",
      "Carrom & Chess",
      "Badminton court",
      "Kids play area",
      "Open activity spaces",
    ],
    checklistColumns: 2,
    order: 3,
  },
];

// ── Purple checkmark SVG component ──

function CheckIcon() {
  return (
    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-secondary text-secondary">
      <i className="las la-check text-xs font-bold"></i>
    </div>
  );
}

// ── Main page component ──

export default function FacilitiesPage() {
  const [pageData, setPageData] = useState(FALLBACK_PAGE);
  const [amenities, setAmenities] = useState<AmenityIcon[]>(
    FALLBACK_AMENITY_ICONS,
  );
  const [sections, setSections] =
    useState<FacilitySection[]>(FALLBACK_SECTIONS);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [pageRes, amenitiesRes, sectionsRes] = await Promise.all([
          fetch("/api/facilities-page"),
          fetch("/api/amenity-icons"),
          fetch("/api/facility-sections"),
        ]);

        if (pageRes.ok) {
          const data = await pageRes.json();
          if (data && data.heroTitle) {
            setPageData(data);
          }
        }

        if (amenitiesRes.ok) {
          const data = await amenitiesRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setAmenities(data);
          }
        }

        if (sectionsRes.ok) {
          const data = await sectionsRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setSections(data);
          }
        }
      } catch (error) {
        console.error("Error fetching facilities data:", error);
      }
    }
    fetchAll();
  }, []);

  const heroImageUrl =
    pageData.heroImage?.url ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop";

  return (
    <main className="relative min-h-screen bg-[#f9f7f2]">
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end">
        <Image
          src={heroImageUrl}
          alt={pageData.heroTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h1 className="text-4xl md:text-6xl font-prata text-white mb-4">
            {pageData.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl">
            {pageData.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Comfort, Convenience & Infrastructure Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-prata text-secondary mb-6 font-medium">
              {pageData.amenitiesSectionTitle}
            </h2>
            <p className="text-text text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
              {pageData.amenitiesSectionDescription}
            </p>
          </div>

          {/* Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 max-w-6xl mx-auto">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="w-12 h-12 text-text group-hover:text-primary-hover transition-colors flex items-center justify-center">
                  {amenity.iconClass ? (
                    <i className={`${amenity.iconClass} text-5xl`}></i>
                  ) : amenity.svgIcon ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-full h-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={amenity.svgIcon}
                      />
                    </svg>
                  ) : amenity.iconImage ? (
                    <Image
                      src={amenity.iconImage.url}
                      alt={amenity.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <i className="las la-star text-4xl"></i>
                  )}
                </div>
                <span className="text-secondary font-prata text-lg max-w-[150px]">
                  {amenity.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Facility Sections */}
      {sections.map((section) => {
        const imageUrl =
          section.image?.url ||
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop";

        // Split items into two columns if checklistColumns === 2
        const col1Items =
          section.checklistColumns === 2
            ? section.checklistItems.slice(
                0,
                Math.ceil(section.checklistItems.length / 2),
              )
            : section.checklistItems;
        const col2Items =
          section.checklistColumns === 2
            ? section.checklistItems.slice(
                Math.ceil(section.checklistItems.length / 2),
              )
            : [];

        const imageBlock = (
          <div className="relative h-[400px] lg:h-auto w-full">
            <Image
              src={imageUrl}
              alt={section.title}
              fill
              className="object-cover"
            />
          </div>
        );

        const contentBlock = (
          <div className="bg-[#f9f7f2] p-10 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-prata text-secondary mb-6 font-medium">
              {section.title}
            </h2>
            <p className="text-text text-lg font-light leading-relaxed mb-8">
              {section.description}
            </p>

            {section.checklistColumns === 2 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <ul className="space-y-4">
                  {col1Items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <span className="text-text text-lg font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  {col2Items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <span className="text-text text-lg font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                {section.checklistItems.map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <CheckIcon />
                    <span className="text-text text-lg font-light">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

        return (
          <section key={section.id} className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
                {section.imagePosition === "left" ? (
                  <>
                    {imageBlock}
                    {contentBlock}
                  </>
                ) : (
                  <>
                    {contentBlock}
                    {imageBlock}
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </main>
  );
}
