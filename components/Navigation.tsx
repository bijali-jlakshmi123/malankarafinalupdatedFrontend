'use client';

import { useEffect, useState } from 'react';
import { NavigationItem, SiteSettings, getNavigationItems, getSiteSettings } from '@/lib/api';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const [menuItems, setMenuItems] = useState<NavigationItem[]>([
    { id: 1, label: 'Home', href: '/', active: true },
    { id: 2, label: 'Rooms & Suites', href: '/rooms' },
    { id: 3, label: 'Facilities', href: '/facilities' },
    { id: 4, label: 'Dining', href: '/dining' },
    { id: 5, label: 'Experiences', href: '/experiences' },
    { id: 6, label: 'Wedding & Events', href: '/wedding-events' },
    { id: 7, label: 'Gallery', href: '/gallery' },
    { id: 8, label: 'Our Story', href: '/our-story' },
    { id: 9, label: 'Contact Us', href: '/contact' },
  ]);

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([
    '04862 204400',
    '+91 75102 00444',
    '+91 80862 00404',
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [navItems, settings] = await Promise.all([
          getNavigationItems(),
          getSiteSettings(),
        ]);

        if (navItems.length > 0) {
          setMenuItems(navItems);
        }

        if (settings?.phoneNumbers) {
          setPhoneNumbers(Array.isArray(settings.phoneNumbers) ? settings.phoneNumbers : []);
        }
      } catch (error) {
        console.error('Error loading navigation data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-8 pb-8">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id || item.href}>
                  <a
                    href={item.href}
                    className={`block py-3 px-4 text-lg font-medium transition-colors duration-200 ${
                      item.active || item.isActive
                        ? 'text-purple-600'
                        : 'text-gray-800 hover:text-purple-600'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Book Now Button */}
          <div className="px-8 pb-6">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 px-6 rounded-md font-semibold text-lg transition-colors duration-200">
              BOOK NOW
            </button>
          </div>

          {/* Contact Information */}
          <div className="px-8 pb-8">
            <div className="flex items-start space-x-3 text-purple-600">
              <svg
                className="w-6 h-6 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="flex flex-col space-y-1">
                {phoneNumbers.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
