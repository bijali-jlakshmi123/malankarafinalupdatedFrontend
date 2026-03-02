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
    <footer className="bg-bg-2 font-body text-text">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        {/* Top Section: Logo, Quick Enquiry, Follow Us */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-8">
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="block relative w-48 md:w-64 h-16 md:h-20 transition-all duration-300"
            >
              <Image
                src={siteSettings?.logo?.url || DEFAULT_LOGO_URL}
                alt={siteSettings?.siteName || "Malankara Palace"}
                fill
                className="object-contain object-left md:object-center lg:object-left"
              />
            </Link>
          </div>

          {/* Right Side: Quick Enquiry & Follow Us */}
          <div className="flex flex-col md:flex-row items-end gap-16 lg:gap-24 text-right">
            {/* Quick Enquiry */}
            <div className="flex flex-col items-end">
              <h3 className="font-primary text-[22px] md:text-[26px] text-secondary mb-3 leading-tight">
                Quick Enquiry
              </h3>
              <p className="text-[17px] md:text-[21px] text-text font-normal tracking-wide font-body">
                <a
                  href="tel:04862204400"
                  className="hover:text-primary transition-colors"
                >
                  04862 204400
                </a>
                <span className="mx-2 text-gray-300">|</span>
                <a
                  href="tel:+917510200444"
                  className="hover:text-primary transition-colors"
                >
                  +91 75102 00444
                </a>
                <span className="mx-2 text-gray-300">|</span>
                <a
                  href="tel:+918086200404"
                  className="hover:text-primary transition-colors"
                >
                  +91 80862 00404
                </a>
              </p>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col items-end">
              <h3 className="font-primary text-[22px] md:text-[26px] text-secondary mb-3 leading-tight">
                Follow Us
              </h3>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary border border-gray-100 shadow-sm hover:bg-primary hover:text-white transition-all"
                >
                  <i className="lab la-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary border border-gray-100 shadow-sm hover:bg-primary hover:text-white transition-all"
                >
                  <i className="lab la-facebook-f text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary border border-gray-100 shadow-sm hover:bg-primary hover:text-white transition-all"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-16">
          {/* Contact Us */}
          <div>
            <h3 className="font-primary text-[28px] text-secondary mb-8 leading-tight">
              Contact Us
            </h3>
            <div className="space-y-4 text-text text-[15.5px] leading-relaxed font-body">
              <p>
                Kudayathoor P.O., Thodupuzha Idukki District,
                <br />
                Kerala, India – 685 590
              </p>
              <p>
                Phone: 04862 204400 +91 75102 00444
                <br />
                +91 80862 00404
              </p>
              <p>Email: reservations@malankarapalace.com</p>
            </div>
          </div>

          {/* Rooms & Suites */}
          <div>
            <h3 className="font-primary text-[28px] text-secondary mb-8 leading-tight">
              Rooms & Suites
            </h3>
            <ul className="space-y-3.5 text-[15.5px] font-body">
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
            <h3 className="font-primary text-[28px] text-secondary mb-8 leading-tight">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-[15.5px] font-body">
              {[
                { label: "Our Story", href: "/our-story" },
                { label: "Facilities", href: "/facilities" },
                { label: "Experiences", href: "/experiences" },
                { label: "Dining", href: "/dining" },
                { label: "Nearby Destinations", href: "/experiences" },
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
            <h3 className="font-primary text-[28px] text-secondary mb-8 leading-tight">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-[15.5px] font-body">
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
        <div className="flex flex-col md:flex-row justify-between items-center text-[15px] font-body text-gray-600">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} Malankara Palace Lake View Resort & Spa. All
            rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/terms-conditions"
              className="hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/booking-policy"
              className="hover:text-primary transition-colors"
            >
              Booking Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
