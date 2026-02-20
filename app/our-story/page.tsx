"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { OurStory, getOurStory } from "@/lib/api";
import MetaSEO from "@/components/MetaSEO";

export default function OurStoryPage() {
  const [story, setStory] = useState<OurStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOurStory();
        if (data) {
          setStory(data);
        } else {
          // Fallback
          setStory({
            id: 1,
            title: "A Lakeside Dream That Became a Destination",
            subtitle: "A lakeside family dream turned into a destination",
            mainContent:
              "Welcome to Malankara Palace Lake View Resort & Spa – a premium lakeside retreat created on the peaceful banks of the Malankara Reservoir. Surrounded by open water, green landscapes, and gentle hill views, the resort brings together scenic beauty, refined comfort, and warm hospitality in one setting. Located near Thodupuzha and within easy reach of Vagamon and Kochi International Airport, the property serves as a calm gateway to explore Idukki while enjoying a relaxed, luxury stay by the lake.",
            sideContent:
              "We invite you to slow down, breathe deeply, and create your own memories by the lake. Welcome to our story. Welcome to Malankara Palace.",
            videoUrl: "https://www.youtube.com/embed/sOxg2jCJMTQ",
            images: [
              {
                url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
              },
              {
                url: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b",
              },
              {
                url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
              },
              {
                url: "https://images.unsplash.com/photo-1544148103-0773bf10d330",
              },
              {
                url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
              },
              {
                url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
              },
              {
                url: "https://images.unsplash.com/photo-1596707328639-5a1d7f4ce9d3",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching story data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main className="bg-white min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-[60vh] text-gray-500 font-serif text-xl">
          Loading our story...
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-white">
      <MetaSEO slug="our-story" />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end">
        <Image
          src={
            story?.images[0]?.url ||
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          }
          alt="Our Story - Malankara Palace"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Our Story
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed">
              {story?.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 font-medium">
              {story?.title}
            </h2>
            <div
              className="space-y-6 text-gray-600 text-lg md:text-xl font-light leading-relaxed rich-text"
              dangerouslySetInnerHTML={{ __html: story?.mainContent || "" }}
            />
          </div>
        </div>
      </section>
      {/* Video Section */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto relative group">
            {!isPlaying ? (
              <div
                className="relative h-[300px] md:h-[600px] w-full cursor-pointer overflow-hidden rounded-sm shadow-xl"
                onClick={() => setIsPlaying(true)}
              >
                <Image
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=2070&auto=format&fit=crop" // Professional resort shot
                  alt="Malankara Palace Resort Video Preview"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-white fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-[300px] md:h-[600px] w-full rounded-sm overflow-hidden shadow-2xl">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/sOxg2jCJMTQ?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Detailed Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-10 font-medium">
              {story?.detailedStoryTitle || "The Story Behind the Place"}
            </h2>
            <div
              className="space-y-8 text-gray-600 text-lg md:text-xl font-light leading-relaxed rich-text"
              dangerouslySetInnerHTML={{ __html: story?.detailedStory || "" }}
            />
            {!story?.detailedStory && (
              <div className="space-y-8 text-gray-600 text-lg md:text-xl font-light leading-relaxed">
                <p>
                  This land was once the beloved family home of Mr. Innacent
                  Kuzhippilli & Mrs. Sigimol Innacent. Long before it welcomed
                  guests, it was where they built a life with their children –
                  waking up to lake breezes, spending quiet mornings by the
                  water, enjoying evening sunsets, and gathering together under
                  starlit skies.
                </p>
                <p>
                  Fishing trips at dawn, barbecue nights with laughter, peaceful
                  walks by the lake, and simple conversations at sunset filled
                  their days. The house was not grand, but it was rich in warmth
                  and meaning. Every corner held memories, and every season
                  brought its own quiet joy.
                </p>
                <p>
                  Over time, a gentle thought took shape —{" "}
                  <span className="italic font-medium text-gray-800">
                    what if this place could offer the same peace and happiness
                    to others?
                  </span>{" "}
                  What if families, couples, and travellers could experience the
                  calm that had meant so much to them?
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="relative group">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth"
          >
            {(story?.images && story.images.length > 0
              ? story.images.map((img) => img.url)
              : [
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1596707328639-5a1d7f4ce9d3?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
                ]
            ).map((img, idx) => (
              <div
                key={idx}
                className="flex-none w-[35vw] md:w-[15vw] h-[120px] md:h-[180px] relative"
              >
                <Image
                  src={img}
                  alt={`Story Image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Simple Chevron Style */}
          <button
            onClick={() => {
              if (sliderRef.current)
                sliderRef.current.scrollLeft -= window.innerWidth * 0.15;
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white z-10 hover:scale-125 transition-transform duration-300"
          >
            <svg
              className="w-5 h-5 drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              if (sliderRef.current)
                sliderRef.current.scrollLeft += window.innerWidth * 0.15;
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white z-10 hover:scale-125 transition-transform duration-300"
          >
            <svg
              className="w-5 h-5 drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>
      {/* From Home to Destination Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-10 font-medium">
              From Home to Destination
            </h2>
            <div className="space-y-8 text-gray-600 text-lg md:text-xl font-light leading-relaxed">
              <p>
                With care, patience, and respect for the land, the family slowly
                transformed their cherished home into a welcoming lakeside
                retreat. What was once a simple four-bedroom house evolved into
                a thoughtfully designed resort, while preserving the soul of the
                place — openness, calm, and connection to nature.
              </p>
              <p>
                Every room, balcony, and shared space was created to reflect the
                same feeling the family once enjoyed — comfort without rush,
                beauty without excess, and luxury that feels warm rather than
                formal. Today, the resort stands as a continuation of that story
                —{" "}
                <span className="font-medium text-gray-800">
                  not a replacement of the past, but an extension of it.
                </span>
              </p>
              <p>
                More than a place to stay, Malankara Palace is a place to feel
                at ease. Whether you arrive for a quiet holiday, a family
                gathering, a celebration, or a special milestone, you are
                welcomed with the same warmth that once filled this home.
              </p>
              <div className="pt-8 space-y-4">
                <p className="font-medium text-gray-900 uppercase tracking-wide text-base">
                  We invite you to slow down, breathe deeply, and create your
                  own memories by the lake.
                </p>
                <p className="text-gray-900 font-medium italic">
                  Welcome to our story. Welcome to Malankara Palace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
