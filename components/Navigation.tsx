"use client";

import { useEffect, useState } from "react";
import { NavigationItem, getNavigationItems, getSiteSettings } from "@/lib/api";

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const [menuItems, setMenuItems] = useState<NavigationItem[]>([
    { id: 1, label: "Home", href: "/", isActive: true },
    { id: 2, label: "Rooms & Suites", href: "/rooms" },
    { id: 3, label: "Facilities", href: "/facilities" },
    { id: 4, label: "Dining", href: "/dining" },
    { id: 5, label: "Experiences", href: "/experiences" },
    { id: 6, label: "Wedding & Events", href: "/wedding-events" },
    { id: 7, label: "Gallery", href: "/gallery" },
    { id: 8, label: "Our Story", href: "/our-story" },
    { id: 9, label: "Contact Us", href: "/contact" },
  ]);

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([
    "04862 204400",
    "+91 75102 00444",
    "+91 80862 00404",
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [navItems, settings] = await Promise.all([
          getNavigationItems(),
          getSiteSettings(),
        ]);

        if (navItems?.length) setMenuItems(navItems);

        if (settings?.phoneNumbers) {
          const numbers = Array.isArray(settings.phoneNumbers)
            ? settings.phoneNumbers
            : [settings.phoneNumbers];
          setPhoneNumbers(numbers);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-full sm:w-[380px] bg-[#f5f3ef] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Full height layout */}
        <div className="flex flex-col justify-between h-full">
          {/* Top Section */}
          <div>
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-600 hover:text-[#7a2d8a] hover:border-[#7a2d8a] transition"
              >
                <i className="la la-times text-xl"></i>
              </button>
            </div>

            {/* Menu */}
            <nav className="px-10">
              <ul className="space-y-5">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className={`block font-prata text-[22px] transition ${
                        item.isActive
                          ? "text-[#7a2d8a]"
                          : "text-[#374151] hover:text-[#7a2d8a]"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}

                {/* Book Button */}
                <li className="pt-4">
                  <button className="bg-[#7a2d8a] text-white px-8 py-4 font-semibold tracking-wide hover:bg-[#682577] transition">
                    BOOK NOW
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Bottom Section (Phone numbers fixed at bottom) */}
          <div className="px-10 pb-10">
            <div className="flex items-start gap-4">
              <i className="la la-phone text-[28px] text-[#7a2d8a] rotate-[135deg] mt-1"></i>

              <div className="text-[18px] text-[#374151] space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={`tel:${phoneNumbers[0]}`}
                    className="hover:text-[#7a2d8a]"
                  >
                    {phoneNumbers[0]}
                  </a>

                  <span className="text-gray-400">|</span>

                  <a
                    href={`tel:${phoneNumbers[1]}`}
                    className="hover:text-[#7a2d8a]"
                  >
                    {phoneNumbers[1]}
                  </a>
                </div>

                <a
                  href={`tel:${phoneNumbers[2]}`}
                  className="hover:text-[#7a2d8a] block"
                >
                  {phoneNumbers[2]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
