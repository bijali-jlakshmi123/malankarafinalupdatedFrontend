import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export async function GET() {
  try {
    const data = await fetchStrapi("nearby-destinations-page", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        id: data.id,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage?.url
          ? { url: getStrapiImageUrl(data.heroImage.url) }
          : null,
        mainHeading: data.mainHeading,
        mainDescription: data.mainDescription,
        destinations: data.destinations,
        updatedAt: data.updatedAt,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] nearby-destinations-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load nearby destinations page" },
      { status: 500 },
    );
  }
}
