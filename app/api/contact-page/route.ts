import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("contact-page", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        id: data.id,
        heroImage: { url: getStrapiImageUrl(data.heroImage?.url) },
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        connectImage: { url: getStrapiImageUrl(data.connectImage?.url) },
        connectTitle: data.connectTitle,
        mapEmbedUrl: data.mapEmbedUrl,
        distances: data.distances || [],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] contact-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load contact page" },
      { status: 500 },
    );
  }
}
