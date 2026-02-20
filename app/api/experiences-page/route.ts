import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("experiences-page", "populate=*");

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
        introDescription: data.introDescription,
        inHouseTitle: data.inHouseTitle,
        nearbyTitle: data.nearbyTitle,
        noteTitle: data.noteTitle,
        noteContent: data.noteContent,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] experiences-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load experiences page data" },
      { status: 500 },
    );
  }
}
