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
    <footer className="bg-[#f8f8eb] font-sarabun text-text">
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
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
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
                  <i className="lab la-instagram text-xl"></i>
                </a>
                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-none flex items-center justify-center text-primary hover:bg-bg-2 transition-colors shadow-sm"
                >
                  <i className="lab la-facebook-f text-xl"></i>
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-none flex items-center justify-center text-primary hover:bg-bg-2 transition-colors shadow-sm"
                >
                  <i className="lab la-youtube text-xl"></i>
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
                {
                  label: "The Lakeview Royal Suite",
                  href: "/rooms/the-lakeview-royal-suite",
                },
                {
                  label: "The Lakeview Presidential Suite",
                  href: "/rooms/the-lakeview-presidential-suite",
                },
                {
                  label: "The Lakeview Sunset Mirage",
                  href: "/rooms/the-lakeview-sunset-mirage",
                },
                {
                  label: "The Lakeview Premium Twin",
                  href: "/rooms/the-lakeview-premium-twin",
                },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text hover:text-primary transition-colors"
                  >
                    {item.label}
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
    </footer>
  );
}
