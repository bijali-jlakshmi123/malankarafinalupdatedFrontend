"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";
import Link from "next/link";
import Preloader from "@/components/Preloader";

interface RoomImage {
  url: string;
}

interface Room {
  id: number;
  title: string;
  slug: string;
  heroSlogan: string;
  heroSubtext: string;
  subtitle: string;
  description: string;
  image: RoomImage;
  gallery?: RoomImage[];
  beds?: string;
  size?: string;
  occupancy?: string;
  view?: string;
  amenities?: string[];
}

const FALLBACK_ROOMS: Room[] = [
  {
    id: 1,
    title: "The Lakeview Royal Suite",
    slug: "the-lakeview-royal-suite",
    heroSlogan: "Luxury living with a breathtaking 180° panoramic lake view.",
    heroSubtext:
      "A spacious luxury suite with a large private balcony offering uninterrupted 180° panoramic lake views and serene comfort.",
    subtitle: "A Panoramic Lakeview Luxury Experience",
    description:
      "The Lakeview Royal Suite offers a refined luxury stay with a breathtaking 180-degree panoramic view of the Illavizha Poonchira Hills and the serene Malankara Lake. Designed for guests who seek privacy, elegance, and uninterrupted scenic beauty, this suite blends spacious interiors with nature-led comfort.\n\nA huge private balcony overlooks the swimming pool and landscaped gardens, creating the perfect setting to unwind while staying connected to the surroundings. Large windows allow abundant natural light throughout the day, while evenings unfold with stunning sunset views that reflect beautifully across the lake.\n\nIdeal for couples and luxury travellers, The Lakeview Royal Suite is a space where calm mornings, golden evenings, and thoughtful details define the stay experience.",
    image: {
      url: "https://images.unsplash.com/photo-1591088398332-6177805c7460?q=80&w=2070&auto=format&fit=crop",
    },
    beds: "1 Large King Size Bed",
    size: "750 sq.ft",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1591088398332-6177805c7460?q=80&w=2070&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop",
      },
    ],
    amenities: [
      "Smart LED TV with Hotstar & Netflix",
      "Comfortable Seating & Table",
      "Tea/coffee station",
      "Mini Refrigerator",
      "Electronic Safe",
      "Premium Toiletries",
      "Hot & Cold water",
      "Air Conditioning",
      "Iron & Ironing Board",
      "Electric kettle",
      "Private Balcony",
      "Intercom",
      "Hair Dryer",
      "Door peephole",
    ],
  },
  {
    id: 2,
    title: "The Lakeview Presidential Suite",
    slug: "the-lakeview-presidential-suite",
    heroSlogan: "Presidential Comfort by the Lake",
    heroSubtext:
      "A Spacious Two-Bedroom Presidential Suite with Interconnected Rooms, Perfect for Families & Group Stays",
    subtitle:
      "A spacious presidential suite featuring two interconnected rooms and a long shared private balcony, designed for comfortable family stays.",
    description:
      "The Lakeview Presidential Suite is a spacious interconnected luxury accommodation designed for families and premium guests who value space, privacy, and scenic surroundings. Thoughtfully planned with comfort and functionality in mind, this suite features **two interconnected rooms with a single private entrance**, offering both togetherness and personal space within the same stay.\n\nA large shared private balcony connects both rooms and opens to beautiful panoramic views of Malankara Lake, along with garden and swimming pool views, and a partial view of the Illavizha Poonchira Hills. The elevated position and open outlook create a relaxed, airy atmosphere throughout the day.\n\nIdeal for families, small groups, and extended-stay guests, The Lakeview Presidential Suite combines scale, comfort, and refined lakeview living for a truly memorable stay experience.",
    image: {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      },
    ],
    beds: "2 King Size Bed",
    size: "910 sq.ft",
    occupancy: "4-5 Adults",
    view: "Panoramic Lake View",
    amenities: [
      "Smart LED TV with Hotstar & Netflix",
      "Comfortable Seating & Table",
      "Tea/coffee station",
      "Mini Refrigerator",
      "Electronic Safe",
      "Premium Toiletries",
      "Hot & Cold water",
      "Air Conditioning",
      "Iron & Ironing Board",
      "Electric kettle",
      "Private Balcony",
      "Intercom",
      "Hair Dryer",
      "Door peephole",
    ],
  },
  {
    id: 3,
    title: "The Lakeview Sunset Mirage",
    slug: "the-lakeview-sunset-mirage",
    heroSlogan: "Where Every Evening Becomes a Sunset Experience",
    heroSubtext:
      "A serene balcony room crafted for golden-hour views and relaxed stays.",
    subtitle: "Sunset Views. Lake Calm. Pure Relaxation.",
    description:
      "The Lakeview Sunset Mirage is a stylish and relaxing lake-facing room designed for guests who want to experience nature's colours at their finest. Carefully positioned to capture some of the most beautiful evening views, this room offers a calm and refreshing stay defined by light, openness, and scenic surroundings.\n\nThe private balcony overlooks Malankara Lake along with garden and swimming pool views, creating a layered landscape that changes throughout the day. As the sun sets, the sky and water glow with warm tones, turning everyday moments into memorable experiences.\n\nIdeal for couples and leisure travellers, The Lakeview Sunset Mirage blends comfort, simplicity, and visual beauty into a peaceful stay experience.",
    image: {
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop",
      },
    ],
    beds: "1 King Size Bed",
    size: "380 sq.ft",
    occupancy: "2 Adults",
    view: "Lake & Sunset View",
    amenities: [
      "Smart LED TV with Hotstar & Netflix",
      "Comfortable Seating & Table",
      "Tea/coffee station",
      "Mini Refrigerator",
      "Electronic Safe",
      "Premium Toiletries",
      "Hot & Cold water",
      "Air Conditioning",
      "Iron & Ironing Board",
      "Electric kettle",
      "Private Balcony",
      "Intercom",
      "Hair Dryer",
      "Door peephole",
    ],
  },
  {
    id: 4,
    title: "The Lakeview Premium Twin",
    slug: "the-lakeview-premium-twin",
    heroSlogan: "Premium Twin Stay with Sunset Outlook",
    heroSubtext:
      "A premium twin-bed room with a private balcony offering peaceful lake, garden, and sunset views.",
    subtitle: "Refined Twin Comfort with Scenic Lake Views",
    description:
      "The Lakeview Premium Twin is a refined luxury accommodation designed for guests who value comfort, elegance, and a peaceful scenic setting. With its twin-bed configuration and thoughtfully planned layout, this room is ideal for friends, colleagues, and travellers who prefer shared space without compromising on privacy and comfort.\n\nThe private balcony overlooks Malankara Lake along with garden and swimming pool views, offering a calm and refreshing outlook throughout the day. Evenings are especially memorable, with soft sunset colours reflecting across the water and surrounding landscape.\n\nBlending premium interiors with nature-facing openness, The Lakeview Premium Twin delivers a relaxed and comfortable lakeview stay experience.",
    image: {
      url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2603&auto=format&fit=crop",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2603&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      },
    ],
    beds: "2 Single Bed",
    size: "380 sq.ft",
    occupancy: "2 Adults",
    view: "Lake & Garden View",
    amenities: [
      "Smart LED TV with Hotstar & Netflix",
      "Comfortable Seating & Table",
      "Tea/coffee station",
      "Mini Refrigerator",
      "Electronic Safe",
      "Premium Toiletries",
      "Hot & Cold water",
      "Air Conditioning",
      "Iron & Ironing Board",
      "Electric kettle",
      "Private Balcony",
      "Intercom",
      "Hair Dryer",
      "Door peephole",
    ],
  },
  {
    id: 5,
    title: "The Lakeview Executive Suite",
    slug: "the-lakeview-executive-suite",
    heroSlogan: "Executive Elegance with a View",
    heroSubtext:
      "Designed for the modern professional or discerning traveller, offering a sophisticated space with panoramic lake views.",
    subtitle: "A Sophisticated Executive Lakeview Stay",
    description:
      "The Lakeview Executive Suite is designed for those who appreciate refined elegance and a professional touch. Featuring a dedicated workspace and a spacious lounge area, this suite offers the perfect balance between productivity and relaxation.\n\nThe private balcony provides a quiet corner to enjoy your morning coffee while overlooking the serene Malankara Lake and the lush green hills. High-speed Wi-Fi and modern amenities ensure you stay connected, while the premium bedding guarantees a restful night's sleep.\n\nIdeal for business travellers and couples, the Executive Suite blends luxury with functionality for a truly seamless stay.",
    image: {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    },
    beds: "1 King Size Bed",
    size: "420 sq.ft",
    occupancy: "2 Adults",
    view: "Panoramic Lake View",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
      },
    ],
    amenities: [
      "Smart LED TV with Hotstar & Netflix",
      "Comfortable Seating & Table",
      "Tea/coffee station",
      "Mini Refrigerator",
      "Electronic Safe",
      "Premium Toiletries",
      "Hot & Cold water",
      "Air Conditioning",
      "Iron & Ironing Board",
      "Electric kettle",
      "Private Balcony",
      "Intercom",
      "Hair Dryer",
      "Door peephole",
    ],
  },
  {
    id: 6,
    title: "The Malankara Heritage Suite",
    slug: "the-malankara-heritage-suite",
    heroSlogan: "Preserving History in Luxury",
    heroSubtext:
      "A unique heritage experience that blends traditional architecture with modern luxury, offering the finest views of the palace grounds.",
    subtitle: "A Regal Heritage Experience",
    description:
      "The Malankara Heritage Suite is our most exclusive accommodation, paying homage to the rich history and culture of the region. Hand-crafted wooden interiors, antique furnishings, and traditional Kerala architecture create an atmosphere of regal comfort.\n\nThis suite features a sprawling private verandah that offers a 270-degree view of the Malankara Lake, the palace gardens, and the infinity pool. Every detail, from the ornate carvings to the curated artwork, tells a story of elegance and tradition.\n\nDesigned for guests who seek a truly unique and immersive stay, the Heritage Suite is the pinnacle of luxury at Malankara Palace.",
    image: {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    },
    beds: "1 Royal King Bed",
    size: "550 sq.ft",
    occupancy: "2 Adults",
    view: "270° Panoramic Lake View",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
      },
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
      },
    ],
    amenities: [
      "Smart LED TV with Hotstar & Netflix",
      "Comfortable Seating & Table",
      "Tea/coffee station",
      "Mini Refrigerator",
      "Electronic Safe",
      "Premium Toiletries",
      "Hot & Cold water",
      "Air Conditioning",
      "Iron & Ironing Board",
      "Electric kettle",
      "Private Balcony",
      "Intercom",
      "Hair Dryer",
      "Door peephole",
    ],
  },
];

