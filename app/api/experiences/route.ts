import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("experiences", "populate=*&sort=order:asc");

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        image: { url: getStrapiImageUrl(item.image?.url) },
        link: item.link ?? undefined,
        order: item.order,
        category: item.category,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] experiences GET error:", error);
    return NextResponse.json(
      { error: "Failed to load experiences" },
      { status: 500 },
    );
  }
}
