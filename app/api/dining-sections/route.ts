import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi(
      "dining-sections",
      "populate=*&sort=order:asc",
    );

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description1: item.description1,
        description2: item.description2,
        image: { url: getStrapiImageUrl(item.image?.url) },
        imagePosition: item.imagePosition,
        checklistItems: item.checklistItems,
        order: item.order,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] dining-sections GET error:", error);
    return NextResponse.json(
      { error: "Failed to load dining sections" },
      { status: 500 },
    );
  }
}
