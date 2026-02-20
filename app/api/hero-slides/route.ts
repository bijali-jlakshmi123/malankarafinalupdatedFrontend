import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const slides = await fetchStrapi(
      "hero-slides",
      "populate=*&sort=order:asc",
    );

    if (!slides) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      slides.map((s: any) => ({
        id: s.id,
        documentId: s.documentId,
        title: s.title,
        description: s.description,
        image: { url: getStrapiImageUrl(s.image?.url) },
        order: s.order,
        link: s.link ?? undefined,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] hero-slides GET error:", error);
    return NextResponse.json(
      { error: "Failed to load hero slides" },
      { status: 500 },
    );
  }
}
