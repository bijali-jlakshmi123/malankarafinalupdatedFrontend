import { NextResponse } from "next/server";
import { fetchStrapi } from "@/lib/strapi";

export async function GET() {
  try {
    const items = await fetchStrapi("navigation-items", "sort=order:asc");

    if (!items) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      items.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        label: item.label,
        href: item.href,
        order: item.order,
        isActive: item.isActive,
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] navigation-items GET error:", error);
    return NextResponse.json(
      { error: "Failed to load navigation items" },
      { status: 500 },
    );
  }
}
