import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi(
      "amenity-icons",
      "populate=*&sort=order:asc",
    );

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      data.map((item: any) => ({
        id: item.id,
        name: item.name,
        svgIcon: item.svgIcon || null,
        iconImage: item.iconImage
          ? { url: getStrapiImageUrl(item.iconImage.url) }
          : null,
        order: item.order,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] amenity-icons GET error:", error);
    return NextResponse.json(
      { error: "Failed to load amenity icons" },
      { status: 500 },
    );
  }
}
