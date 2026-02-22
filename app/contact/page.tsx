"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

// Fallback distances shown when Strapi has no data
const FALLBACK_DISTANCES = [
  {
    destination: "Vagamon",
    distance: "25 kms",
    time: "1 hr",
    category: "Nearby Town",
  },
  {
    destination: "Thekkady",
    distance: "40 kms",
    time: "1½ hrs",
    category: "Nearby Town",
  },
  {
    destination: "Kottayam",
    distance: "60 kms",
    time: "1½ hrs",
    category: "Major Town",
  },
  {
    destination: "Kumarakom",
    distance: "75 kms",
    time: "2 hrs",
    category: "Major Town",
  },
  {
    destination: "Munnar",
    distance: "91 kms",
    time: "3½ hrs",
    category: "Major Town",
  },
  {
    destination: "Kochi City",
    distance: "94 kms",
    time: "2½ hrs",
    category: "Major Town",
  },
  {
    destination: "Madurai",
    distance: "170 kms",
    time: "4 hrs",
    category: "Major Town",
  },
  {
    destination: "Trivandrum",
    distance: "186 kms",
    time: "4½ hrs",
    category: "Major Town",
  },
  {
    destination: "Kochi Airport (COK)",
    distance: "98 kms",
    time: "3 hrs",
    category: "Primary Airport",
  },
  {
    destination: "Kottayam Station",
    distance: "60 kms",
    time: "1½ hrs",
    category: "Nearest Railway",
  },
  {
    destination: "Piravom Road",
    distance: "52 kms",
    time: "1 hr 15 min",
    category: "Nearby Railway",
  },
  {
    destination: "Ernakulam (ERS/ERN)",
    distance: "92 kms",
    time: "2½ hrs",
    category: "Major Railway Hub",
  },
  {
    destination: "Angamaly Station",
    distance: "102 kms",
    time: "3 hrs",
    category: "Major Railway Hub",
  },
];

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop";
const FALLBACK_CONNECT_IMAGE =
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop";
const FALLBACK_MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15712.564560737!2d76.7849375!3d9.8286875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07c70030d7a1d5%3A0xa15bab4e2007ca5a!2sMalankara%20Palace%20Lake%20View%20Resort%20%26%20Spa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

export default function ContactPage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const res = await fetch("/api/contact-page");
        if (res.ok) {
          const data = await res.json();
          if (data) setPageData(data);
        }
      } catch (error) {
        console.error("Error fetching contact page data:", error);
      }
    }
    fetchPageData();
  }, []);

  // Use Strapi data if available, otherwise use fallbacks
  const heroImage = pageData?.heroImage?.url || FALLBACK_HERO_IMAGE;
  const heroTitle = pageData?.heroTitle || "We're Here to Help";
  const heroSubtitle =
    pageData?.heroSubtitle ||
    "Have a question or booking request? Our team is ready to assist you.";
  const connectImage = pageData?.connectImage?.url || FALLBACK_CONNECT_IMAGE;
  const connectTitle =
    pageData?.connectTitle || "Connect With Us for a Perfect Stay You & Family";
  const mapUrl = pageData?.mapEmbedUrl || FALLBACK_MAP_URL;
  const distances =
    pageData?.distances && pageData.distances.length > 0
      ? pageData.distances
      : FALLBACK_DISTANCES;

  return (
    <main className="relative min-h-screen bg-white">
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end">
        <Image
          src={heroImage}
          alt="Contact Us - Malankara Palace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-prata text-white mb-4 leading-tight">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>
      {/* Contact Form Section */}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-stretch">
              {/* Left side: Image */}
              <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[400px]">
                <Image
                  src={connectImage}
                  alt="Malankara Palace"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right side: Form */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl md:text-5xl font-prata text-secondary mb-10 leading-tight">
                    {connectTitle}
                  </h2>

                  <ValidatedContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="w-full h-[450px] relative shadow-sm">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Distances Table Section */}
      <section className="pt-16 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* ADD THIS WRAPPER */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-prata text-secondary font-medium mb-10">
              Distance from Major Towns &amp; Travel Hubs
            </h2>

            <div className="overflow-x-auto shadow-sm border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-sm font-semibold text-secondary uppercase tracking-wider border border-gray-200">
                      Destination / Gateway
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-secondary uppercase tracking-wider border border-gray-200">
                      Distance
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-secondary uppercase tracking-wider border border-gray-200">
                      Estimated Time
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-secondary uppercase tracking-wider border border-gray-200">
                      Category
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {distances.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-bold text-secondary border border-gray-200">
                        {item.destination}
                      </td>
                      <td className="px-6 py-4 text-sm text-text border border-gray-200">
                        {item.distance}
                      </td>
                      <td className="px-6 py-4 text-sm text-text border border-gray-200">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 text-sm text-text border border-gray-200">
                        {item.category}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* END WRAPPER */}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ValidatedContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "",
    checkIn: "",
    checkOut: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.guests) newErrors.guests = "Number of guests is required";
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        guests: "",
        checkIn: "",
        checkOut: "",
        message: "",
      });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border ${errors[field] ? "border-red-500" : "border-gray-300"} rounded-none focus:outline-none focus:border-[#702C8B] transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-text">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          suppressHydrationWarning
          className={inputClass("fullName")}
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs">{errors.fullName}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          suppressHydrationWarning
          className={inputClass("email")}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            suppressHydrationWarning
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text">No. of Guests</label>
          <input
            type="text"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="No. of Guests"
            suppressHydrationWarning
            className={inputClass("guests")}
          />
          {errors.guests && (
            <p className="text-red-500 text-xs">{errors.guests}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text">Check-in Date</label>
          <input
            type="text"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            placeholder="Check-in Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            suppressHydrationWarning
            className={inputClass("checkIn")}
          />
          {errors.checkIn && (
            <p className="text-red-500 text-xs">{errors.checkIn}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text">
            Check-out Date
          </label>
          <input
            type="text"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            placeholder="Check-out Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            suppressHydrationWarning
            className={inputClass("checkOut")}
          />
          {errors.checkOut && (
            <p className="text-red-500 text-xs">{errors.checkOut}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text">Message</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          suppressHydrationWarning
          className={`${inputClass("message")} resize-none`}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        suppressHydrationWarning
        className="bg-[#702C8B] text-white px-12 py-4 rounded-none font-medium uppercase tracking-widest hover:bg-[#5a2370] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {status === "success" && (
        <p className="text-green-600 font-medium">
          Thank you! Your message has been sent.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 font-medium">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
