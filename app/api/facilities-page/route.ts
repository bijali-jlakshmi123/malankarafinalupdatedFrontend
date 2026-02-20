import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("facilities-page", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage
          ? { url: getStrapiImageUrl(data.heroImage.url) }
          : null,
        amenitiesSectionTitle: data.amenitiesSectionTitle,
        amenitiesSectionDescription: data.amenitiesSectionDescription,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] facilities-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load facilities page" },
      { status: 500 },
    );
  }
}
