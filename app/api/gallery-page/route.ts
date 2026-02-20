import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("gallery-page", "populate=*");

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
        seo: {
          title: data.seoTitle,
          description: data.seoDescription,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] gallery-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load gallery page data" },
      { status: 500 },
    );
  }
}
