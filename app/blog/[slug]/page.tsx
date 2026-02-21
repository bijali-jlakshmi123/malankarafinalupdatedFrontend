"use client";

import { useParams } from "next/navigation";
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
  content: string;
  image: { url: string };
  category: string;
  date: string;
  slug: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Malankara Dam: History, Location & Why It’s a Hidden Gem of Idukki",
    heroTitle: "A Tranquil Lakeside Escape at Malankara Palace",
    heroSubtitle: "Idukki Hill Stations, Idukki Tourist Destinations",
    excerpt: "Discover the history and serene beauty of Malankara Dam.",
    content: `
      <p><strong>Malankara Dam</strong> is one of Idukki's most quietly significant landmarks, shaping both the region's landscape and its way of life for decades. Unlike many destinations that announce themselves loudly, Malankara reveals its beauty slowly — through still waters, open skies, and an atmosphere that feels deeply connected to time and nature.</p>
      <p>Built as part of the <strong>Moolamattom Hydroelectric Project</strong>, Malankara Dam was designed to manage water released from the Moolamattom powerhouse. Its primary purpose was functional: supporting irrigation, regulating water flow, and contributing to Kerala's power and water management systems. Yet over the years, what began as an engineering initiative evolved into something far more profound — a vast, serene reservoir that today defines the identity of Malankara.</p>
      <h2>The Landscape Before the Dam</h2>
      <p>Before the construction of Malankara Dam, the area was shaped by the natural flow of the Thodupuzha River, agricultural lands, and scattered settlements. Life followed the rhythm of farming, seasonal rains, and riverbanks that supported daily needs. The landscape was productive, but modest — defined more by function than by scenic scale.</p>
      <p>When the dam was built and the reservoir began to form, the transformation was gradual yet dramatic. Riverbanks widened, water levels rose, and the surrounding terrain adjusted to a new equilibrium. Over time, the flowing river gave way to a broad expanse of still water, bordered by gentle hills, open grasslands, and pockets of greenery that now stretch as far as the eye can see.</p>
      <h2>A Reservoir That Changed More Than Geography</h2>
      <p>The formation of the Malankara Reservoir reshaped more than just the physical landscape. The presence of a large, calm water body altered the region's ecological balance in meaningful ways. Birdlife began to thrive along the shores, aquatic ecosystems developed steadily, and vegetation around the reservoir grew denser and more diverse.</p>
      <p>This balance between water, land, and life created an environment that feels naturally soothing. The reservoir does not overwhelm the senses; instead, it invites quiet observation. Reflections of clouds drift across the water, the wind carries gentle ripples, and the surrounding hills stand watch in calm stillness.</p>
      <h2>Harmony Between Development and Nature</h2>
      <p>Malankara Dam stands as an example of how development, when thoughtfully executed, can coexist with nature rather than overpower it. While the dam continues to serve its practical purpose in irrigation and water regulation, the reservoir has taken on a life of its own — becoming a space of calm, balance, and visual harmony.</p>
    `,
    image: { url: "/images/hero-1.jpg" },
    category: "Destination",
    date: "June 20, 2024",
    slug: "malankara-dam-history",
  },
  {
    id: 2,
    title: "Illickal Kallu in Kerala: A Scenic Escape in the High Range",
    heroTitle: "A Tranquil Lakeside Escape at Malankara Palace",
    heroSubtitle: "Uncategorized",
    excerpt:
      "Often described as a place above the clouds, Illickal Kallu attracts travellers who seek quiet beauty and raw landscapes.",
    content: `
      <p><strong>Illickal Kallu</strong> is one of the most breathtaking natural viewpoints in the high ranges of Kerala, rising dramatically above rolling hills and deep valleys. Located near the border of Idukki and Kottayam districts, this iconic rock formation offers sweeping views, cool mountain air, and a sense of openness that feels both powerful and calming. Often described as a place above the clouds, Illickal Kallu attracts travellers who seek quiet beauty and raw landscapes rather than crowded tourist attractions.</p>

      <p>The landscape of Illickal Kallu is shaped by height, wind, and time. Steep cliffs, narrow pathways, and vast open horizons define the terrain, creating an atmosphere that feels untamed and elemental. On clear days, layers of green hills stretch endlessly into the distance, while misty days transform the surroundings into a dreamlike scene where clouds drift gently across the rocks. The cool breeze and open terrain offer a refreshing contrast to the warmer lowlands below, making every visit feel invigorating.</p>

      <p>Illickal Kallu is best known for its massive rock formations, including the famous “Half Rock,” a natural feature that appears as though a section of the mountain has been split away. These dramatic formations give the viewpoint its unique character and visual impact. Walking along the paths near the rocks allows visitors to experience panoramic views while finding quiet spaces to pause, reflect, and absorb the scenery at their own pace.</p>

      <p>Beyond its visual beauty, Illickal Kallu offers a sense of stillness and perspective. Standing at such a height, surrounded by open sky and expansive land below, creates moments of clarity and calm that are difficult to describe. The noise of everyday life fades, replaced by wind, silence, and the steady rhythm of nature. It is this quiet emotional connection that makes Illickal Kallu more than just a sightseeing spot.</p>

      <p>Reaching Illickal Kallu is part of the experience itself. The destination is accessible by road and is best approached via a scenic drive through the high ranges. From <strong>Thodupuzha</strong>, Illickal Kallu is approximately <strong>55–60 kilometres</strong>, with a travel time of around <strong>2 to 2.5 hours</strong>, depending on traffic and road conditions. The route winds through hillside roads, forest stretches, and panoramic viewpoints, offering glimpses of the region’s natural charm long before you reach the summit. The final stretch involves a narrow mountain road, adding a sense of adventure and reward to the journey. Early morning or late afternoon visits are ideal, especially for clear views and pleasant weather, while travellers are advised to check conditions during the monsoon season.</p>

      <p>Illickal Kallu is often explored as part of a broader journey through the high ranges of Idukki and nearby regions. The surrounding area reveals hidden waterfalls, mist-covered hilltops, and quiet countryside roads that showcase a slower, more authentic side of Kerala. Rather than rushing from one attraction to another, visitors are encouraged to take their time, letting the journey unfold naturally.</p>

      <p>For those looking to explore Illickal Kallu without compromising on comfort, staying near calm surroundings makes all the difference. <strong>Malankara Palace Lake View Resort & Spa</strong>, located near <strong>Kudayathoor</strong>, offers a peaceful lakeside base from which to explore destinations like Illickal Kallu. After a day spent above the clouds, guests can return to still waters, open skies, and refined comfort, allowing the experience to feel complete and unhurried.</p>

      <p>Illickal Kallu is not a destination for rushed travel. It invites visitors to slow down, breathe deeply, and appreciate nature in its purest form. Whether you arrive to capture photographs, enjoy the cool mountain air, or simply stand quietly above the clouds, the experience feels personal and lasting. Explore the heights of Illickal Kallu, and let <strong>Malankara Palace Lake View Resort & Spa</strong> be your serene retreat as you discover the timeless beauty of Idukki’s high ranges.</p>
    `,
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
    heroTitle: "A Tranquil Lakeside Escape at Malankara Palace",
    heroSubtitle: "Idukki Hill Stations, Idukki Tourist Destinations",
    excerpt:
      "Experience a peaceful spiritual journey across the Vayanakkavu Bridge to the historic temple.",
    content: `
      <p><strong>Vayanakkavu Temple</strong> is a peaceful spiritual landmark located in <strong>Kudayathoor</strong>, beautifully set along the calm waters of the <strong>Malankara Reservoir</strong>. Surrounded by still waters, open skies, and quiet surroundings, the temple offers an experience where faith, nature, and everyday life come together effortlessly.</p>

      <p>What makes a visit to Vayanakkavu Temple truly special is not just the destination, but the journey itself. The approach to the temple takes visitors across the <strong>Vayanakkavu Bridge</strong>, a scenic crossing over the Malankara reservoir that offers uninterrupted views of the lake and surrounding landscape. The bridge has become one of the most visually calming spots in the region, where reflections of the sky ripple gently across the water and the pace of life naturally slows down.</p>

      <p>Walking across the bridge, especially during the early morning hours, is a deeply refreshing experience. Cool air, soft light, and the quiet movement of water create an atmosphere that clears the mind even before reaching the temple. Many visitors pause here to take in the views, capture photographs, or simply stand in silence and absorb the calm. During sunrise and sunset, the bridge is especially beautiful, with warm hues spreading across the reservoir and distant hills.</p>

      <p>For guests staying at <strong>Malankara Palace Lake View Resort & Spa</strong>, Vayanakkavu Temple is remarkably close — just <strong>around 1.5 kilometres</strong> from the resort. This makes it ideal for a <strong>peaceful morning or evening walk</strong> along the lakeside. The walk itself becomes a mindful experience, offering scenic views, gentle exercise, and moments of quiet reflection that set a positive tone for the day.</p>

      <p>The temple reflects simplicity and long-standing tradition. Daily rituals, the soft sound of temple bells, and the presence of local devotees create an atmosphere of steady devotion. Set against the backdrop of water and greenery, the temple feels naturally connected to its surroundings, offering visitors a space for prayer, gratitude, or quiet contemplation without distraction.</p>

      <p>Morning visits are especially recommended. As mist often lingers over the reservoir and birds move gently across the water, the entire area feels unhurried and calm. Even for travellers who are not on a religious journey, the combination of the walk, the bridge, the lake views, and the serene temple setting makes the experience deeply rewarding.</p>

      <p>Beyond its spiritual importance, Vayanakkavu Temple has become a quiet point of interest for travellers exploring the Malankara region. The scenic bridge, reservoir views, and walkable access from nearby stays make it ideal for slow travel, photography, and those seeking meaningful local experiences away from crowded attractions.</p>

      <p>Exploring Vayanakkavu Temple is about more than visiting a place of worship. It is about experiencing Malankara at its most peaceful — walking by calm waters, crossing a beautiful bridge, observing everyday life, and returning with a sense of balance and clarity.</p>

      <p>Stay at <strong>Malankara Palace Lake View Resort & Spa</strong>, take a gentle walk along the reservoir, cross the scenic Vayanakkavu Bridge, and discover a moment of stillness where faith and nature meet in perfect harmony.</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop",
    },
    category: "Spiritual",
    date: "August 12, 2024",
    slug: "vayanakkavu-temple-walk",
  },
  {
    id: 4,
    title: "Ilaveezhapoonchira: A Vast Open Valley Above the Clouds",
    heroTitle: "A Tranquil Lakeside Escape at Malankara Palace",
    heroSubtitle: "Idukki Hill Stations, Idukki Tourist Destinations",
    excerpt:
      "Discover the wide-open grasslands and dramatic skies of this unique high-range valley.",
    content: `
      <p><strong>Ilaveezhapoonchira</strong> is one of the most striking and unique landscapes in the high ranges of Kerala. Located near the borders of Idukki and Kottayam districts, this expansive valley is known for its wide-open grasslands, dramatic skies, and an overwhelming sense of space that feels both humbling and peaceful. Unlike typical hill stations defined by viewpoints and crowds, Ilaveezhapoonchira offers something rarer — openness, silence, and a deep connection to nature.</p>

      <p>The name Ilaveezhapoonchira loosely translates to “a valley where leaves do not fall,” a reference to its rocky terrain and vast grass-covered plains. Set at a high altitude and surrounded by hill ranges, the valley opens up in all directions, offering uninterrupted views that stretch far beyond the horizon. On clear days, the landscape appears endless, while on misty days, clouds roll gently across the valley floor, creating an almost otherworldly atmosphere.</p>

      <p>One of the defining features of Ilaveezhapoonchira is the absence of dense tree cover in the central valley. This openness allows the sky to dominate the experience. Sunlight, shadows, clouds, and wind become part of the scenery, constantly reshaping the view. The changing weather adds drama and beauty — bright mornings, windy afternoons, and golden sunsets that transform the valley into a canvas of shifting colours.</p>

      <p>Ilaveezhapoonchira is also known for its seasonal rain-fed ponds that appear during the monsoon months. These natural water bodies reflect the sky and surrounding hills, enhancing the valley’s visual appeal and creating tranquil spots for quiet observation. During this season, the grasslands turn lush green, and the entire landscape feels alive with movement and freshness.</p>

      <p>The journey to Ilaveezhapoonchira is as memorable as the destination itself. Winding mountain roads, narrow stretches, and scenic viewpoints along the way offer glimpses of the high ranges at their most raw and beautiful. The drive demands patience and care, but rewards travellers with an experience that feels far removed from urban life and routine travel routes.</p>

      <p>What sets Ilaveezhapoonchira apart is the feeling it leaves behind. Standing in the open valley, surrounded by vastness and silence, creates a sense of clarity and calm. It is a place that invites visitors to slow down, breathe deeply, and simply be present. Whether you are drawn by photography, nature walks, or quiet contemplation, the experience feels deeply personal and unhurried.</p>

      <p>The best time to visit Ilaveezhapoonchira is during the early morning or late afternoon, when the light is soft and the atmosphere is most comfortable. Post-monsoon months offer lush greenery and dramatic skies, while summer months provide clear views and cooler temperatures compared to the lowlands. Visitors are advised to check weather conditions before travelling, as fog and rain can affect visibility and road conditions.</p>

      <p>Ilaveezhapoonchira is often explored as part of a wider journey through the high ranges of Idukki and nearby regions. Combined with scenic drives, hidden viewpoints, and quiet village roads, the valley becomes part of a slow-travel experience rather than a quick stop.</p>

      <p>For travellers seeking a peaceful base while exploring such destinations, staying near calm surroundings makes all the difference. After experiencing the openness and windswept beauty of Ilaveezhapoonchira, returning to a serene lakeside setting allows the journey to end as gently as it began.</p>

      <p>Ilaveezhapoonchira is not a place that demands attention — it earns it through stillness, scale, and silence. It stands as a reminder of nature’s quiet power and the beauty of spaces left largely untouched. For those exploring the high ranges of Kerala, Ilaveezhapoonchira offers an experience that stays with you long after the journey ends.</p>

      <h2>How to Reach Ilaveezhapoonchira</h2>

      <p><strong>Ilaveezhapoonchira</strong> is easily accessible from <strong>Malankara Palace Lake View Resort & Spa</strong>, making it a perfect day trip for travellers staying in Malankara. The scenic drive winds through rolling countryside and gentle hills, offering glimpses of the high ranges before you arrive at the open valley.</p>

      <p>From the resort, Ilaveezhapoonchira is approximately <strong>12 km</strong> away. The journey typically takes around <strong>30–35 minutes</strong> by car, depending on traffic and road conditions. Guests can enjoy a relaxed morning departure, arrive with plenty of time to explore the valley under open skies, and return comfortably to Malankara Palace for a serene evening by the lake.</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    },
    category: "Hill Station",
    date: "September 05, 2024",
    slug: "ilaveezhapoonchira-open-valley",
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const foundPost = FALLBACK_POSTS.find((p) => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-prata mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary hover:underline">
            Return to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-white font-sarabun">
      <MetaSEO slug={`blog/${post.slug}`} />
      <Header transparent />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-end">
        <Image
          src={post.image.url}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-7xl font-prata text-white mb-6 leading-tight drop-shadow-lg">
              {post.heroTitle || post.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/95 font-light tracking-wide drop-shadow-md">
              {post.heroSubtitle || post.category}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Main Content Title */}
            <h1 className="text-4xl md:text-6xl font-prata text-secondary mb-16 leading-tight">
              {post.title}
            </h1>

            {/* Rich Text Content */}
            <div
              className="prose prose-xl max-w-none text-[#4A4A4A] leading-[1.8] font-light
                prose-headings:font-prata prose-headings:text-secondary prose-headings:font-medium
                prose-p:mb-10 prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
                prose-strong:font-bold prose-strong:text-secondary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post Footer: Tags & Share */}
            <div className="mt-20 pt-10 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Post tags :</span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-medium">Share this :</span>
                  <div className="flex items-center space-x-3">
                    <button
                      className="hover:text-primary transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.411h2.94v-2.515c0-2.915 1.779-4.5 4.377-4.5 1.244 0 2.315.093 2.626.134v3.045h-1.803c-1.414 0-1.688.672-1.688 1.658v2.173h3.371l-.439 3.411h-2.932v8.74h6.002c.731 0 1.323-.593 1.323-1.324v-21.351c0-.732-.592-1.325-1.323-1.325z" />
                      </svg>
                    </button>
                    <button
                      className="hover:text-primary transition-colors"
                      aria-label="Share on X"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      className="hover:text-primary transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 mb-20">
              <Link
                href="/blog"
                className="inline-flex items-center space-x-3 text-secondary hover:text-primary transition-colors group"
              >
                <svg
                  className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
