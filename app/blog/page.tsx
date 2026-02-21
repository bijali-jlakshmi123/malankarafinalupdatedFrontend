"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import MetaSEO from "@/components/MetaSEO";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: { url: string };
  category: string;
  date: string;
  slug: string;
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Malankara Dam: History, Location & Why It’s a Hidden Gem of Idukki",
    excerpt: "",
    image: {
      url: "https://images.unsplash.com/photo-1590424560120-e2213759954d?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Destination",
    date: "June 20, 2024",
    slug: "malankara-dam-history",
  },
  {
    id: 2,
    title: "Illickal Kallu in Kerala: A Scenic Escape in the High Range",
    excerpt: "",
    image: {
      url: "https://images.unsplash.com/photo-1605153282210-9092822d3e0b?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Adventure",
    date: "July 05, 2024",
    slug: "illickal-kallu-scenic-escape",
  },
  {
    id: 3,
    title:
      "Vayanakkavu Temple, Kudayathoor: A Scenic Walk of Faith by the Malankara Reservoir",
    excerpt: "",
    image: {
      url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop",
    },
    category: "Culture",
    date: "August 12, 2024",
    slug: "vayanakkavu-temple-walk",
  },
  {
    id: 4,
    title: "Ilaveezhapoonchira: A Vast Open Valley Above the Clouds",
    excerpt: "",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Nature",
    date: "September 05, 2024",
    slug: "ilaveezhapoonchira-open-valley",
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_POSTS);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog-posts");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data);
          }
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      <MetaSEO slug="blog" />
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Travel Stories & Destination Guides"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-prata text-white mb-6 leading-tight">
              Travel Stories & Destination
              <br className="hidden md:block" /> Guides
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed">
              Discover local attractions, hidden spots, and travel
              <br className="hidden md:block" /> tips around the lake and hills.
            </p>
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-prata text-secondary leading-tight">
              Moments, Places & Meaningful Journeys
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col"
              >
                <div className="relative h-[250px] w-full mb-6 overflow-hidden">
                  <Image
                    src={post.image.url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-[22px] font-prata text-secondary mb-6 font-medium leading-relaxed">
                  {post.title}
                </h3>
                <div className="mt-auto">
                  <span className="text-secondary font-sarabun text-sm font-medium hover:text-primary transition-colors cursor-pointer border-b border-transparent hover:border-primary">
                    Read More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
