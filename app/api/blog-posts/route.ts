import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    let endpoint = "blog-posts";
    let query = "populate=*&sort=date:desc";

    if (slug) {
      query = `filters[slug][$eq]=${slug}&populate=*`;
    }

    const data = await fetchStrapi(endpoint, query);

    if (!data) {
      return NextResponse.json(slug ? null : [], { status: 200 });
    }

    const processed = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      image: { url: getStrapiImageUrl(item.image?.url) },
      category: item.category,
      date: item.date,
    }));

    if (slug) {
      return NextResponse.json(processed[0] || null, { status: 200 });
    }

    return NextResponse.json(processed, { status: 200 });
  } catch (error) {
    console.error("[API] blog-posts GET error:", error);
    return NextResponse.json(
      { error: "Failed to load blog posts" },
      { status: 500 },
    );
  }
}
