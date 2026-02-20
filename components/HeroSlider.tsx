"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeroSlide, getHeroSlides } from "@/lib/api";

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const data = await getHeroSlides();
        if (data.length > 0) {
          setSlides(data);
        } else {
          // Fallback to default slides if no data from Strapi
          setSlides([
            {
              id: 1,
              title: "A Tranquil Lakeside Escape at Malankara Palace",
              description:
                "Wake up to calm waters, gentle breezes, and unforgettable moments by Malankara Dam.",
              image: { url: "/images/hero-1.jpg" },
            },
            {
              id: 2,
              title: "A Tranquil Lakeside Escape at Malankara Palace",
              description:
                "Wake up to calm waters, gentle breezes, and unforgettable moments by Malankara Dam.",
              image: { url: "/images/hero-2.jpg" },
            },
          ]);
        }
      } catch (error) {
        console.error("Error loading slides:", error);
        // Fallback slides
        setSlides([
          {
            id: 1,
            title: "A Tranquil Lakeside Escape at Malankara Palace",
            description:
              "Wake up to calm waters, gentle breezes, and unforgettable moments by Malankara Dam.",
            image: { url: "/images/hero-1.jpg" },
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSlides();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

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
              src={slide.image?.url || "/images/hero-1.jpg"}
              alt={slide.image?.alternativeText || slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          {index === currentSlide && (
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight">
                    {slide.title.split(" at ")[0]}
                    <span className="text-3xl md:text-4xl lg:text-5xl block mt-2">
                      at {slide.title.split(" at ")[1]}
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 font-light max-w-xl">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
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

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
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

      {/* Slide Indicators */}
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
