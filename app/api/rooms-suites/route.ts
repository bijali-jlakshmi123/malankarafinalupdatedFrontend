import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "hero" or "room"

    const data = await fetchStrapi("rooms-suites", "populate=*&sort=order:asc");

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    let items = data.map((item: any) => ({
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      image: { url: getStrapiImageUrl(item.image?.url) },
      gallery: item.gallery?.map((img: any) => ({
        url: getStrapiImageUrl(img.url),
      })),
      link: item.link ?? undefined,
      order: item.order,
      displayIn: item.displayIn || "both",
    }));

    // Filter by type if specified
    if (type === "hero") {
      items = items.filter(
        (item: any) => item.displayIn === "hero" || item.displayIn === "both",
      );
    } else if (type === "room") {
      items = items.filter(
        (item: any) => item.displayIn === "room" || item.displayIn === "both",
      );
    }

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("[API] rooms-suites GET error:", error);
    return NextResponse.json(
      { error: "Failed to load rooms and suites" },
      { status: 500 },
    );
  }
}
