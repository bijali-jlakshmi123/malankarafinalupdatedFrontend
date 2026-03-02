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
    <div className="fixed bottom-10 right-10 z-[60] flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Book Now Button */}
      <a
        href={bookNowUrl}
        className="pointer-events-auto flex items-center gap-3 bg-primary hover:brightness-110 text-white min-w-[155px] px-5 py-3 rounded-[8px] shadow-xl transition-all hover:translate-y-[-2px] font-body text-[16px] font-semibold"
      >
        <i className="las la-calendar text-[22px]"></i>
        <span className="">Book Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-3 bg-[#22D36E] hover:brightness-110 text-white min-w-[155px] px-5 py-3 rounded-[8px] shadow-xl transition-all hover:translate-y-[-2px] font-body text-[16px] font-semibold"
      >
        <i className="lab la-whatsapp text-[24px]"></i>
        <span className="">WhatsApp</span>
      </a>

      {/* Scroll to Top Button */}
      <div className="mt-8">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto bg-primary hover:brightness-110 text-white w-11 h-11 flex items-center justify-center rounded-[6px] shadow-lg transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <i className="las la-chevron-up text-xl"></i>
          </button>
        )}
      </div>
    </div>
  );
}
