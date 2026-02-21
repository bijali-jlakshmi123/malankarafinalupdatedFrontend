"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Meditation & Quiet Zones",
    subtitle: "Inner Peace",
    description:
      "Moments to restore, renew, and reconnect with yourself in our serene sanctuary.",
    image:
      "https://images.unsplash.com/photo-1599447421405-075adf15ca02?q=80&w=2148&auto=format&fit=crop",
    link: "/facilities",
  },
  {
    id: 2,
    title: "Ayurvedic Spa",
    subtitle: "Holistic Healing",
    description:
      "Traditional treatments designed to revitalize your body, mind, and spirit.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    link: "/facilities",
  },
];

export default function WellnessSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />

            {/* Same overlay as HeroSlider */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content (Right aligned, HeroSlider spacing) */}
          {index === currentSlide && (
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 flex justify-end">
                <div className="max-w-2xl text-white text-right">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-prata text-white mb-4 leading-tight">
                    {slide.title}
                  </h2>

                  <p className="text-lg md:text-xl text-white font-light mb-6">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.link}
                    className="inline-block bg-[#C19A6B] hover:bg-[#a88455] text-white text-lg font-medium px-8 py-3 rounded transition-all duration-300"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
