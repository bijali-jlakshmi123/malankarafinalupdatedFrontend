import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export async function GET() {
  try {
    const data = await fetchStrapi("blog-page", "populate=*");

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
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] blog-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load blog page" },
      { status: 500 },
    );
  }
}
