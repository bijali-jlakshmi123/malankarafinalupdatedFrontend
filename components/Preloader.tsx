"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const LOGO_URL =
  "https://malankarapalace.com/wp-content/uploads/2026/01/Malankara-final-logo-scaled.png";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      // Remove from DOM after transition completes
      const removeTimer = setTimeout(() => setShouldRender(false), 700);
      return () => clearTimeout(removeTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100000] flex items-center justify-center bg-white transition-all duration-700 ease-in-out ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`relative flex flex-col items-center transition-transform duration-700 ${show ? "scale-100" : "scale-95"}`}
      >
        {/* Animated Logo */}
        <div className="relative w-64 h-24 mb-6 animate-pulse scale-110 transition-transform">
          <Image
            src={LOGO_URL}
            alt="Malankara Palace Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Subtle Loading bar */}
        <div className="w-48 h-0.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-loading-bar shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
        </div>

        {/* Minimalist Text */}
        <p className="mt-4 text-secondary font-prata text-lg tracking-[0.2em] uppercase opacity-70 animate-fade-in">
          Malankara Palace
        </p>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite ease-in-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 0.7;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
