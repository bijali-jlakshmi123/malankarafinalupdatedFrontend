import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi("galleries", "populate=*&sort=order:asc");

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        image: { url: getStrapiImageUrl(item.image?.url) },
        order: item.order,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] galleries GET error:", error);
    return NextResponse.json(
      { error: "Failed to load gallery items" },
      { status: 500 },
    );
  }
}