const POLICIES = [
  {
    title: "Reservation & Confirmation",
    content: [
      "All reservations are subject to availability at the time of booking.",
      "Bookings are confirmed only after receipt of advance payment or successful online payment confirmation.",
      "Guests must carry a valid government-issued photo ID at check-in.",
    ],
  },
  {
    title: "Check-In & Check-Out",
    content: [
      "Standard check-in time is 02:00 PM and check-out time is 11:00 AM.",
      "Early check-in or late check-out is subject to availability and may incur additional charges.",
      "The resort reserves the right to charge for late check-outs at its discretion.",
    ],
  },
  {
    title: "Occupancy Policy",
    content: [
      "Standard occupancy is two persons per room.",
      "Maximum of one extra bed can be provided in selected room categories at an additional cost.",
      "Children below 6 years stay complimentary without an extra bed.",
    ],
  },
  {
    title: "Payment Policy",
    content: [
      "Advance payment is required to guarantee the reservation.",
      "The resort accepts all major credit/debit cards, UPI, and bank transfers.",
      "Full payment must be settled at the time of check-in or as per the booking terms.",
    ],
  },
  {
    title: "Cancellation Policy",
    content: [
      "Cancellations made 15 days prior to arrival will receive a 100% refund.",
      "Cancellations made 7–14 days prior to arrival will receive a 50% refund.",
      "No refund will be provided for cancellations made less than 7 days prior to arrival.",
    ],
  },
  {
    title: "No-Show Policy",
    content: [
      "In case of a no-show, the full amount for the entire stay will be charged.",
      "The reservation will be held until 06:00 PM on the day of arrival, after which it may be released.",
    ],
  },
  {
    title: "Amendment Policy",
    content: [
      "Amendments to stay dates are subject to availability and rate differences.",
      "Amendments made close to the arrival date may be treated as cancellations.",
    ],
  },
  {
    title: "Force Majeure",
    content: [
      "The resort is not liable for failures to perform obligations due to events beyond its control (natural disasters, government restrictions, etc.).",
    ],
  },
  {
    title: "Management Rights",
    content: [
      "The management reserves the right of admission and the right to ask any guest to leave if they violate resort rules.",
      "Management reserves the right to amend policies without prior notice.",
    ],
  },
];

