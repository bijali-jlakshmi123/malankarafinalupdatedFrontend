"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeroSlide, getHeroSlides } from "@/lib/api";

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const data = await getHeroSlides();

        if (data.length > 0) {
          setSlides(data);
        } else {
          setSlides([
            {
              id: 1,
              title: "A Tranquil Lakeside Escape",
              description:
                "Wake up to calm waters, gentle breezes, and unforgettable moments by Malankara Dam.",
              image: { url: "/images/hero-1.jpg" },
            },
            {
              id: 2,
              title: "A Tranquil Lakeside Escape",
              description:
                "Wake up to calm waters, gentle breezes, and unforgettable moments by Malankara Dam.",
              image: { url: "/images/hero-2.jpg" },
            },
          ]);
        }
      } catch (error) {
        console.error("Error loading slides:", error);

        setSlides([
          {
            id: 1,
            title: "A Tranquil Lakeside Escape",
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

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
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
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          {index === currentSlide && (
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-prata text-white mb-4 leading-tight">
                    <span className="whitespace-nowrap">
                      A Tranquil Lakeside Escape
                    </span>

                    <span className="block text-3xl md:text-4xl lg:text-5xl mt-2">
                      at Malankara Palace
                    </span>
                  </h2>

                  <p className="text-lg md:text-xl text-white font-light max-w-xl">
                    {slide.description}
                  </p>
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white text-4xl bg-black/30 hover:bg-black/50 w-12 h-12 flex items-center justify-center rounded-full transition-all"
      >
        <i className="las la-angle-left"></i>
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white text-4xl bg-black/30 hover:bg-black/50 w-12 h-12 flex items-center justify-center rounded-full transition-all"
      >
        <i className="las la-angle-right"></i>
      </button>
    </div>
  );
}
