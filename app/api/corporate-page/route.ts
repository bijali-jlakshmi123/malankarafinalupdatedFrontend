import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export async function GET() {
  try {
    const data = await fetchStrapi("corporate-page", "populate=*");

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
        introTitle: data.introTitle,
        introDescription: data.introDescription,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] corporate-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load corporate page" },
      { status: 500 },
    );
  }
}