export default function RoomDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    async function fetchRoom() {
      const foundRoom = FALLBACK_ROOMS.find((r) => r.slug === slug);

      if (foundRoom) setRoom(foundRoom);

      setLoading(false);
    }

    fetchRoom();
  }, [slug]);

  if (loading) {
    return <Preloader />;
  }

  if (!room) return null;

  return (
    <main className="relative min-h-screen bg-white font-sarabun">
      <MetaSEO slug={`rooms/${room.slug}`} />
      <Header transparent />
      {/* HERO SECTION (UNCHANGED) */}
      <section className="relative h-screen w-full flex items-end justify-start overflow-hidden">
        <Image
          src={room.image.url}
          alt={room.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-[68px] font-prata text-white mb-6 leading-[1.05] tracking-tight">
              {room.heroSlogan}
            </h1>

            <p className="text-base md:text-[20px] text-white/95 leading-relaxed max-w-2xl">
              {room.heroSubtext}
            </p>
          </div>
        </div>
      </section>
      {/* MAIN SECTION (LEFT & RIGHT SPACE ADDED HERE) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-6 md:mx-12 lg:mx-24">
            {/* LEFT SIDE */}

            <div className="flex flex-col">
              <h1 className="text-[48px] font-prata text-[#234958] mb-3 leading-tight tracking-tight">
                {room.title}
              </h1>

              <p className="text-[24px] font-prata font-medium text-black mb-10">
                {room.subtitle}
              </p>

              <div className="relative">
                <RoomImageSlider images={room.gallery || [room.image]} />
              </div>

              <div className="mt-12 space-y-8">
                {room.description.split("\n").map((para, idx) => {
                  if (!para.trim()) return null;

                  // Helper function to render text with BOLD tags
                  const renderWithBold = (text: string) => {
                    const parts = text.split(/(\*\*.*?\*\*)/g);
                    return parts.map((part, i) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={i} className="font-bold text-black">
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return part;
                    });
                  };

                  return (
                    <p
                      key={idx}
                      className="text-[18px] text-[#4A4A4A] leading-[1.8] font-sarabun text-justify"
                    >
                      {renderWithBold(para)}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col lg:pl-12">
              <div className="bg-[#f8f3d7] p-8 md:p-12 rounded-[4px] border border-[#F3E8C5]/30">
                {/* Room Details */}
                <h2 className="text-[32px] font-prata text-[#234958] mb-8">
                  Room Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div className="flex items-center gap-4 text-[#234958]">
                    <i className="las la-bed text-3xl"></i>
                    <span className="text-[16px] font-sarabun font-medium">
                      {room.beds || "1 Large King Size Bed"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[#234958]">
                    <i className="las la-expand-arrows-alt text-3xl"></i>
                    <span className="text-[16px] font-sarabun font-medium">
                      {room.size || "750 sq.ft"}
                    </span>
                  </div>
                </div>

                {/* Room Amenities */}
                <h2 className="text-[32px] font-prata text-[#234958] mb-8">
                  Room Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  {(
                    room.amenities || [
                      "Smart LED TV with Hotstar & Netflix",
                      "Comfortable Seating & Table",
                      "Tea/coffee station",
                      "Mini Refrigerator",
                      "Electronic Safe",
                      "Premium Toiletries",
                      "Hot & Cold water",
                      "Air Conditioning",
                      "Iron & Ironing Board",
                      "Electric kettle",
                      "Private Balcony",
                      "Intercom",
                      "Hair Dryer",
                      "Door peephole",
                    ]
                  ).map((amenity, index) => {
                    const getIcon = (text: string) => {
                      const lower = text.toLowerCase();
                      if (lower.includes("tv"))
                        return <i className="las la-tv text-2xl"></i>;
                      if (lower.includes("seating"))
                        return <i className="las la-chair text-2xl"></i>;
                      if (lower.includes("tea") || lower.includes("coffee"))
                        return <i className="las la-mug-hot text-2xl"></i>;
                      if (lower.includes("refrigerator"))
                        return <i className="las la-snowflake text-2xl"></i>;
                      if (lower.includes("safe"))
                        return <i className="las la-vault text-2xl"></i>;
                      if (lower.includes("toiletries"))
                        return <i className="las la-soap text-2xl"></i>;
                      if (lower.includes("water"))
                        return <i className="las la-faucet text-2xl"></i>;
                      if (lower.includes("conditioning"))
                        return <i className="las la-snowflake text-2xl"></i>;
                      if (lower.includes("iron"))
                        return <i className="las la-tshirt text-2xl"></i>;
                      if (lower.includes("kettle"))
                        return <i className="las la-coffee text-2xl"></i>;
                      if (lower.includes("balcony"))
                        return <i className="las la-door-open text-2xl"></i>;
                      if (lower.includes("intercom"))
                        return <i className="las la-phone text-2xl"></i>;
                      if (lower.includes("dryer"))
                        return <i className="las la-wind text-2xl"></i>;
                      if (lower.includes("peephole"))
                        return <i className="las la-eye text-2xl"></i>;
                      return <i className="las la-check-circle text-2xl"></i>;
                    };

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 text-[#234958]"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                          {getIcon(amenity)}
                        </div>
                        <span className="text-[15px] font-sarabun text-[#4A4A4A] leading-tight">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Resort Amenities */}
                <h2 className="text-[32px] font-prata text-[#234958] mt-16 mb-8">
                  Resort Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-12">
                  {[
                    {
                      icon: <i className="las la-swimming-pool text-3xl"></i>,
                      text: "Infinity Pool",
                    },
                    {
                      icon: <i className="las la-umbrella-beach text-3xl"></i>,
                      text: "Kids Pool",
                    },
                    {
                      icon: <i className="las la-wifi text-3xl"></i>,
                      text: "High-Speed WI-FI",
                    },
                    {
                      icon: <i className="las la-concierge-bell text-3xl"></i>,
                      text: "24/7 Front Desk",
                    },
                    {
                      icon: <i className="las la-utensils text-3xl"></i>,
                      text: "Room Service",
                    },
                    {
                      icon: <i className="las la-spa text-3xl"></i>,
                      text: "Wellness Spa",
                    },
                    {
                      icon: <i className="las la-gamepad text-3xl"></i>,
                      text: "Indoor Games",
                    },
                    {
                      icon: <i className="las la-utensils text-3xl"></i>,
                      text: "Multi-Cuisine Restaurant",
                    },
                    {
                      icon: <i className="las la-leaf text-3xl"></i>,
                      text: "Outdoor Games",
                    },
                    {
                      icon: <i className="las la-child text-3xl"></i>,
                      text: "Kids Play Area",
                    },
                    {
                      icon: <i className="las la-shuttle-van text-3xl"></i>,
                      text: "Pick-up & Drop",
                    },
                    {
                      icon: <i className="las la-video text-3xl"></i>,
                      text: "CCTV Surveillance",
                    },
                    {
                      icon: <i className="las la-tshirt text-3xl"></i>,
                      text: "Laundry Services",
                    },
                    {
                      icon: <i className="las la-parking text-3xl"></i>,
                      text: "Parking Area",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 text-[#234958]"
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-[15px] font-sarabun text-[#4A4A4A] leading-tight">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="#"
                  className="inline-flex items-center gap-3  bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-[4px] font-sarabun font-semibold tracking-wide transition-all duration-300 group"
                >
                  BOOK NOW
                  <i className="las la-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* BOOKING POLICY SECTION */}
      <section className="py-24 bg-[#fbfbfa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start mx-6 md:mx-12 lg:mx-24">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-3/5">
              <h2 className="text-4xl md:text-5xl font-prata text-black mb-12">
                Booking Policies & Stay Information
              </h2>

              <div className="divide-y bg-[#fbfbfa] border-t border-b border-gray-200 ">
                {POLICIES.map((policy, index) => (
                  <div key={policy.title} className="py-5 bg-[#fbfbfa]">
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className="w-full flex items-center justify-between text-left group bg-[#fbfbfa] hover:bg-[#fbfbfa] focus:bg-[#fbfbfa] active:bg-[#fbfbfa]"
                    >
                      <span
                        className={`text-xl transition-colors ${
                          openIndex === index
                            ? "text-black font-semibold"
                            : "text-black/80 group-hover:text-black"
                        }`}
                      >
                        {policy.title}
                      </span>

                      <svg
                        className={`w-5 h-5 text-black transform transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index
                          ? "max-h-96 opacity-100 mt-6"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-4 pl-0">
                        {policy.content.map((item, i) => (
                          <li
                            key={i}
                            className="text-black/70 text-[17px] leading-relaxed flex items-start gap-3"
                          >
                            <span className="text-black mt-1.5 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="w-full lg:w-2/5 relative h-[550px] lg:h-[750px]">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
                alt="Stay Information"
                fill
                className="object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function RoomImageSlider({ images }: { images: { url: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[3/2] overflow-hidden group">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative min-w-full h-full">
              <Image src={img.url} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white text-4xl bg-black/30 hover:bg-black/50 w-12 h-12 flex items-center justify-center rounded-full transition-all"
        >
          <i className="las la-angle-left"></i>
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white text-4xl bg-black/30 hover:bg-black/50 w-12 h-12 flex items-center justify-center rounded-full transition-all"
        >
          <i className="las la-angle-right"></i>
        </button>
      </div>

      {/* Pagination DOTS */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
