export interface HeroSlide {
  id: number;
  documentId?: string;
  title: string;
  subtitle?: string; // ✅ add this
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  order?: number;
  link?: string;
}

export interface NavigationItem {
  id: number;
  documentId?: string;
  label: string;
  href: string;
  order?: number;
  isActive?: boolean;
}

export interface SiteSettings {
  id: number;
  documentId?: string;
  logo?: {
    url: string;
  };
  phoneNumbers: string[] | string;
  bookNowUrl?: string;
  whatsappNumber?: string;
  siteName?: string;
  siteTagline?: string;
  address?: string;
  email?: string;
  socialLinks?: any;
}

export interface RoomsSuite {
  id: number;
  documentId?: string;
  title: string;
  subtitle?: string;
  description: any;
  image: {
    url: string;
    alternativeText?: string;
  };
  gallery?: {
    url: string;
    alternativeText?: string;
  }[];
  link?: string;
  order?: number;
}

export interface Dining {
  id: number;
  documentId?: string;
  title: string;
  subtitle?: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  link?: string;
  order?: number;
  features?: any;
}

export interface Facility {
  id: number;
  documentId?: string;
  title: string;
  description: string;
  image: { url: string };
  features?: string[];
  order?: number;
}

export interface Experience {
  id: number;
  documentId?: string;
  title: string;
  subtitle?: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  link?: string;
  order?: number;
  category?: string;
}

export interface Wellness {
  id: number;
  documentId?: string;
  title: string;
  subtitle?: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  link?: string;
  order?: number;
}

async function fetchAPI<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`/api/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

export async function getHeroSlides() {
  return fetchAPI<HeroSlide>("hero-slides");
}

export async function getNavigationItems() {
  return fetchAPI<NavigationItem>("navigation-items");
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await fetch("/api/site-settings");
    if (!response.ok) throw new Error("Failed to fetch site settings");
    return await response.json();
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export async function getRoomsSuites() {
  return fetchAPI<RoomsSuite>("rooms-suites");
}

export async function getDining() {
  return fetchAPI<Dining>("dining");
}

export async function getExperiences() {
  return fetchAPI<Experience>("experiences");
}

export interface WeddingEvent {
  id: number;
  documentId?: string;
  title: string;
  description: string;
  image: { url: string };
  order?: number;
}

export interface GalleryItem {
  id: number;
  documentId?: string;
  title?: string;
  image: { url: string };
  order?: number;
}

export interface WeddingEventsPage {
  id: number;
  documentId?: string;
  heroImage: { url: string };
  heroTitle: string;
  heroSubtitle?: string;
  introTitle: string;
  introSubtitle: string;
  introDescription1: string;
  introDescription2: string;
}

export interface OurStory {
  id: number;
  documentId?: string;
  title: string;
  subtitle?: string;
  mainContent: string;
  sideContent?: string;
  videoUrl?: string;
  images: { url: string }[];
  detailedStoryTitle?: string;
  detailedStory?: string;
  narrativeTitle?: string;
  narrativeContent?: string;
}

export interface ContactPage {
  id: number;
  documentId?: string;
  heroImage: { url: string };
  heroTitle: string;
  heroSubtitle?: string;
  connectImage: { url: string };
  connectTitle: string;
  mapEmbedUrl: string;
  distances: {
    destination: string;
    distance: string;
    time: string;
    category: string;
  }[];
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

export async function getWellness() {
  return fetchAPI<Wellness>("wellness");
}

export async function getFacilities() {
  return fetchAPI<Facility>("facilities");
}

export async function getWeddingEvents() {
  return fetchAPI<WeddingEvent>("wedding-events");
}

export async function getWeddingEventsPage(): Promise<WeddingEventsPage | null> {
  try {
    const response = await fetch("/api/wedding-events-page");
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching wedding events page:", error);
    return null;
  }
}

export async function getGalleryItems() {
  return fetchAPI<GalleryItem>("galleries");
}

export async function getOurStory(): Promise<OurStory | null> {
  try {
    const response = await fetch("/api/our-story");
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching our story:", error);
    return null;
  }
}

export async function getContactPage(): Promise<ContactPage | null> {
  try {
    const response = await fetch("/api/contact-page");
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return null;
  }
}

export async function getPageSEO(slug: string): Promise<SEO | null> {
  try {
    const response = await fetch(`/api/pages?slug=${slug}`);
    if (!response.ok) return null;
    const data = await response.json();
    if (data && data.length > 0) {
      return data[0].seo;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching SEO for ${slug}:`, error);
    return null;
  }
}
