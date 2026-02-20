import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("rooms-page", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        heroTitle: data.heroTitle || "Rooms & Suites",
        heroSubtitle:
          data.heroSubtitle ||
          "Experience premium comfort in stays designed to feel calm, spacious, and welcoming.",
        heroImages: Array.isArray(data.heroImages)
          ? data.heroImages
              .map((img: any) => getStrapiImageUrl(img.url))
              .filter(Boolean)
          : [],
        sectionTitle:
          data.sectionTitle || "Thoughtfully Designed Stays by the Lake",
        sectionSubtitle:
          data.sectionSubtitle ||
          "Wake up to open skies, spend evenings watching the lake change colours, and rest in spaces designed for unhurried living.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] rooms-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load rooms page settings" },
      { status: 500 },
    );
  }
}
