import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export async function GET() {
  try {
    const data = await fetchStrapi("privacy-policy-page", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        id: data.id,
        title: data.title,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        content: data.content,
        sections: data.sections,
        image: data.image?.url
          ? { url: getStrapiImageUrl(data.image.url) }
          : null,
        updatedAt: data.updatedAt,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] privacy-policy-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load privacy policy" },
      { status: 500 },
    );
  }
}
