import { NextResponse } from "next/server";
import { fetchStrapi } from "@/lib/strapi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const data = await fetchStrapi(
      "pages",
      `filters[slug][$eq]=${slug}&populate=*`,
    );

    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      data.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        seo: item.seo
          ? {
              title: item.seo.metaTitle,
              description: item.seo.metaDescription,
              keywords: item.seo.keywords,
              canonical: item.seo.canonicalURL,
            }
          : null,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] pages GET error:", error);
    return NextResponse.json(
      { error: "Failed to load page data" },
      { status: 500 },
    );
  }
}
