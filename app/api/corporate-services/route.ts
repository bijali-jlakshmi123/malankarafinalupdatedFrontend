import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export async function GET() {
  try {
    const data = await fetchStrapi(
      "corporate-services",
      "populate=*&sort=order:asc",
    );

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: { url: getStrapiImageUrl(item.image?.url) },
        order: item.order,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] corporate-services GET error:", error);
    return NextResponse.json(
      { error: "Failed to load corporate services" },
      { status: 500 },
    );
  }
}
