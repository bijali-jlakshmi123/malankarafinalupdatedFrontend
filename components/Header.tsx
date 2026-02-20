"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import { SiteSettings, getSiteSettings } from "@/lib/api";

const DEFAULT_LOGO_URL =
  "https://malankarapalace.com/wp-content/uploads/2026/01/Malankara-final-logo-scaled.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.error("Error loading site settings:", error);
      }
    }
    fetchSettings();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="relative w-56 h-16">
                <Image
                  src={siteSettings?.logo?.url || DEFAULT_LOGO_URL}
                  alt={siteSettings?.siteName || "Malankara Palace"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 150px, 224px"
                  priority
                />
              </Link>
            </div>

            {/* Right side - Book Now button and Hamburger */}
            <div className="flex items-center space-x-4">
              <button
                suppressHydrationWarning
                className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors duration-200"
              >
                BOOK NOW
              </button>
              <button
                onClick={toggleMenu}
                suppressHydrationWarning
                className="w-10 h-10 flex flex-col justify-center items-center space-y-1.5 group"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sidebar */}
      <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
