import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("wedding-events-page", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        id: data.id,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage
          ? { url: getStrapiImageUrl(data.heroImage.url) }
          : null,
        introTitle: data.introTitle,
        introSubtitle: data.introSubtitle,
        introDescription1: data.introDescription1,
        introDescription2: data.introDescription2,
        parallaxImage: data.parallaxImage
          ? { url: getStrapiImageUrl(data.parallaxImage.url) }
          : null,
        parallaxTitle: data.parallaxTitle,
        settingsTitle: data.settingsTitle,
        settingsDescription: data.settingsDescription,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] wedding-events-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load wedding events page data" },
      { status: 500 },
    );
  }
}
