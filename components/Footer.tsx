"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SiteSettings, getSiteSettings } from "@/lib/api";

const DEFAULT_LOGO_URL =
  "https://malankarapalace.com/wp-content/uploads/2026/01/Malankara-final-logo-scaled.png";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    async function fetchSettings() {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.error("Error loading site settings in footer:", error);
      }
    }
    fetchSettings();
  }, []);

  const phoneNumbersList =
    typeof siteSettings?.phoneNumbers === "string"
      ? siteSettings.phoneNumbers.split(",").map((p) => p.trim())
      : siteSettings?.phoneNumbers || [
          "04862 204400",
          "+91 75102 00444",
          "+91 80862 00404",
        ];

  return (
    <footer className="bg-bg-1 font-sarabun text-text">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        {/* Top Section: Logo, Quick Enquiry, Follow Us */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-10 gap-8 lg:gap-0">
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link href="/" className="block relative w-64 h-20">
              <Image
                src={siteSettings?.logo?.url || DEFAULT_LOGO_URL}
                alt={siteSettings?.siteName || "Malankara Palace"}
                fill
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* Right Side Group */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 text-center lg:text-right">
            {/* Quick Enquiry */}
            <div className="flex flex-col items-center lg:items-end">
              <h3 className="font-prata text-2xl text-secondary mb-2">
                Quick Enquiry
              </h3>
              <p className="text-lg text-text font-medium">
                {phoneNumbersList.map((phone, idx) => (
                  <span key={phone}>
                    {phone}
                    {idx < phoneNumbersList.length - 1 && (
                      <span className="mx-1">|</span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col items-center lg:items-end">
              <h3 className="font-prata text-2xl text-secondary mb-2">
                Follow Us
              </h3>
              <div className="flex space-x-3 mt-1">
                {/* Instagram */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-none flex items-center justify-center text-primary hover:bg-bg-2 transition-colors shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-none flex items-center justify-center text-primary hover:bg-bg-2 transition-colors shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-none flex items-center justify-center text-primary hover:bg-bg-2 transition-colors shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-gray-200 mb-10" />

        {/* Middle Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Contact Us */}
          <div>
            <h3 className="font-prata text-2xl text-secondary mb-6">
              Contact Us
            </h3>
            <div className="space-y-4 text-text text-[15px] leading-relaxed">
              <p className="whitespace-pre-line">
                {siteSettings?.address ||
                  "Kudayathoor P.O., Thodupuzha Idukki District,\nKerala, India – 685 590"}
              </p>
              <p>Phone: {phoneNumbersList.join(" ")}</p>
              <p>
                Email:{" "}
                {siteSettings?.email || "reservations@malankarapalace.com"}
              </p>
            </div>
          </div>

          {/* Rooms & Suites */}
          <div>
            <h3 className="font-prata text-2xl text-secondary mb-6">
              Rooms & Suites
            </h3>
            <ul className="space-y-3 text-[15px]">
              {[
                "The Lakeview Royal Suite",
                "The Lakeview Presidential Suite",
                "The Lakeview Sunset Mirage",
                "The Lakeview Premium Twin",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/rooms"
                    className="text-text hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h3 className="font-prata text-2xl text-secondary mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-[15px]">
              {[
                { label: "Our Story", href: "/our-story" },
                { label: "Facilities", href: "/facilities" },
                { label: "Experiences", href: "/experiences" },
                { label: "Dining", href: "/dining" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h3 className="font-prata text-2xl text-secondary mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-[15px]">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Wedding & Events", href: "/wedding-events" },
                { label: "Corporate & MICE", href: "/corporate" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-gray-200 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} Malankara Palace Lake View Resort & Spa. All
            rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/terms-conditions"
              className="hover:text-black hover:no-underline transition-all duration-300"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-black hover:no-underline transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/booking-policy"
              className="hover:text-black hover:no-underline transition-all duration-300"
            >
              Booking Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons (Fixed Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-3 items-end">
        {/* Book Now */}
        <button
          suppressHydrationWarning
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-none shadow-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="uppercase tracking-wide">Book Now</span>
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/917510200444"
          target="_blank"
          rel="noopener noreferrer"
          suppressHydrationWarning
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-2.5 rounded shadow-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="tracking-wide">WhatsApp</span>
        </a>

        {/* Scroll to Top */}
        <button
          suppressHydrationWarning
          className="w-10 h-10 bg-primary hover:bg-primary-hover text-white rounded-none flex items-center justify-center shadow-lg transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
