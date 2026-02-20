"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface DiningSlide {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: { url: string } | string;
  link?: string;
}

const FALLBACK_SLIDES: DiningSlide[] = [
  {
    id: 1,
    title: "Dining by the Water",
    subtitle: "Exquisite Flavors",
    description:
      "Thoughtfully prepared multi-cuisine dishes, candle-light dinners, poolside dining, and live barbecue experiences.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    link: "/dining",
  },
  {
    id: 2,
    title: "Poolside Dining",
    subtitle: "Relax & Dine",
    description:
      "Enjoy your favorite meals with a refreshing breeze and a stunning view of the pool.",
    image:
      "https://images.unsplash.com/photo-1578474843222-9593bc887f47?q=80&w=2070&auto=format&fit=crop",
    link: "/dining",
  },
];

function getImageUrl(image: { url: string } | string | undefined): string {
  if (!image) return FALLBACK_SLIDES[0].image as string;
  if (typeof image === "string") return image;
  return image.url || (FALLBACK_SLIDES[0].image as string);
}

export default function DiningSlider() {
  const [slides, setSlides] = useState<DiningSlide[]>(FALLBACK_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/dining");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSlides(data);
          }
        }
      } catch (error) {
        console.error("Error fetching dining slides:", error);
      }
    }
    fetchSlides();
  }, []);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    pauseAutoPlay();
  };

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

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
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content — right aligned */}
          {index === currentSlide && (
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 flex justify-end">
                <div className="max-w-2xl text-white text-right">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 font-light mb-6">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link || "/dining"}
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

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
