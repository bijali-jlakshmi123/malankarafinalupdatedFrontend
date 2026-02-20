import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("facilities", "populate=*&sort=order:asc");

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: { url: getStrapiImageUrl(item.image?.url) },
        features: item.features,
        order: item.order,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] facilities GET error:", error);
    return NextResponse.json(
      { error: "Failed to load facilities" },
      { status: 500 },
    );
  }
}
