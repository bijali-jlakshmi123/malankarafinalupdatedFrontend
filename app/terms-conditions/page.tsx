"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";

export default function TermsConditionsPage() {
  return (
    <main className="relative min-h-screen bg-white font-sarabun">
      <MetaSEO slug="terms-conditions" />
      <Header transparent />

      {/* HERO SECTION - Matching Screenshot */}
      <section className="relative h-[80vh] w-full flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop"
          alt="Malankara Palace Exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-7xl font-prata text-white mb-6 drop-shadow-lg">
              A Tranquil Lakeside Escape at Malankara Palace
            </h1>
            <p className="text-lg md:text-2xl text-white/95 font-light drop-shadow-md">
              Wake up to calm waters, gentle breezes, and unforgettable moments
              by Malankara Dam.
            </p>
          </div>
        </div>
      </section>

      {/* TERMS & CONDITIONS CONTENT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-prata text-black mb-4">
              Terms & Conditions
            </h2>
            <p className="text-black/60 text-sm mb-12">Last Modified: Jan 29</p>
          </div>
          <div className="max-w-4xl">
            <p>
              Welcome to Malankara Palace Lake View Resort & Spa. These Terms &
              Conditions govern your access to and use of our website and
              services. By using our website, you agree to comply with these
              terms.
            </p>
          </div>
          <div className="space-y-12 text-black/80 text-lg leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-2xl font-prata text-black">
                Acceptance of Terms
              </h3>
              <p>
                By accessing and using the services of Malankara Palace Lake
                View Resort & Spa, you agree to be bound by these Terms &
                Conditions. These terms apply to all visitors, guests, and
                others who access or use our services.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-prata text-black">
                Use of the Website
              </h3>
              <p>
                Our website is intended to provide information about our resort
                and facilitate bookings. You agree not to use this site for any
                unlawful purpose or any purpose prohibited by these terms.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-prata text-black">
                Intellectual Property
              </h3>
              <p>
                All content on this website, including text, graphics, logos,
                images, and software, is the property of Malankara Palace or its
                content suppliers and is protected by international copyright
                laws.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-prata text-black">Guest Conduct</h3>
              <p>
                Guests are expected to conduct themselves in a respectful manner
                towards other guests and staff. The management reserves the
                right to terminate the stay of any guest whose conduct is deemed
                incompatible with the resort&apos;s atmosphere.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-prata text-black">
                Liability Disclaimer
              </h3>
              <p>
                Malankara Palace shall not be held liable for any loss, damage,
                or injury incurred by guests during their stay, unless such loss
                or damage is directly caused by the resort&apos;s gross
                negligence.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-prata text-black">Governing Law</h3>
              <p>
                These terms shall be governed by and construed in accordance
                with the laws of India. Any disputes arising from these terms
                shall be subject to the exclusive jurisdiction of the courts in
                Idukki, Kerala.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
