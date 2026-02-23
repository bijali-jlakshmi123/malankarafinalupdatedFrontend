import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "hero" or "room"
    const slug = searchParams.get("slug");

    const strapidata = await fetchStrapi(
      "rooms-suites",
      slug
        ? `filters[slug][$eq]=${slug}&populate=*`
        : "populate=*&sort=order:asc",
    );

    if (!strapidata || (Array.isArray(strapidata) && strapidata.length === 0)) {
      return NextResponse.json(slug ? null : [], { status: 200 });
    }

    const mapItem = (item: any) => ({
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      slug: item.slug,
      subtitle: item.subtitle,
      description: item.description,
      image: { url: getStrapiImageUrl(item.image?.url) },
      gallery: item.gallery?.map((img: any) => ({
        url: getStrapiImageUrl(img.url),
      })),
      link: item.link ?? undefined,
      order: item.order,
      displayIn: item.displayIn || "both",
      heroSlogan: item.heroSlogan,
      heroSubtext: item.heroSubtext,
      beds: item.beds,
      size: item.size,
      occupancy: item.occupancy,
      view: item.view,
      amenities: item.amenities,
    });

    if (slug) {
      const item = Array.isArray(strapidata) ? strapidata[0] : strapidata;
      return NextResponse.json(mapItem(item), { status: 200 });
    }

    let items = strapidata.map(mapItem);

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
