import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchStrapi(
      "facility-sections",
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
        image: item.image ? { url: getStrapiImageUrl(item.image.url) } : null,
        imagePosition: item.imagePosition || "left",
        checklistItems: item.checklistItems || [],
        checklistColumns: item.checklistColumns || 1,
        order: item.order,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] facility-sections GET error:", error);
    return NextResponse.json(
      { error: "Failed to load facility sections" },
      { status: 500 },
    );
  }
}
