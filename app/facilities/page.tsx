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
  svgIcon: string | null;
  iconImage?: { url: string } | null;
  order: number;
}

const FALLBACK_AMENITY_ICONS: AmenityIcon[] = [
  {
    id: 1,
    name: "High-Speed Wi-Fi",
    svgIcon:
      "M8.25 11.25a4.125 4.125 0 005.25 0m-9 3a8.625 8.625 0 0112.75 0M1.5 8.25a13.125 13.125 0 0121 0M11 15.75h.008v.008H11v-.008z",
    order: 1,
  },
  {
    id: 2,
    name: "Large Infinity Pool",
    svgIcon:
      "M3 17.25a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 17.25M6 15v-4.5h3.75V15m3.75 0v-4.5H18V15M3.75 21A2.25 2.25 0 011.5 18.75v-2.25h1.5M21 15v2.25a2.25 2.25 0 002.25 2.25h-1.5m-18 0h16.5",
    order: 2,
  },
  {
    id: 3,
    name: "Multi-Cuisine Restaurant",
    svgIcon:
      "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    order: 3,
  },
  {
    id: 4,
    name: "24/7 Front Desk",
    svgIcon:
      "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    order: 4,
  },
  {
    id: 5,
    name: "Free Parking",
    svgIcon:
      "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
    order: 5,
  },
  {
    id: 6,
    name: "BBQ",
    svgIcon:
      "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z",
    order: 6,
  },
  {
    id: 7,
    name: "Room Service",
    svgIcon:
      "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.663-.658v0c0-.355.186-.676.401-.959a1.647 1.647 0 00.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0c.31 0 .555-.26.532-.57a48.039 48.039 0 01-.642-5.056c-1.518-.19-3.057-.309-4.616-.354a.64.64 0 00-.663.658v0c0 .355-.186.676-.401.959a1.647 1.647 0 00-.349 1.003c0 1.035-1.008 1.875-2.25 1.875-1.243 0-2.25-.84-2.25-1.875 0-.369.128-.713.349-1.003.215-.283.4-.604.4-.959v0c0-.333-.277-.599-.61-.58a48.1 48.1 0 00-5.427.63 48.05 48.05 0 00-.582 4.717.532.532 0 00.533.57v0c.355 0 .676-.186.959-.401.29-.221.634-.349 1.003-.349 1.035 0 1.875 1.007 1.875 2.25s-.84 2.25-1.875 2.25c-.37 0-.713-.128-1.003-.349-.283-.215-.604-.401-.959-.401v0c-.31 0-.555.26-.532.57a48.039 48.039 0 01.642 5.056z",
    order: 7,
  },
  {
    id: 8,
    name: "Indoor & Outdoor Games Lounge",
    svgIcon:
      "M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3",
    order: 8,
  },
  {
    id: 9,
    name: "Laundry Services",
    svgIcon:
      "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z",
    order: 9,
  },
  {
    id: 10,
    name: "Banquet Hall",
    svgIcon:
      "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" stroke="#702C8B" strokeWidth="1.5" />
      <path
        d="M8 12L11 15L16 9"
        stroke="#702C8B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
                <div className="w-12 h-12 text-text group-hover:text-primary-hover transition-colors">
                  {amenity.svgIcon ? (
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
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                      />
                    </svg>
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
