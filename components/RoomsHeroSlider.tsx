"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface RoomsPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImages: string[];
}

const FALLBACK: RoomsPageData = {
  heroTitle: "Rooms & Suites",
  heroSubtitle:
    "Experience premium comfort in stays designed to feel calm, spacious, and welcoming.",
  heroImages: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
  ],
};

export default function RoomsHeroSlider() {
  const [data, setData] = useState<RoomsPageData>(FALLBACK);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/rooms-page");
        if (!res.ok) return;
        const json = await res.json();
        if (json && json.heroTitle) {
          setData({
            heroTitle: json.heroTitle || FALLBACK.heroTitle,
            heroSubtitle: json.heroSubtitle || FALLBACK.heroSubtitle,
            heroImages:
              Array.isArray(json.heroImages) && json.heroImages.length > 0
                ? json.heroImages
                : FALLBACK.heroImages,
          });
        }
      } catch (error) {
        console.error("Error fetching rooms hero data:", error);
      }
    }
    fetchData();
  }, []);

  const images = data.heroImages;

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    pauseAutoPlay();
  };

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src={src}
              alt={`${data.heroTitle} slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      ))}

      {/* Hero Text — always on top */}
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-prata mb-4 leading-tight">
              {data.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-xl">
              {data.heroSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows — only if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-white"
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

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-white"
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
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  pauseAutoPlay();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 w-2 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
