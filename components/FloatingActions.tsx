"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, SiteSettings } from "@/lib/api";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const settings = await getSiteSettings();
      setSiteSettings(settings);
    }
    fetchSettings();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappNumber = siteSettings?.whatsappNumber || "917510200444";
  const bookNowUrl = siteSettings?.bookNowUrl || "#";

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none">
      {/* Book Now Button */}
      <a
        href={bookNowUrl}
        className="pointer-events-auto flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-none shadow-xl transition-all hover:scale-105 font-sarabun text-sm font-semibold tracking-widest uppercase"
      >
        <i className="las la-calendar-check text-xl"></i>
        <span>Book Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-none shadow-xl transition-all hover:scale-105 font-sarabun text-sm font-semibold tracking-widest uppercase"
      >
        <i className="lab la-whatsapp text-xl"></i>
        <span>WhatsApp</span>
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto bg-primary hover:bg-primary-hover text-white w-12 h-12 flex items-center justify-center rounded-none shadow-xl transition-all hover:scale-105 mt-1"
          aria-label="Scroll to top"
        >
          <i className="las la-arrow-up text-xl"></i>
        </button>
      )}
    </div>
  );
}
