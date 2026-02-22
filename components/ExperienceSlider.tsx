"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ExperienceSlide {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: { url: string } | string;
  link?: string;
}

const FALLBACK_SLIDES: ExperienceSlide[] = [
  {
    id: 1,
    title: "The Experience",
    subtitle: "Unwind & Rejuvenate",
    description: "Experiences shaped by water, nature, and unhurried moments.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    link: "/experiences",
  },
  {
    id: 2,
    title: "Nature & Serenity",
    subtitle: "Connect with Nature",
    description:
      "Immerse yourself in the tranquility of our lush surroundings and scenic views.",
    image:
      "https://images.unsplash.com/photo-1571896349842-6e53ce41be03?q=80&w=2070&auto=format&fit=crop",
    link: "/experiences",
  },
];

function getImageUrl(image: { url: string } | string | undefined): string {
  if (!image) return FALLBACK_SLIDES[0].image as string;
  if (typeof image === "string") return image;
  return image.url || (FALLBACK_SLIDES[0].image as string);
}

export default function ExperienceSlider() {
  const [slides, setSlides] = useState<ExperienceSlide[]>(FALLBACK_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* Fetch slides from API */
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/experiences");

        if (!res.ok) return;

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setSlides(data);
          setCurrentSlide(0);
        }
      } catch (error) {
        console.error("Error fetching experience slides:", error);
      }
    }

    fetchSlides();
  }, []);

  /* Autoplay */
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

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
              src={getImageUrl(slide.image)}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />

            {/* HeroSlider overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          {index === currentSlide && (
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-prata text-white mb-4 leading-tight">
                    {slide.title}
                  </h2>

                  <p className="text-lg md:text-xl text-white font-light max-w-xl mb-6">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.link || "/experiences"}
                    className="inline-block  bg-primary hover:bg-primary-hover text-white text-lg font-medium px-8 py-3 rounded transition-all duration-300"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* LEFT BUTTON */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white text-3xl bg-black/30 hover:bg-black/50 px-3 py-2 rounded-full"
      >
        ‹
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white text-3xl bg-black/30 hover:bg-black/50 px-3 py-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
}
