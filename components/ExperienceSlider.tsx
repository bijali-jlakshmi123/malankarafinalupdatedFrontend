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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /* Fetch slides from API */
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/experiences");

        if (!res.ok) return;

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setSlides(data);
          setCurrentSlide(0); // reset safely
        }
      } catch (error) {
        console.error("Error fetching experience slides:", error);
      }
    }

    fetchSlides();
  }, []);

  /* Pause autoplay when user interacts */
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    pauseAutoPlay();
  };

  /* Autoplay */
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

            {/* HeroSlider overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          {index === currentSlide && (
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
                    {slide.title}
                  </h2>

                  <p className="text-lg md:text-xl text-white/90 font-light max-w-xl mb-6">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.link || "/experiences"}
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
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30
                   w-12 h-12 md:w-14 md:h-14
                   bg-white/20 hover:bg-white/30
                   backdrop-blur-sm
                   rounded-full
                   flex items-center justify-center
                   transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30
                   w-12 h-12 md:w-14 md:h-14
                   bg-white/20 hover:bg-white/30
                   backdrop-blur-sm
                   rounded-full
                   flex items-center justify-center
                   transition-all duration-200"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
