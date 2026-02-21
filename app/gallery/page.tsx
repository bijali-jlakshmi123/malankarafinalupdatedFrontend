"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";

interface GalleryItem {
  id: number;
  title?: string;
  image: { url: string };
  order: number;
}

interface GalleryPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: { url: string } | null;
}

const FALLBACK_GALLERY: GalleryItem[] = [
  {
    id: 1,
    image: {
      url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop",
    },
    order: 1,
  },
  {
    id: 2,
    image: {
      url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop",
    },
    order: 2,
  },
  {
    id: 3,
    image: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    },
    order: 3,
  },
  {
    id: 4,
    image: {
      url: "https://images.unsplash.com/photo-1572331165267-854da2b00ca1?q=80&w=2070&auto=format&fit=crop",
    },
    order: 4,
  },
  {
    id: 5,
    image: {
      url: "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=2070&auto=format&fit=crop",
    },
    order: 5,
  },
  {
    id: 6,
    image: {
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    },
    order: 6,
  },
  {
    id: 7,
    image: {
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop",
    },
    order: 7,
  },
  {
    id: 8,
    image: {
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
    },
    order: 8,
  },
  {
    id: 9,
    image: {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    },
    order: 9,
  },
];

const FALLBACK_PAGE: GalleryPageData = {
  heroTitle: "Where Every Frame Tells a Story",
  heroSubtitle:
    "From sunrise calm to celebration nights, explore our visual journey.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2574&auto=format&fit=crop",
  },
};

export default function GalleryPage() {
  const [pageData, setPageData] = useState<GalleryPageData>(FALLBACK_PAGE);
  const [images, setImages] = useState<GalleryItem[]>(FALLBACK_GALLERY);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pageRes, galleryRes] = await Promise.all([
          fetch("/api/gallery-page"),
          fetch("/api/galleries"),
        ]);

        if (pageRes.ok) {
          const data = await pageRes.json();
          if (data) setPageData(data);
        }

        if (galleryRes.ok) {
          const data = await galleryRes.json();
          if (Array.isArray(data) && data.length > 0) setImages(data);
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-white font-sarabun">
      <MetaSEO slug="gallery" />
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-end">
        <Image
          src={
            pageData.heroImage?.url ||
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2574&auto=format&fit=crop"
          }
          alt={pageData.heroTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-prata mb-6 leading-tight">
              {pageData.heroTitle}
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              {pageData.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {images.map((item) => (
              <div
                key={item.id}
                className="relative h-[300px] md:h-[400px] group overflow-hidden rounded-none"
              >
                <Image
                  src={item.image.url}
                  alt={item.title || "Gallery Image"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
