"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";

const CORPORATE_SERVICES = [
  {
    id: 1,
    title: "Banquet Hall – Up to 60 Guests",
    description:
      "A well-appointed indoor hall suitable for meetings, conferences, presentations, and workshops. The space can be arranged in different seating styles to suit the nature and scale of the event.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Outdoor Lakeside Lawn",
    description:
      "A scenic open-air venue by the lake, ideal for networking sessions, team activities, informal gatherings, and corporate get-togethers in a relaxed environment.",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Food & Beverages",
    description:
      "Thoughtfully curated food and beverage services offering a range of flavours to suit your celebration. From traditional favourites to customised menus, our culinary team ensures every meal is memorable and served with care.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Event Arrangements & Support",
    description:
      "End-to-end support for your corporate gatherings, including venue coordination, décor planning, guest arrangements, food and beverage management, and personalised assistance for a seamless experience.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function CorporatePage() {
  return (
    <main className="relative min-h-screen bg-white">
      <MetaSEO slug="corporate" />
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1517457373958-b7bdd058a54d?q=80&w=2069&auto=format&fit=crop"
          alt="Business Gatherings by Nature"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-prata text-white mb-6 leading-tight">
              Business Gatherings by Nature
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed">
              A scenic setting for professional meetings and team engagements.
            </p>
          </div>
        </div>
      </section>
      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-prata text-secondary mb-8 leading-tight">
              A refreshing alternative to conventional
              <br className="hidden md:block" /> meeting spaces.
            </h2>
            <p className="text-text text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
              A peaceful lakeside setting for focused meetings and meaningful
              corporate gatherings. At Malankara Palace Lake View Resort & Spa,
              corporate events move beyond conventional boardrooms. Surrounded
              by calm waters and open skies, the resort offers an environment
              that encourages clarity, collaboration, and fresh thinking – ideal
              for meetings, workshops, and corporate getaways.
            </p>
          </div>
        </div>
      </section>

      {/* Venue Grid Section */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {CORPORATE_SERVICES.map((service) => (
              <div key={service.id} className="flex flex-col">
                <div className="relative h-[400px] w-full mb-8 group overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-3xl font-prata text-secondary mb-6 font-medium">
                  {service.title}
                </h3>
                <p className="text-text text-lg font-light leading-relaxed text-justify">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
